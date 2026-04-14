import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../lib/utils';

export type ToastType = 'info' | 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-secondary" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] w-full max-w-sm px-4"
    >
      <div className="glass p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-secondary/10">
        <div className="flex-shrink-0">{icons[type]}</div>
        <p className="text-sm font-bold text-text-dark flex-grow">{message}</p>
        <button onClick={onClose} className="text-gray-300 hover:text-secondary transition-colors">
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
}
