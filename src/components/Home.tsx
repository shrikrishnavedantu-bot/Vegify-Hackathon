import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RefreshCw, Flame, Leaf, Sparkles, Upload, ChefHat, Check, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { INGREDIENTS } from '../constants';

interface HomeProps {
  userName: string;
  snaps: number;
  converted: number;
  onUpdateStats: (snaps: number, converted: number) => void;
  showToast: (msg: string, type?: 'info' | 'success' | 'error') => void;
  onNavigate: (view: string) => void;
}

export default function Home({ userName, snaps, converted, onUpdateStats, showToast, onNavigate }: HomeProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [groceryResults, setGroceryResults] = useState<any[]>([]);

  const simulateProcessing = () => {
    setIsProcessing(true);
    setShowResult(false);
    const steps = ["Analyzing dish...", "Detecting textures...", "Finding plant-based twin...", "Ready!"];
    let i = 0;
    
    const interval = setInterval(() => {
      setProcessStep(steps[i]);
      i++;
      if (i >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsProcessing(false);
          setShowResult(true);
          onUpdateStats(snaps + 1, converted + 1);
          showToast("✨ AI transformation successful!", "success");
        }, 500);
      }
    }, 800);
  };

  const toggleIngredient = (id: string) => {
    setSelectedIngredients(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const convertGrocery = () => {
    if (selectedIngredients.length === 0) {
      showToast("Select at least one ingredient!", "error");
      return;
    }
    const results = INGREDIENTS.filter(ing => selectedIngredients.includes(ing.id));
    setGroceryResults(results);
  };

  const stats = [
    { label: 'Snaps Taken', value: snaps, icon: Camera, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Meals Converted', value: converted, icon: RefreshCw, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Calories Saved', value: '3,240', icon: Flame, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'CO2 Saved', value: '12.5 kg', icon: Leaf, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-secondary/10 shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=150&q=80" 
              className="w-full h-full object-cover" 
              alt="Healthy Food" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold font-display">Good {getTimeGreeting()}, {userName}!</h2>
            <p className="text-text-gray">"Every plant-based meal makes a difference to your health and the planet."</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass p-6 rounded-3xl border-l-4 border-secondary shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={cn("p-2 rounded-lg", stat.bg, stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</span>
            </div>
            <p className="text-3xl font-bold text-secondary-deep">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Feature: Snap & Convert */}
      <div className="glass rounded-[2rem] overflow-hidden shadow-xl border border-secondary/5">
        <div className="p-8 lg:p-12 flex flex-col lg:flex-row gap-10 items-center">
          <div className="lg:w-1/2 space-y-6">
            <span className="bg-secondary/10 text-secondary px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Core Feature</span>
            <h2 className="text-4xl font-extrabold leading-tight font-display">
              📸 Snap a Dish. <br />
              <span className="purple-text-gradient">Convert to Plant-Based.</span>
            </h2>
            <p className="text-text-gray text-lg">
              Love non-veg flavors? Get them all — the veg way. Our AI analyzes your plate and instantly generates a plant-based twin with the same texture and soul.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <label className="cursor-pointer purple-gradient text-white px-8 py-4 rounded-full font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-all active:scale-95">
                <Camera className="w-5 h-5" /> Take Photo
                <input type="file" className="hidden" onChange={() => simulateProcessing()} />
              </label>
              <button 
                onClick={() => simulateProcessing()} 
                className="border-2 border-secondary text-secondary px-8 py-4 rounded-full font-bold hover:bg-secondary/5 transition-all flex items-center gap-2 active:scale-95"
              >
                <Sparkles className="w-5 h-5" /> Try Demo
              </button>
            </div>

            <div className="pt-4">
              <div className="flex justify-between text-xs font-bold text-text-gray mb-2 uppercase tracking-wider">
                <span>Weekly Progress</span>
                <span>{snaps}/30 snaps</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(snaps / 30) * 100}%` }}
                  className="h-full purple-gradient"
                />
              </div>
              <p className="text-[10px] text-text-gray mt-2 font-medium">5 more snaps to unlock "Green Warrior" badge!</p>
            </div>
          </div>

          <div className="lg:w-1/2 w-full relative">
            <AnimatePresence>
              {isProcessing && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-3xl space-y-4"
                >
                  <div className="w-16 h-16 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin"></div>
                  <p className="font-bold purple-text-gradient animate-pulse">{processStep}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-2 relative h-[300px] lg:h-[400px]">
              <div className="rounded-2xl overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80" 
                  className="w-full h-full object-cover"
                  alt="Original"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase backdrop-blur-sm">Original</div>
              </div>
              <div className={cn(
                "rounded-2xl overflow-hidden relative group transition-all duration-1000",
                showResult ? "border-4 border-secondary" : "border-4 border-transparent"
              )}>
                <img 
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80" 
                  className={cn(
                    "w-full h-full object-cover transition-all duration-1000",
                    !showResult && "grayscale brightness-50"
                  )}
                  alt="Converted"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-lg">Vegify Twin</div>
                
                {showResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-4 right-4 glass p-3 rounded-xl text-[10px] space-y-1 shadow-2xl"
                  >
                    <p className="font-bold text-secondary">✨ Swap: Firm Tofu</p>
                    <p className="text-text-gray">"Same creamy gravy. Same spices."</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grocery Converter */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold flex items-center gap-2 font-display">
            <ChefHat className="text-secondary" /> Smart Grocery Converter
          </h3>
          <button 
            onClick={() => {
              const random = INGREDIENTS[Math.floor(Math.random() * INGREDIENTS.length)];
              setSelectedIngredients([random.id]);
              convertGrocery();
              showToast("Feeling lucky! Try this swap.");
            }}
            className="text-xs font-bold text-secondary hover:underline"
          >
            I'm Feeling Lucky
          </button>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 glass p-6 rounded-3xl space-y-4">
            <p className="font-bold text-sm text-text-gray uppercase tracking-wider">What do you have?</p>
            <div className="grid grid-cols-2 gap-2">
              {INGREDIENTS.map(ing => (
                <button
                  key={ing.id}
                  onClick={() => toggleIngredient(ing.id)}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-xl border transition-all text-left",
                    selectedIngredients.includes(ing.id) 
                      ? "bg-secondary/10 border-secondary text-secondary shadow-sm" 
                      : "bg-white border-gray-100 text-text-gray hover:border-secondary/30"
                  )}
                >
                  <span className="text-lg">{ing.icon}</span>
                  <span className="text-[10px] font-bold uppercase">{ing.name}</span>
                  {selectedIngredients.includes(ing.id) && <Check className="w-3 h-3 ml-auto" />}
                </button>
              ))}
            </div>
            <button 
              onClick={convertGrocery}
              className="w-full purple-gradient text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-secondary/20 transition-all active:scale-95"
            >
              Get Recipe Suggestions
            </button>
          </div>

          <div className="lg:col-span-2 glass p-6 rounded-3xl min-h-[300px] flex flex-col relative overflow-hidden">
            {groceryResults.length === 0 ? (
              <>
                <div className="absolute inset-0 opacity-5">
                  <img 
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80" 
                    className="w-full h-full object-cover" 
                    alt="Background" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col items-center justify-center flex-grow text-gray-400 py-10 relative z-10">
                  <ChefHat className="w-16 h-16 mb-4 opacity-10" />
                  <p className="font-medium">Select ingredients to see what you can mimic!</p>
                  <p className="text-xs mt-2">Try adding tofu or mushrooms – they're the most versatile!</p>
                </div>
              </>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {groceryResults.map(res => (
                  <motion.div 
                    key={res.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="purple-gradient p-6 rounded-2xl text-white shadow-lg relative overflow-hidden group"
                  >
                    <div className="relative z-10">
                      <p className="text-[10px] opacity-70 font-bold uppercase tracking-widest mb-1">{res.name} can mimic:</p>
                      <div className="space-y-2">
                        {res.mimics.map((m: string) => (
                          <p key={m} className="text-lg font-bold flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-white rounded-full" /> {m}
                          </p>
                        ))}
                      </div>
                      <button 
                        onClick={() => onNavigate('recipes')}
                        className="mt-6 flex items-center gap-2 text-xs font-bold bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all"
                      >
                        Cook Now <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="absolute -bottom-4 -right-4 text-8xl opacity-10 transform rotate-12 group-hover:scale-110 transition-transform">{res.icon}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Membership Packages */}
      <div className="space-y-8 pt-10 border-t border-secondary/5">
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-bold font-display">Choose Your Plan</h3>
          <p className="text-text-gray">Unlock premium features and accelerate your transformation.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              name: 'Free', 
              price: '0', 
              features: ['5 AI Snaps / day', 'Basic Recipes', 'Community Access'],
              button: 'Current Plan',
              popular: false
            },
            { 
              name: 'Plus', 
              price: '9', 
              features: ['Unlimited AI Snaps', 'Premium Recipes', 'Meal Planning', 'Priority Support'],
              button: 'Upgrade to Plus',
              popular: true
            },
            { 
              name: 'Elite', 
              price: '19', 
              features: ['Everything in Plus', '1-on-1 Nutritionist', 'Custom AI Models', 'Early Access'],
              button: 'Go Elite',
              popular: false
            }
          ].map((plan, idx) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "glass p-8 rounded-[2.5rem] flex flex-col relative overflow-hidden",
                plan.popular ? "border-2 border-secondary shadow-xl scale-105 z-10" : "border border-secondary/5"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-secondary text-white px-4 py-1 rounded-bl-2xl text-[10px] font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h4 className="text-xl font-bold font-display">{plan.name}</h4>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-extrabold">${plan.price}</span>
                  <span className="text-text-gray text-sm">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map(feat => (
                  <li key={feat} className="flex items-center gap-3 text-sm text-text-gray">
                    <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-secondary" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => showToast(`Upgrading to ${plan.name}...`)}
                className={cn(
                  "w-full py-4 rounded-full font-bold transition-all active:scale-95",
                  plan.popular ? "purple-gradient text-white shadow-lg" : "border-2 border-secondary text-secondary hover:bg-secondary/5"
                )}
              >
                {plan.button}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
