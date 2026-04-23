'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useByteStore } from '@/store/byteStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles, X, RotateCcw, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BytePanel() {
  const { isCollapsed, isGenerating, contextualPrompt, actions } = useByteStore();
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    actions.setIsGenerating(true);
    actions.setContextualPrompt(prompt);
    actions.showSpeech("Processing your request...");
    
    // Simulate AI response
    setTimeout(() => {
      actions.setIsGenerating(false);
      actions.showSpeech("I've analyzed the current view. What's next?");
    }, 2000);
    
    setPrompt('');
  };

  return (
    <AnimatePresence>
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 20, y: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: 20, y: 20 }}
          className="absolute bottom-full right-0 mb-4 w-72 flex flex-col gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main Prompt Hub */}
          <div className="glass-light rounded-2xl p-4 shadow-elevated border-white/10 overflow-hidden relative">
            {/* Animated Gradient Background when generating */}
            {isGenerating && (
              <div className="absolute inset-0 bg-gradient-to-r from-cyan/10 via-red/10 to-cyan/10 animate-gradient bg-[length:200%_auto] -z-10" />
            )}

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "p-1.5 rounded-lg bg-cyan/10 text-cyan",
                  isGenerating && "animate-pulse"
                )}>
                  <Sparkles size={14} />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-text-3">AI Context Hub</span>
              </div>
              <button 
                onClick={() => actions.toggleCollapsed()}
                className="text-text-4 hover:text-text-2 transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <Input
                placeholder="Ask BYTE anything..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-white/5 border-white/10 focus-visible:ring-cyan/30 pr-10 h-10 text-xs font-body"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan/50 hover:text-cyan transition-colors"
              >
                <Sparkles size={14} />
              </button>
            </form>

            {/* Contextual Actions */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px] bg-white/5 border-white/5 hover:bg-white/10">
                Enhance UI
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px] bg-white/5 border-white/5 hover:bg-white/10">
                Check A11y
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px] bg-white/5 border-white/5 hover:bg-white/10">
                Optimize
              </Button>
            </div>
          </div>

          {/* Feedback Loop (Stitch Pattern) */}
          {!isGenerating && contextualPrompt && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-light rounded-xl p-2 flex items-center justify-between shadow-lg border-white/5"
            >
              <div className="flex items-center gap-2 ml-1">
                <span className="text-[9px] font-mono text-text-3 uppercase">Result Good?</span>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-white/5 rounded text-text-4 hover:text-cyan transition-colors">
                    <ThumbsUp size={12} />
                  </button>
                  <button className="p-1 hover:bg-white/5 rounded text-text-4 hover:text-red transition-colors">
                    <ThumbsDown size={12} />
                  </button>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-[9px] gap-1 opacity-60 hover:opacity-100">
                <RotateCcw size={10} />
                Regenerate
              </Button>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
