'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useByteStore } from '@/store/byteStore';
import { useThemeStore } from '@/store/themeStore';
import { usePathname, useRouter } from 'next/navigation';
import { Send, Terminal as TerminalIcon, Sparkles, X, Activity, User, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AIAction {
  type: 'navigate' | 'animate' | 'retro';
  payload: string;
}

export function ByteNeuralInterface() {
  const { isCollapsed, isGenerating, history, currentSpeech, actions } = useByteStore();
  const theme = useThemeStore();
  const [inputValue, setInputValue] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isGenerating]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isGenerating) return;

    const message = inputValue.trim();
    setInputValue('');
    
    // 1. Log user message
    actions.showSpeech(message, 3000, 'user');
    actions.setIsGenerating(true);

    try {
      // 2. Call AI Bridge (Base path is /MAportfolio)
      const response = await fetch('/MAportfolio/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          pathname,
          history: history.slice(-5)
        }),
      });

      const data = await response.json();

      // 3. Process AI Response
      if (data.text) {
        actions.setMood(data.mood || 'idle');
        actions.showSpeech(data.text, 5000, 'assistant');
      }

      // 4. Dispatch Actions
      if (data.actions && Array.isArray(data.actions)) {
        data.actions.forEach((action: AIAction) => {
          switch(action.type) {
            case 'navigate':
              setTimeout(() => router.push(action.payload), 1500);
              break;
            case 'animate':
              if (action.payload === 'jump') actions.jump();
              if (action.payload === 'wave') actions.wave();
              if (action.payload === 'celebrate') actions.celebrate();
              break;
            case 'retro':
              theme.actions.toggleRetroMode();
              break;
          }
        });
      }
    } catch (error) {
      console.error("BYTE_COMMS_ERROR:", error);
      actions.showSpeech("Communication link unstable. Interference detected.", 4000);
      actions.setMood('sad');
    } finally {
      actions.setIsGenerating(false);
    }
  };

  if (isCollapsed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="absolute bottom-full right-0 mb-6 w-80 sm:w-96 flex flex-col glass rounded-2xl border-white/10 shadow-elevated overflow-hidden z-50 pointer-events-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="bg-white/5 border-b border-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan/10 text-cyan">
            <Cpu size={14} className={isGenerating ? "animate-pulse" : ""} />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-0">Neural_Nexus // BYTE</div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-cyan animate-pulse" />
              <span className="text-[8px] font-mono uppercase text-cyan/70 tracking-widest">Link Stable</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => actions.toggleCollapsed()}
          className="p-1 text-text-4 hover:text-text-0 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Message History */}
      <div 
        ref={scrollRef}
        className="flex-1 max-h-80 overflow-y-auto p-4 space-y-4 no-scrollbar scroll-smooth bg-black/20"
      >
        {history.length === 0 && (
          <div className="h-32 flex flex-col items-center justify-center text-center opacity-40">
             <TerminalIcon size={24} className="mb-2" />
             <p className="text-[10px] font-mono uppercase tracking-widest">Awaiting Direct Link...</p>
          </div>
        )}
        
        {history.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "flex flex-col max-w-[85%]",
              msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
            <div className={cn(
              "p-3 rounded-xl text-xs font-body leading-relaxed",
              msg.role === 'user' 
                ? "bg-cyan/10 border border-cyan/20 text-text-1 rounded-br-none" 
                : "glass-light border border-white/10 text-text-2 rounded-bl-none"
            )}>
              {msg.text}
            </div>
            <span className="text-[8px] font-mono uppercase opacity-30 mt-1 flex items-center gap-1">
              {msg.role === 'user' ? <><User size={8} /> USER</> : <><Cpu size={8} /> BYTE</>}
            </span>
          </motion.div>
        ))}

        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-start max-w-[85%]"
          >
            <div className="glass-light border border-white/5 p-3 rounded-xl rounded-bl-none">
              <div className="flex gap-1.5">
                <div className="w-1 h-1 bg-cyan rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1 h-1 bg-cyan rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1 h-1 bg-cyan rounded-full animate-bounce" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 flex gap-2 border-t border-white/5 bg-white/5 overflow-x-auto no-scrollbar">
         {['Enhance', 'Optimize', 'Tour', 'System Info'].map(label => (
           <Button 
             key={label}
             variant="ghost" 
             size="sm" 
             onClick={() => setInputValue(label)}
             className="h-6 px-2 text-[8px] uppercase tracking-widest bg-white/5 border-white/5 whitespace-nowrap hover:bg-cyan/10 hover:text-cyan transition-all"
           >
             {label}
           </Button>
         ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-bg-base/50">
        <form 
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 glass-light border border-white/10 rounded-xl pl-4 pr-1 py-1 group focus-within:border-cyan/50 transition-colors"
        >
          <TerminalIcon size={12} className="text-text-4 group-focus-within:text-cyan" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="DIRECT_LINK..."
            disabled={isGenerating}
            className="bg-transparent border-none outline-none text-[10px] font-mono text-text-0 w-full placeholder:text-text-4 h-8"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim() || isGenerating}
            className="p-2 rounded-lg bg-cyan/10 text-cyan hover:bg-cyan/20 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
