import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Flame, Trash2, Plus, Calculator, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Meal } from '../types';

interface TrackerProps {
  meals: Meal[];
  calGoal: number;
  calCurrent: number;
  onAddMeal: (meal: Meal) => void;
  onDeleteMeal: (id: string) => void;
  onResetDay: () => void;
  onSetGoal: (goal: number) => void;
  showToast: (msg: string, type?: 'info' | 'success' | 'error') => void;
}

export default function Tracker({ 
  meals, 
  calGoal, 
  calCurrent, 
  onAddMeal, 
  onDeleteMeal, 
  onResetDay, 
  onSetGoal,
  showToast 
}: TrackerProps) {
  // BMR State
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState('1.2');
  const [bmrResult, setBmrResult] = useState<number | null>(null);

  // Meal Input State
  const [mealName, setMealName] = useState('');
  const [mealCal, setMealCal] = useState('');
  const [mealCat, setMealCat] = useState<'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'>('Breakfast');

  const calculateBMR = () => {
    if (!age || !weight || !height) {
      showToast("Please fill all fields", "error");
      return;
    }

    // Mifflin-St Jeor Equation
    let bmr = (10 * Number(weight)) + (6.25 * Number(height)) - (5 * Number(age));
    bmr = gender === 'male' ? bmr + 5 : bmr - 161;
    
    const maintenance = Math.round(bmr * Number(activity));
    setBmrResult(maintenance);
    onSetGoal(maintenance);
    showToast("Daily goal updated based on your BMR!", "success");
  };

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mealName || !mealCal) return;

    const newMeal: Meal = {
      id: Date.now().toString(),
      name: mealName,
      calories: Number(mealCal),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: mealCat
    };

    onAddMeal(newMeal);
    setMealName('');
    setMealCal('');
    showToast("Meal added to your log!");
  };

  const progressPercent = Math.min((calCurrent / calGoal) * 100, 100);
  const strokeDasharray = 691; // 2 * PI * 110
  const strokeDashoffset = strokeDasharray - (strokeDasharray * progressPercent) / 100;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* BMR Calculator */}
        <div className="glass p-8 rounded-[2rem] shadow-lg space-y-6 border border-secondary/5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-display">⚡ Calculate Your BMR</h2>
              <p className="text-xs text-text-gray">Know your daily calorie needs</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-text-gray uppercase ml-1">Age</label>
                <input 
                  type="number" 
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="25" 
                  className="w-full p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-secondary/10 transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-text-gray uppercase ml-1">Gender</label>
                <select 
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-secondary/10 transition-all bg-white"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-text-gray uppercase ml-1">Weight (kg)</label>
                <input 
                  type="number" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="70" 
                  className="w-full p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-secondary/10 transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-text-gray uppercase ml-1">Height (cm)</label>
                <input 
                  type="number" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="175" 
                  className="w-full p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-secondary/10 transition-all"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-text-gray uppercase ml-1">Activity Level</label>
              <select 
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-secondary/10 transition-all bg-white"
              >
                <option value="1.2">Sedentary (little or no exercise)</option>
                <option value="1.375">Lightly active (1-3 days/week)</option>
                <option value="1.55">Moderately active (3-5 days/week)</option>
                <option value="1.725">Very active (6-7 days/week)</option>
                <option value="1.9">Extra active (physical job + exercise)</option>
              </select>
            </div>
            <button 
              onClick={calculateBMR}
              className="w-full purple-gradient text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-secondary/20 transition-all active:scale-95"
            >
              Calculate & Set Goal
            </button>
          </div>

          <AnimatePresence>
            {bmrResult && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-secondary/5 p-6 rounded-2xl text-center space-y-2 border border-secondary/10"
              >
                <p className="text-xs font-bold text-secondary uppercase tracking-widest">Maintenance Calories</p>
                <p className="text-4xl font-black text-secondary-deep">{bmrResult} <span className="text-sm font-medium">kcal/day</span></p>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <p className="text-[10px] text-text-gray font-bold uppercase">Weight Loss</p>
                    <p className="text-lg font-bold text-secondary">{bmrResult - 500}</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <p className="text-[10px] text-text-gray font-bold uppercase">Weight Gain</p>
                    <p className="text-lg font-bold text-secondary">{bmrResult + 500}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress Tracker */}
        <div className="glass p-8 rounded-[2rem] shadow-lg flex flex-col items-center justify-center space-y-8 border border-secondary/5">
          <h2 className="text-2xl font-bold font-display">📊 Today's Progress</h2>
          
          <div className="relative flex items-center justify-center">
            <svg className="w-64 h-64 transform -rotate-90">
              <circle 
                cx="128" cy="128" r="110" 
                stroke="currentColor" strokeWidth="12" 
                fill="transparent" 
                className="text-secondary/5" 
              />
              <motion.circle 
                cx="128" cy="128" r="110" 
                stroke="currentColor" strokeWidth="12" 
                fill="transparent" 
                strokeDasharray={strokeDasharray}
                initial={{ strokeDashoffset: strokeDasharray }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-secondary" 
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.p 
                key={calCurrent}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl font-black text-secondary-deep"
              >
                {calCurrent}
              </motion.p>
              <p className="text-text-gray font-bold text-xs uppercase tracking-widest mt-1">
                of <span className="text-secondary">{calGoal}</span> kcal
              </p>
              <div className="mt-2 px-3 py-1 bg-secondary/10 rounded-full">
                <p className="text-[10px] font-black text-secondary">{Math.round(progressPercent)}%</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleAddMeal} className="w-full space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                placeholder="Meal name..." 
                className="p-4 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-secondary/10 transition-all text-sm"
              />
              <input 
                type="number" 
                value={mealCal}
                onChange={(e) => setMealCal(e.target.value)}
                placeholder="Calories" 
                className="p-4 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-secondary/10 transition-all text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {(['Breakfast', 'Lunch', 'Dinner', 'Snack'] as const).map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setMealCat(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap",
                    mealCat === cat ? "bg-secondary text-white shadow-md" : "bg-gray-100 text-text-gray hover:bg-gray-200"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button 
              type="submit"
              className="w-full bg-secondary/10 text-secondary py-4 rounded-xl font-bold hover:bg-secondary/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Plus className="w-5 h-5" /> Add Meal Entry
            </button>
          </form>
        </div>
      </div>

      {/* Meal History */}
      <div className="glass p-8 rounded-[2rem] space-y-6 border border-secondary/5">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold font-display">Recent Meals</h3>
          <button 
            onClick={() => {
              if (confirm("Are you sure you want to reset today's log?")) {
                onResetDay();
                showToast("Day reset successfully.");
              }
            }}
            className="text-xs font-bold text-text-gray hover:text-red-500 transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" /> Reset Day
          </button>
        </div>
        
        <div className="space-y-3">
          {meals.length === 0 ? (
            <div className="text-center py-12 text-gray-300">
              <Activity className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p className="text-sm font-medium">No meals logged today.</p>
            </div>
          ) : (
            meals.map((m, idx) => (
              <motion.div 
                key={m.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex justify-between items-center p-4 bg-white rounded-2xl border border-secondary/5 shadow-sm group hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-secondary/5 rounded-xl flex items-center justify-center text-secondary">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{m.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{m.category}</span>
                      <span className="text-[10px] text-text-gray">{m.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-black text-secondary-deep">+{m.calories} <span className="text-[10px] font-medium">kcal</span></p>
                  <button 
                    onClick={() => onDeleteMeal(m.id)}
                    className="p-2 text-gray-200 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
