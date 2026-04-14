import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, Share2, Plus, Search, TrendingUp, Award, MoreHorizontal } from 'lucide-react';
import { cn } from '../lib/utils';
import { COMMUNITY_POSTS } from '../constants';

interface CommunityProps {
  showToast: (msg: string, type?: 'info' | 'success' | 'error') => void;
}

export default function Community({ showToast }: CommunityProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Success Story', 'Question', 'Recipe Sharing', 'Transformation of the Day'];

  const filteredPosts = COMMUNITY_POSTS.filter(p => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.content.toLowerCase().includes(search.toLowerCase()) || 
                         p.user.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="grid lg:grid-cols-12 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Sidebar */}
      <div className="lg:col-span-3 space-y-6">
        <div className="glass p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-lg font-display">Trending Topics</h3>
          <div className="space-y-3">
            {['#TofuHacks', '#30DayVegify', '#NoMeatMonday', '#PlantBasedIndia'].map(tag => (
              <div key={tag} className="flex items-center justify-between group cursor-pointer">
                <span className="text-sm text-text-gray group-hover:text-secondary transition-colors">{tag}</span>
                <TrendingUp className="w-3 h-3 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-lg font-display">Top Contributors</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full purple-gradient flex items-center justify-center text-white text-xs font-bold">
                  {i === 1 ? 'RK' : i === 2 ? 'PS' : 'AM'}
                </div>
                <div>
                  <p className="text-sm font-bold">User {i}</p>
                  <p className="text-[10px] text-secondary font-bold uppercase tracking-widest flex items-center gap-1">
                    <Award className="w-3 h-3" /> Plant Pro
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Feed */}
      <div className="lg:col-span-6 space-y-6">
        {/* Create Post */}
        <div className="glass p-6 rounded-3xl shadow-sm border border-secondary/5">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full purple-gradient flex-shrink-0" />
            <div className="flex-grow space-y-4">
              <textarea 
                placeholder="Share your transformation or ask a question..." 
                className="w-full bg-gray-50/50 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-secondary/10 transition-all min-h-[100px] resize-none"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-secondary/10 rounded-lg text-secondary transition-colors"><Plus size={20} /></button>
                </div>
                <button 
                  onClick={() => showToast("Post shared with the community!", "success")}
                  className="purple-gradient text-white px-6 py-2 rounded-full font-bold text-sm shadow-md hover:scale-105 transition-all active:scale-95"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                activeCategory === cat ? "bg-secondary text-white shadow-md" : "glass text-text-gray hover:text-secondary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post, idx) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-6 rounded-3xl shadow-sm border border-secondary/5 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <img src={post.avatar} className="w-12 h-12 rounded-full bg-secondary/10" alt={post.user} />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold">{post.user}</p>
                      {post.badge && (
                        <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">{post.badge}</span>
                      )}
                    </div>
                    <p className="text-[10px] text-text-gray">@{post.username} • {post.timeAgo}</p>
                  </div>
                </div>
                <button className="text-gray-300 hover:text-secondary transition-colors"><MoreHorizontal size={20} /></button>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-text-dark leading-relaxed">{post.content}</p>
                {post.image && (
                  <div className="rounded-2xl overflow-hidden h-64">
                    <img src={post.image} className="w-full h-full object-cover" alt="Post content" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                <button 
                  onClick={() => showToast("Liked!")}
                  className="flex items-center gap-2 text-xs font-bold text-text-gray hover:text-secondary transition-colors"
                >
                  <Heart size={18} /> {post.likes}
                </button>
                <button className="flex items-center gap-2 text-xs font-bold text-text-gray hover:text-secondary transition-colors">
                  <MessageSquare size={18} /> {post.comments}
                </button>
                <button className="flex items-center gap-2 text-xs font-bold text-text-gray hover:text-secondary transition-colors">
                  <Share2 size={18} /> Share
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="lg:col-span-3 space-y-6">
        <div className="glass p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-lg font-display">Search Community</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search posts..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50/50 rounded-xl text-xs outline-none focus:ring-2 focus:ring-secondary/10 transition-all"
            />
          </div>
        </div>

        <div className="purple-gradient p-6 rounded-3xl text-white space-y-4 shadow-xl">
          <h3 className="font-bold text-lg font-display">Join the Vegify Circle</h3>
          <p className="text-xs opacity-90 leading-relaxed">Get exclusive access to weekly live Q&A sessions with our founder and top plant-based nutritionists.</p>
          <button className="w-full bg-white text-secondary py-3 rounded-xl font-bold text-xs shadow-lg hover:scale-105 transition-all active:scale-95">
            Upgrade to Elite
          </button>
        </div>
      </div>
    </div>
  );
}
