import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Shield, Award, Settings, LogOut, Camera, RefreshCw, Flame, Leaf } from 'lucide-react';
import { useAuth } from '../lib/FirebaseProvider';
import { api } from '../lib/api';
import { cn } from '../lib/utils';

interface ProfileProps {
  snaps: number;
  converted: number;
  showToast: (msg: string, type?: 'info' | 'success' | 'error') => void;
  onLogout: () => void;
}

export default function Profile({ snaps, converted, showToast, onLogout }: ProfileProps) {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.getProfile();
        setProfileData(data);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const stats = [
    { label: 'Total Snaps', value: snaps, icon: Camera, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Swaps Made', value: converted, icon: RefreshCw, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Health Score', value: '85', icon: Flame, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Eco Impact', value: 'High', icon: Leaf, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header / Cover */}
      <div className="relative h-48 purple-gradient rounded-[2.5rem] overflow-hidden shadow-lg">
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill="#FFF" d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.3,87.1,-15.7,85.6,-0.9C84.1,14,77.7,27.9,69,40.1C60.3,52.3,49.3,62.8,36.4,70.1C23.5,77.4,8.7,81.5,-6.1,80.5C-20.9,79.5,-35.7,73.4,-48.5,64.3C-61.3,55.2,-72,43.1,-78.3,29C-84.5,14.9,-86.3,-1.2,-83.4,-16.5C-80.5,-31.8,-72.9,-46.3,-61.2,-54C-49.5,-61.7,-33.7,-62.6,-19.9,-69.3C-6.1,-76,-2,-88.5,13.9,-86.3C29.8,-84.1,31.3,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      {/* Profile Info Card */}
      <div className="glass -mt-24 p-8 rounded-[2.5rem] shadow-xl relative z-10 border border-white/20">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-20">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gray-100">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary/10 text-secondary">
                  <User size={48} />
                </div>
              )}
            </div>
            <button className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow-lg text-secondary hover:scale-110 transition-all">
              <Camera size={16} />
            </button>
          </div>
          
          <div className="flex-grow text-center md:text-left pb-2">
            <h2 className="text-3xl font-bold font-display">{user?.displayName || 'Vegify Hero'}</h2>
            <p className="text-text-gray flex items-center justify-center md:justify-start gap-2">
              <Mail size={14} /> {user?.email}
            </p>
          </div>

          <div className="flex gap-3 pb-2">
            <button 
              onClick={() => showToast("Settings coming soon!")}
              className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:text-secondary hover:bg-secondary/5 transition-all"
            >
              <Settings size={20} />
            </button>
            <button 
              onClick={onLogout}
              className="p-3 rounded-2xl bg-red-50 text-red-400 hover:bg-red-100 transition-all"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 rounded-3xl bg-white border border-gray-100 shadow-sm text-center"
            >
              <div className={cn("w-10 h-10 rounded-2xl mx-auto mb-3 flex items-center justify-center", stat.bg, stat.color)}>
                <stat.icon size={20} />
              </div>
              <p className="text-2xl font-bold text-secondary-deep">{stat.value}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Account Details */}
        <div className="glass p-8 rounded-[2.5rem] space-y-6">
          <h3 className="text-xl font-bold font-display flex items-center gap-2">
            <Shield className="text-secondary" size={20} /> Account Security
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 rounded-2xl bg-white border border-gray-50">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Auth Provider</p>
                <p className="font-medium">{user?.providerData[0]?.providerId === 'google.com' ? 'Google Account' : 'Email & Password'}</p>
              </div>
              <div className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full uppercase">Verified</div>
            </div>

            <div className="flex justify-between items-center p-4 rounded-2xl bg-white border border-gray-50">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Member Since</p>
                <p className="font-medium">{user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Recent'}</p>
              </div>
              <Calendar className="text-gray-300" size={20} />
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="glass p-8 rounded-[2.5rem] space-y-6">
          <h3 className="text-xl font-bold font-display flex items-center gap-2">
            <Award className="text-secondary" size={20} /> Achievements
          </h3>
          
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Early Bird', icon: '🌅', unlocked: true },
              { label: 'First Swap', icon: '🔄', unlocked: snaps > 0 },
              { label: 'Green Hero', icon: '🌿', unlocked: converted > 5 },
              { label: 'AI Master', icon: '🤖', unlocked: false },
              { label: 'Chef', icon: '👨‍🍳', unlocked: false },
              { label: 'Elite', icon: '💎', unlocked: false },
            ].map((badge) => (
              <div 
                key={badge.label}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all",
                  badge.unlocked ? "bg-white border-secondary/20 shadow-sm" : "bg-gray-50 border-transparent opacity-40 grayscale"
                )}
              >
                <span className="text-2xl">{badge.icon}</span>
                <span className="text-[8px] font-bold uppercase text-center">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
