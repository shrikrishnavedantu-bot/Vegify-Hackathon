import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", mode: "guest", env: process.env.NODE_ENV, vercel: !!process.env.VERCEL });
});

// AI Routes (No auth required for guest mode)
app.post("/api/identify-dish", async (req, res) => {
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

  app.post("/api/generate-vegan", async (req, res) => {
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
      
      const data = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
      res.json({
        ...data,
        veganImageUrl: `https://picsum.photos/seed/${dishName.replace(/\s/g, '')}vegan/800/600`
      });
    } catch (error) {
      res.status(500).json({ error: "AI generation failed" });
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
  const distPath = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
  }
}

export default app;
