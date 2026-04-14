import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import Home from './components/Home';
import Recipes from './components/Recipes';
import Tracker from './components/Tracker';
import Community from './components/Community';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Profile from './components/Profile';
import Toast, { ToastType } from './components/Toast';
import { Meal } from './types';

export default function App() {
  // Guest User State
  const [user] = useState({
    displayName: 'Guest User',
    email: 'guest@vegify.app',
    photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest'
  });

  // Navigation State
  const [activeView, setActiveView] = useState('home');

  // Stats State
  const [snaps, setSnaps] = useState(() => Number(localStorage.getItem('vegify_snaps') || 0));
  const [converted, setConverted] = useState(() => Number(localStorage.getItem('vegify_converted') || 0));

  // Tracker State
  const [meals, setMeals] = useState<Meal[]>(() => {
    const saved = localStorage.getItem('vegify_meals');
    return saved ? JSON.parse(saved) : [];
  });
  const [calGoal, setCalGoal] = useState(() => Number(localStorage.getItem('vegify_cal_goal') || 2200));

  // Toast State
  const [toast, setToast] = useState<{ msg: string; type: ToastType } | null>(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('vegify_snaps', snaps.toString());
    localStorage.setItem('vegify_converted', converted.toString());
  }, [snaps, converted]);

  useEffect(() => {
    localStorage.setItem('vegify_meals', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem('vegify_cal_goal', calGoal.toString());
  }, [calGoal]);

  const showToast = (msg: string, type: ToastType = 'info') => {
    setToast({ msg, type });
  };

  const handleLogout = () => {
    if (confirm("Clear local data and reset?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const addMeal = (meal: Meal) => {
    setMeals(prev => [meal, ...prev]);
  };

  const deleteMeal = (id: string) => {
    setMeals(prev => prev.filter(m => m.id !== id));
  };

  const resetDay = () => {
    setMeals([]);
  };

  const calCurrent = meals.reduce((acc, m) => acc + m.calories, 0);

  const renderView = () => {
    const userName = user.displayName;
    switch (activeView) {
      case 'home':
        return <Home userName={userName} snaps={snaps} converted={converted} onUpdateStats={(s, c) => { setSnaps(s); setConverted(c); }} showToast={showToast} onNavigate={setActiveView} />;
      case 'recipes':
        return <Recipes showToast={showToast} />;
      case 'tracker':
        return <Tracker meals={meals} calGoal={calGoal} calCurrent={calCurrent} onAddMeal={addMeal} onDeleteMeal={deleteMeal} onResetDay={resetDay} onSetGoal={setCalGoal} showToast={showToast} />;
      case 'community':
        return <Community showToast={showToast} />;
      case 'blog':
        return <Blog showToast={showToast} />;
      case 'contact':
        return <Contact showToast={showToast} />;
      case 'profile':
        return <Profile snaps={snaps} converted={converted} showToast={showToast} onLogout={handleLogout} />;
      default:
        return <Home userName={userName} snaps={snaps} converted={converted} onUpdateStats={(s, c) => { setSnaps(s); setConverted(c); }} showToast={showToast} onNavigate={setActiveView} />;
    }
  };

  return (
    <Layout 
      activeView={activeView} 
      onNavigate={setActiveView} 
      userInitial={(user.displayName || user.email || 'M')[0].toUpperCase()} 
      calories={`${calCurrent} / ${calGoal} kcal`}
      onLogout={handleLogout}
    >
      <div className="max-w-7xl mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </Layout>
  );
}
