import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { cn } from '../lib/utils';
import { auth } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  updateProfile
} from 'firebase/auth';

interface LoginProps {
  showToast: (msg: string, type?: 'info' | 'success' | 'error') => void;
}

export default function Login({ showToast }: LoginProps) {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (activeTab === 'signin') {
        await signInWithEmailAndPassword(auth, email, password);
        showToast('Welcome back to Vegify!', 'success');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        showToast('Account created! Welcome to Vegify.', 'success');
      }
    } catch (error: any) {
      showToast(error.message || 'Authentication failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      showToast('Signed in with Google!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Google sign-in failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    // For now, we'll just show a message as guest mode is handled by App.tsx logic
    // but with real Firebase, we might want to use anonymous auth if needed.
    showToast("Guest mode is currently limited. Please sign in for the full experience.", 'info');
  };

  return (
    <section className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Side */}
      <div className="lg:w-1/2 purple-gradient p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <div className="mb-8 relative">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80" 
                className="w-64 h-64 object-cover rounded-full border-8 border-white/20 shadow-2xl mx-auto relative z-10" 
                alt="Food" 
                referrerPolicy="no-referrer"
              />
              {/* Floating smaller images */}
              <motion.img 
                animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=150&q=80"
                className="absolute -top-4 -left-4 w-20 h-20 object-cover rounded-2xl border-4 border-white/30 shadow-xl z-20"
                alt="Veggie"
                referrerPolicy="no-referrer"
              />
              <motion.img 
                animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=150&q=80"
                className="absolute -bottom-4 -right-4 w-24 h-24 object-cover rounded-2xl border-4 border-white/30 shadow-xl z-20"
                alt="Salad"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
          <h1 className="text-5xl font-bold mb-4 font-display">Transform your plate.</h1>
          <p className="text-xl opacity-90">Love non-veg flavors? Get them all — the veg way.</p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 glass p-6 rounded-2xl text-left max-w-md mx-auto text-text-dark"
          >
            <p className="italic">"Vegify helped me reduce meat by 70% in 2 months. The swaps are indistinguishable!"</p>
            <p className="mt-4 font-bold text-sm">— Sarah J., Pro Member</p>
          </motion.div>
        </motion.div>

        {/* Decorative Blobs */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill="#FFF" d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.3,87.1,-15.7,85.6,-0.9C84.1,14,77.7,27.9,69,40.1C60.3,52.3,49.3,62.8,36.4,70.1C23.5,77.4,8.7,81.5,-6.1,80.5C-20.9,79.5,-35.7,73.4,-48.5,64.3C-61.3,55.2,-72,43.1,-78.3,29C-84.5,14.9,-86.3,-1.2,-83.4,-16.5C-80.5,-31.8,-72.9,-46.3,-61.2,-54C-49.5,-61.7,-33.7,-62.6,-19.9,-69.3C-6.1,-76,-2,-88.5,13.9,-86.3C29.8,-84.1,31.3,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      {/* Right Side */}
      <div className="lg:w-1/2 p-8 lg:p-24 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold purple-text-gradient italic font-display">🌱 Vegify</h2>
          </div>

          <div className="flex border-b border-gray-100 mb-8 relative">
            <button 
              onClick={() => setActiveTab('signin')} 
              className={cn(
                "pb-4 px-6 font-semibold transition-all duration-300",
                activeTab === 'signin' ? "text-secondary" : "text-gray-400 hover:text-secondary"
              )}
            >
              Sign In
            </button>
            <button 
              onClick={() => setActiveTab('signup')} 
              className={cn(
                "pb-4 px-6 font-semibold transition-all duration-300",
                activeTab === 'signup' ? "text-secondary" : "text-gray-400 hover:text-secondary"
              )}
            >
              Sign Up
            </button>
            <motion.div 
              className="absolute bottom-0 h-0.5 bg-secondary"
              animate={{ 
                left: activeTab === 'signin' ? 0 : 100,
                width: activeTab === 'signin' ? 90 : 100
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'signin' ? (
              <motion.form 
                key="signin"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSubmit} 
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-medium text-text-gray mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com" 
                    className="w-full p-4 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-gray mb-2">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full p-4 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer text-text-gray">
                    <input type="checkbox" className="accent-secondary w-4 h-4 rounded" /> Remember me
                  </label>
                  <a href="#" className="text-secondary font-medium hover:underline">Forgot password?</a>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full purple-gradient text-white py-4 rounded-full font-bold shadow-lg hover:shadow-secondary/20 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    activeTab === 'signin' ? 'Sign In' : 'Create Account'
                  )}
                </button>
                
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or continue with</span></div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <button 
                    type="button" 
                    onClick={handleGoogleLogin} 
                    disabled={loading}
                    className="flex items-center justify-center gap-2 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all font-medium text-sm disabled:opacity-50"
                  >
                    <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" className="w-5 h-5" alt="Google" referrerPolicy="no-referrer" /> 
                    Sign in with Google
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.form 
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSubmit} 
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-medium text-text-gray mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe" 
                    className="w-full p-4 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-gray mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="name@example.com" 
                    className="w-full p-4 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-gray mb-2">Password</label>
                    <input 
                      type="password" 
                      required 
                      placeholder="••••••••" 
                      className="w-full p-4 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-gray mb-2">Confirm</label>
                    <input 
                      type="password" 
                      required 
                      placeholder="••••••••" 
                      className="w-full p-4 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-text-gray">
                  <input type="checkbox" required className="accent-secondary w-4 h-4 rounded" /> I agree to Terms & Conditions
                </label>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full purple-gradient text-white py-4 rounded-full font-bold shadow-lg hover:shadow-secondary/20 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    'Create Account'
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-8 text-center">
            <button 
              onClick={handleGuest} 
              className="text-text-gray hover:text-secondary transition-all text-sm font-medium underline underline-offset-4"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
