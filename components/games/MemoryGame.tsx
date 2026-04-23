'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioStore } from '@/store/audioStore';
import { 
  Zap, Cpu, Activity, Globe, Shield, 
  Terminal, Database, Radio, 
  LucideIcon 
} from 'lucide-react';

const ICONS: LucideIcon[] = [
  Zap, Cpu, Activity, Globe, 
  Shield, Terminal, Database, Radio
];

interface Card {
  id: number;
  iconIdx: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const { actions: audio } = useAudioStore();

  const resetGame = useCallback(() => {
    const shuffled = [...Array(ICONS.length).keys(), ...Array(ICONS.length).keys()]
      .sort(() => 0.5 - Math.random())
      .map((iconIdx, index) => ({
        id: index,
        iconIdx,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedIds([]);
    setMoves(0);
    setIsWon(false);
  }, []);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const handleCardClick = (id: number) => {
    if (flippedIds.length === 2) return;
    if (cards[id].isMatched || cards[id].isFlipped) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlippedIds = [...flippedIds, id];
    setFlippedIds(newFlippedIds);

    if (newFlippedIds.length === 2) {
      setMoves(m => m + 1);
      
      const first = newCards[newFlippedIds[0]];
      const second = newCards[newFlippedIds[1]];

      if (first.iconIdx === second.iconIdx) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            newFlippedIds.includes(c.id) ? { ...c, isMatched: true } : c
          ));
          setFlippedIds([]);
          if (newCards.filter(c => c.isMatched).length + 2 === cards.length) {
            setIsWon(true);
          }
        }, 400);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            newFlippedIds.includes(c.id) ? { ...c, isFlipped: false } : c
          ));
          setFlippedIds([]);
        }, 800);
      }
    }
  };

  if (cards.length === 0) return null;

  return (
    <div className="flex flex-col items-center justify-center p-6 glass-light rounded-2xl border-border-c relative overflow-hidden">
      <div className="flex justify-between w-full max-w-sm mb-6 items-center">
        <h3 className="text-xl font-display font-bold text-white uppercase tracking-tighter italic">System // Memory</h3>
        <div className="text-cyan font-stat text-2xl tracking-wider">CYCLES: {String(moves).padStart(2, '0')}</div>
      </div>

      <div className="relative p-3 bg-bg-base border border-cyan/20 rounded-xl shadow-glow-c-s">
        <div className="grid grid-cols-4 gap-3 p-1">
          {cards.map((card) => {
            const Icon = ICONS[card.iconIdx];
            return (
              <motion.div
                key={card.id}
                className="relative w-16 h-16 sm:w-20 sm:h-20 cursor-pointer [perspective:1000px]"
                onClick={() => handleCardClick(card.id)}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-full h-full relative [transform-style:preserve-3d]"
                  animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Front (Data Encrypted) */}
                  <div className="absolute inset-0 bg-bg-muted border border-white/5 rounded-lg flex items-center justify-center [backface-visibility:hidden]">
                    <div className="w-10 h-10 rounded-full border border-cyan/10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan/20 animate-pulse" />
                    </div>
                  </div>

                  {/* Back (Decrypted Icon) */}
                  <div className={`absolute inset-0 ${card.isMatched ? 'bg-cyan/10 border-cyan' : 'bg-white/5 border-cyan/30'} border rounded-lg flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-glow-c-s`}>
                    <Icon className={`w-8 h-8 ${card.isMatched ? 'text-cyan shadow-glow-c-s' : 'text-cyan/70'}`} />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {isWon && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-bg-base/90 flex flex-col items-center justify-center z-20 backdrop-blur-md rounded-xl border border-cyan/50"
            >
              <h2 className="text-3xl font-display font-black text-cyan mb-2 italic tracking-tighter">DATA_SYNC_COMPLETE</h2>
              <p className="text-text-2 mb-6 font-mono text-xs opacity-60 uppercase">System Optimized in {moves} Cycles</p>
              <button
                onClick={resetGame}
                className="px-8 py-2 bg-cyan text-black font-bold rounded-sm hover:skew-x-[-12deg] transition-transform uppercase tracking-widest text-xs"
              >
                RE-INITIALIZE
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-6 text-text-3 text-[10px] font-mono uppercase tracking-[0.2em]">
        <span>Scan Grid to Restore Neural Integrity</span>
      </div>
    </div>
  );
}