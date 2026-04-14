import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";
import admin from "firebase-admin";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Initialize Firebase Admin
let firebaseConfig;
try {
  const configPath = path.join(__dirname, "firebase-applet-config.json");
  if (fs.existsSync(configPath)) {
    firebaseConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
  } else {
    firebaseConfig = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };
  }
} catch (error) {
  console.error("Firebase config error:", error);
}

if (firebaseConfig && (firebaseConfig.projectId || firebaseConfig.clientEmail)) {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: firebaseConfig.privateKey ? admin.credential.cert(firebaseConfig) : admin.credential.applicationDefault(),
      projectId: firebaseConfig.projectId,
    });
  }
}

const db = admin.firestore();
const auth = admin.auth();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// Middleware to verify Firebase Auth Token
const verifyToken = async (req: any, res: any, next: any) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];
  if (!idToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", env: process.env.NODE_ENV, vercel: !!process.env.VERCEL });
});

// AI Routes
app.post("/api/identify-dish", verifyToken, async (req, res) => {
    const { imageBase64 } = req.body;
    if (!imageBase64) return res.status(400).json({ error: "Image required" });

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "Identify this food dish. Tell me the name of the dish and if it contains animal products. Return JSON: { \"dishName\": \"...\", \"animalProduct\": \"...\", \"confidence\": 0.9 }";
      
      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: imageBase64.split(",")[1] || imageBase64,
            mimeType: "image/jpeg"
          }
        }
      ]);
      
      const response = await result.response;
      const text = response.text();
      const jsonMatch = text.match(/\{.*\}/s);
      res.json(jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Failed to parse AI response" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "AI identification failed" });
    }
  });

  app.post("/api/generate-vegan", verifyToken, async (req, res) => {
    const { dishName, animalProduct } = req.body;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Generate a plant-based version of ${dishName} replacing ${animalProduct}. 
      Provide a swap description, a flavor promise, and a basic nutrition comparison.
      Return JSON: { "swapText": "...", "flavorPromise": "...", "nutritionComparison": { "saturatedFatReduced": "...", "fiberAdded": "...", "caloriesSaved": "..." } }`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const jsonMatch = text.match(/\{.*\}/s);
      
      // Note: Gemini 1.5 Flash doesn't generate images directly via generateContent in this way, 
      // but we can provide a placeholder or use a different model if available.
      // For now, we'll return the text data and a placeholder image URL.
      const data = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
      res.json({
        ...data,
        veganImageUrl: `https://picsum.photos/seed/${dishName.replace(/\s/g, '')}vegan/800/600`
      });
    } catch (error) {
      res.status(500).json({ error: "AI generation failed" });
    }
  });

  // User Routes
  app.get("/api/user/profile", verifyToken, async (req: any, res) => {
    try {
      const userDoc = await db.collection("users").doc(req.user.uid).get();
      if (!userDoc.exists) return res.status(404).json({ error: "User not found" });
      res.json(userDoc.data());
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  app.post("/api/user/bmr", verifyToken, async (req: any, res) => {
    const { age, gender, weight, height, activityLevel } = req.body;
    
    // Mifflin-St Jeor Formula
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr = gender === "male" ? bmr + 5 : bmr - 161;

    const multipliers: any = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const maintenanceCalories = Math.round(bmr * (multipliers[activityLevel] || 1.2));

    const bmrData = {
      age, gender, weight, height, activityLevel, bmr, maintenanceCalories,
      weightLoss: maintenanceCalories - 500,
      weightGain: maintenanceCalories + 500
    };

    try {
      await db.collection("users").doc(req.user.uid).set({ bmrData }, { merge: true });
      res.json(bmrData);
    } catch (error) {
      res.status(500).json({ error: "Failed to save BMR data" });
    }
  });

  // Swaps Routes
  app.get("/api/swaps", verifyToken, async (req: any, res) => {
    try {
      const snapshot = await db.collection("swaps").where("userId", "==", req.user.uid).get();
      const swaps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(swaps);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch swaps" });
    }
  });

  app.post("/api/swaps", verifyToken, async (req: any, res) => {
    try {
      const swapData = { ...req.body, userId: req.user.uid, savedDate: new Date().toISOString() };
      const docRef = await db.collection("swaps").add(swapData);
      await db.collection("users").doc(req.user.uid).update({
        totalSwaps: admin.firestore.FieldValue.increment(1)
      });
      res.json({ success: true, swapId: docRef.id });
    } catch (error) {
      res.status(500).json({ error: "Failed to save swap" });
    }
  });

  // Community Routes
  app.get("/api/posts", async (req, res) => {
    const { category } = req.query;
    try {
      let query: any = db.collection("communityPosts").orderBy("createdAt", "desc");
      if (category) query = query.where("category", "==", category);
      
      const snapshot = await query.limit(20).get();
      const posts = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.post("/api/posts", verifyToken, async (req: any, res) => {
    try {
      const postData = {
        ...req.body,
        userId: req.user.uid,
        userName: req.user.name || "Anonymous",
        userAvatar: req.user.picture || "",
        likes: 0,
        likedBy: [],
        comments: [],
        createdAt: new Date().toISOString()
      };
      const docRef = await db.collection("communityPosts").add(postData);
      res.json({ success: true, postId: docRef.id });
    } catch (error) {
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  // Recipes Routes (Pre-seeded)
  app.get("/api/recipes", async (req, res) => {
    try {
      const snapshot = await db.collection("recipes").get();
      const recipes = snapshot.docs.map(doc => doc.data());
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recipes" });
    }
  });

// Vite middleware for development
async function setupVite() {
  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }
}

if (!process.env.VERCEL) {
  setupVite().then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
} else {
  // For Vercel, we don't need to call listen, just export the app
  // But we might still want to serve static files if Vercel routes don't handle it
  const distPath = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
  }
}

export default app;
