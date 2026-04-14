import React from 'react';
import { Home, Utensils, Activity, Users, BookOpen, User, LogOut, Mail } from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  onNavigate: (view: string) => void;
  userInitial: string;
  calories: string;
  onLogout: () => void;
}

export default function Layout({ children, activeView, onNavigate, userInitial, calories, onLogout }: LayoutProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'recipes', label: 'Recipes', icon: Utensils },
    { id: 'tracker', label: 'Tracker', icon: Activity },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-secondary/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 
              className="text-2xl font-extrabold purple-text-gradient italic cursor-pointer font-display" 
              onClick={() => onNavigate('home')}
            >
              🌱 Vegify
            </h1>
            <nav className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "flex items-center gap-2 font-medium transition-all duration-200",
                    activeView === item.id ? "text-secondary" : "text-text-gray hover:text-secondary"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-[10px] text-text-gray font-bold uppercase tracking-wider">Daily Calories</p>
              <p className="text-sm font-bold text-secondary-deep">{calories}</p>
            </div>
            <div 
              className="w-10 h-10 rounded-full purple-gradient flex items-center justify-center text-white font-bold cursor-pointer shadow-md hover:scale-105 transition-transform"
              onClick={() => onNavigate('profile')}
            >
              <span>{userInitial}</span>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 text-text-gray hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pb-24 md:pb-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-secondary/5 p-12 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-2xl font-bold purple-text-gradient italic font-display">Vegify</h2>
            <p className="text-sm text-text-gray mt-2">Plant-powered living made simple since 2026.</p>
          </div>
          <div className="flex gap-10">
            <div className="space-y-3">
              <p className="font-bold text-[10px] uppercase tracking-widest text-secondary">Platform</p>
              <p className="text-sm text-text-gray cursor-pointer hover:text-secondary transition-colors">Swap Engine</p>
              <p className="text-sm text-text-gray cursor-pointer hover:text-secondary transition-colors">Recipes</p>
            </div>
            <div className="space-y-3">
              <p className="font-bold text-[10px] uppercase tracking-widest text-secondary">Legal</p>
              <p className="text-sm text-text-gray cursor-pointer hover:text-secondary transition-colors">Privacy</p>
              <p className="text-sm text-text-gray cursor-pointer hover:text-secondary transition-colors">Terms</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-secondary/5 text-center text-xs text-text-gray">
          © 2026 Vegify. Plant-powered living.
        </div>
      </footer>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full glass border-t border-secondary/10 flex justify-around p-4 z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "transition-all duration-200",
              activeView === item.id ? "text-secondary scale-110" : "text-text-gray"
            )}
          >
            <item.icon className="w-6 h-6" />
          </button>
        ))}
      </div>
    </div>
  );
}
