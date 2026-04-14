import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Search, Filter, Clock, Flame, Heart, Share2, X, Printer, Calendar, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';
import { RECIPES } from '../constants';
import { Recipe } from '../types';

interface RecipesProps {
  showToast: (msg: string, type?: 'info' | 'success' | 'error') => void;
}

export default function Recipes({ showToast }: RecipesProps) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const categories = [
    'All',
    'Chicken Mimics',
    'Meat Mimics',
    'Egg Mimics',
    'Cheese Mimics',
    'Seafood Mimics',
    'Dessert'
  ];

  const filteredRecipes = RECIPES.filter(r => {
    const matchesFilter = filter === 'All' || r.category === filter;
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || 
                         r.mimics.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-extrabold font-display">🍽️ 30+ Mimic Recipes</h2>
        <p className="text-text-gray max-w-2xl mx-auto">Plant-based dishes that taste like the real thing. Curated by top chefs to help your transformation.</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search recipes or mimics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-secondary/10 transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                filter === cat ? "purple-gradient text-white shadow-lg" : "glass text-text-gray hover:text-secondary"
              )}
            >
              {cat.replace(' Mimics', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.map((recipe, idx) => (
          <motion.div 
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="glass rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all border border-secondary/5"
            onClick={() => setSelectedRecipe(recipe)}
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                src={recipe.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                alt={recipe.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <button className="bg-white text-secondary px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
                  <Play className="w-3 h-3 fill-current" /> Watch Recipe
                </button>
              </div>
              <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-[10px] font-bold text-secondary flex items-center gap-1">
                <Clock className="w-3 h-3" /> {recipe.time}
              </div>
              {recipe.isVideo && (
                <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                  Video
                </div>
              )}
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h4 className="font-bold text-xl group-hover:text-secondary transition-colors font-display">{recipe.title}</h4>
                <div className="flex items-center gap-2 text-[10px] text-secondary font-black uppercase tracking-widest mt-1">
                  <RefreshCw className="w-3 h-3" /> Mimics: {recipe.mimics}
                </div>
              </div>
              <p className="text-xs text-text-gray line-clamp-2">Swap: {recipe.swap}</p>
              <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-text-gray">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      recipe.difficulty === 'Easy' ? "bg-green-400" : recipe.difficulty === 'Medium' ? "bg-yellow-400" : "bg-red-400"
                    )} />
                    {recipe.difficulty}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-text-gray">
                    <Flame className="w-3 h-3 text-orange-400" /> {recipe.calories} kcal
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast("Recipe saved to your library!", "success");
                  }}
                  className="p-2 rounded-full hover:bg-secondary/10 text-gray-300 hover:text-secondary transition-all"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recipe Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedRecipe(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-96 bg-gray-100 flex items-center justify-center">
                <img src={selectedRecipe.image} className="w-full h-full object-cover opacity-50" alt="" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-secondary fill-current ml-1" />
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedRecipe(null)}
                  className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 md:p-12 overflow-y-auto">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                  <div className="space-y-2">
                    <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{selectedRecipe.category}</span>
                    <h3 className="text-3xl font-bold font-display">{selectedRecipe.title}</h3>
                    <p className="text-text-gray">Mimics: <span className="text-secondary font-bold">{selectedRecipe.mimics}</span></p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => showToast("Printing recipe...")} className="p-3 glass rounded-xl text-text-gray hover:text-secondary transition-all"><Printer size={20} /></button>
                    <button onClick={() => showToast("Added to meal plan!")} className="p-3 glass rounded-xl text-text-gray hover:text-secondary transition-all"><Calendar size={20} /></button>
                    <button onClick={() => showToast("Link copied!")} className="p-3 glass rounded-xl text-text-gray hover:text-secondary transition-all"><Share2 size={20} /></button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                  <div className="md:col-span-1 space-y-6">
                    <div className="space-y-4">
                      <h5 className="font-bold text-sm uppercase tracking-widest text-secondary">Ingredients</h5>
                      <ul className="space-y-3 text-sm text-text-gray">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-secondary rounded-full" /> {selectedRecipe.swap}</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-secondary rounded-full" /> Nutritional Yeast</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-secondary rounded-full" /> Garlic Powder</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-secondary rounded-full" /> Smoked Paprika</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-secondary rounded-full" /> Olive Oil</li>
                      </ul>
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-6">
                    <h5 className="font-bold text-sm uppercase tracking-widest text-secondary">Instructions</h5>
                    <div className="space-y-6">
                      {[1, 2, 3].map(step => (
                        <div key={step} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center font-bold text-secondary text-sm">{step}</div>
                          <p className="text-sm text-text-gray leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
