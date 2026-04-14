import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Github, Twitter, Linkedin, MessageCircle, MapPin, Phone } from 'lucide-react';

interface ContactProps {
  showToast: (msg: string, type?: 'info' | 'success' | 'error') => void;
}

export default function Contact({ showToast }: ContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast("Message sent! I'll get back to you soon.", "success");
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold font-display">👋 Contact the Founder</h2>
        <p className="text-text-gray max-w-2xl mx-auto">Have feedback, a feature request, or just want to share your transformation story? I'm all ears.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="glass p-8 rounded-[2rem] space-y-6 border border-secondary/5 shadow-sm">
            <h3 className="text-2xl font-bold font-display">Get in Touch</h3>
            <p className="text-text-gray leading-relaxed">
              Vegify started as a personal project to help my friends transition to a plant-based lifestyle. Today, it's a community of thousands. I still read every message personally.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-gray uppercase tracking-widest">Email</p>
                  <p className="font-bold">founder@vegify.app</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-gray uppercase tracking-widest">Location</p>
                  <p className="font-bold">Bangalore, India</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50">
              <p className="text-xs font-bold text-text-gray uppercase tracking-widest mb-4">Follow the Journey</p>
              <div className="flex gap-4">
                {[Twitter, Github, Linkedin, MessageCircle].map((Icon, i) => (
                  <button key={i} className="p-3 glass rounded-xl text-text-gray hover:text-secondary hover:scale-110 transition-all">
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="purple-gradient p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-bold font-display">Office Hours</h3>
              <p className="text-sm opacity-90">I host a weekly open Zoom call for all members every Friday at 6 PM IST. Come say hi!</p>
              <button className="bg-white text-secondary px-6 py-3 rounded-xl font-bold text-xs shadow-lg hover:scale-105 transition-all active:scale-95">
                View Schedule
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass p-8 lg:p-12 rounded-[2.5rem] shadow-xl border border-secondary/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-gray uppercase tracking-widest ml-1">Your Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="John Doe"
                  className="w-full p-4 rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-secondary/10 transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-gray uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  required 
                  placeholder="john@example.com"
                  className="w-full p-4 rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-secondary/10 transition-all text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-gray uppercase tracking-widest ml-1">Subject</label>
              <select className="w-full p-4 rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-secondary/10 transition-all text-sm bg-white">
                <option>Feedback</option>
                <option>Feature Request</option>
                <option>Success Story</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-gray uppercase tracking-widest ml-1">Message</label>
              <textarea 
                required 
                placeholder="Tell me what's on your mind..."
                className="w-full p-4 rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-secondary/10 transition-all text-sm min-h-[150px] resize-none"
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full purple-gradient text-white py-4 rounded-full font-bold shadow-lg hover:shadow-secondary/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Send Message <Send size={18} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
