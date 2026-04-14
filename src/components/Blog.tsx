import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowRight, Bookmark } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

interface BlogProps {
  showToast: (msg: string, type?: 'info' | 'success' | 'error') => void;
}

export default function Blog({ showToast }: BlogProps) {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold font-display">📖 The Vegify Journal</h2>
        <p className="text-text-gray max-w-2xl mx-auto">Insights, science, and stories to fuel your plant-based journey.</p>
      </div>

      {/* Featured Post */}
      <div className="glass rounded-[2.5rem] overflow-hidden shadow-xl border border-secondary/5 group cursor-pointer">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 h-64 lg:h-auto overflow-hidden">
            <img 
              src={BLOG_POSTS[0].image} 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" 
              alt="Featured"
            />
          </div>
          <div className="lg:w-1/2 p-8 lg:p-12 space-y-6 flex flex-col justify-center">
            <div className="flex items-center gap-4">
              <span className="bg-secondary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Featured</span>
              <span className="text-[10px] text-text-gray font-bold uppercase tracking-widest flex items-center gap-1">
                <Clock className="w-3 h-3" /> {BLOG_POSTS[0].readTime} read
              </span>
            </div>
            <h3 className="text-3xl font-bold leading-tight group-hover:text-secondary transition-colors font-display">{BLOG_POSTS[0].title}</h3>
            <p className="text-text-gray leading-relaxed">{BLOG_POSTS[0].excerpt}</p>
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full purple-gradient" />
                <span className="text-xs font-bold">Vegify Editorial</span>
              </div>
              <button className="flex items-center gap-2 text-secondary font-bold text-sm group-hover:translate-x-2 transition-transform">
                Read Article <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.slice(1).map((post, idx) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all border border-secondary/5 flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={post.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                alt={post.title}
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-secondary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                {post.category}
              </div>
            </div>
            <div className="p-6 space-y-4 flex-grow flex flex-col">
              <div className="flex items-center justify-between text-[10px] text-text-gray font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
              </div>
              <h4 className="font-bold text-lg group-hover:text-secondary transition-colors font-display line-clamp-2">{post.title}</h4>
              <p className="text-xs text-text-gray line-clamp-3 flex-grow">{post.excerpt}</p>
              <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                <button className="text-secondary font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={14} />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast("Article bookmarked!");
                  }}
                  className="p-2 text-gray-300 hover:text-secondary transition-colors"
                >
                  <Bookmark size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Newsletter */}
      <div className="purple-gradient rounded-[2.5rem] p-12 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <h3 className="text-3xl font-bold font-display">Stay Inspired.</h3>
          <p className="opacity-90">Get weekly plant-based tips, new mimic recipes, and success stories delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 outline-none focus:bg-white/30 transition-all placeholder:text-white/60"
            />
            <button 
              onClick={() => showToast("Subscribed successfully!", "success")}
              className="bg-white text-secondary px-8 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-all active:scale-95"
            >
              Subscribe
            </button>
          </div>
          <p className="text-[10px] opacity-60">No spam. Just plants. Unsubscribe anytime.</p>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-deep/20 rounded-full -ml-32 -mb-32 blur-3xl" />
      </div>
    </div>
  );
}
