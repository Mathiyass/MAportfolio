/* eslint-disable */
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SYMBOLS = ['⚡', '⚛️', '🔥', '🚀', '💻', '🎮', '🌐', '🔋'];

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const shuffledSymbols = [...SYMBOLS, ...SYMBOLS]
      .sort(() => 0.5 - Math.random())
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledSymbols);
    setFlippedIds([]);
    setMoves(0);
    setMatches(0);
    setIsWon(false);
  };

  const handleCardClick = (id: number) => {
    if (flippedIds.length === 2) return; // Prevent clicking while 2 are flipped
    if (cards[id].isMatched || cards[id].isFlipped) return; // Ignore already matched/flipped

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlippedIds = [...flippedIds, id];
    setFlippedIds(newFlippedIds);

    if (newFlippedIds.length === 2) {
      setMoves(m => m + 1);
      
      const firstCard = newCards[newFlippedIds[0]];
      const secondCard = newCards[newFlippedIds[1]];

      if (firstCard.symbol === secondCard.symbol) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            newFlippedIds.includes(c.id) ? { ...c, isMatched: true } : c
          ));
          setFlippedIds([]);
          setMatches(m => {
            const newMatches = m + 1;
            if (newMatches === SYMBOLS.length) setIsWon(true);
            return newMatches;
          });
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            newFlippedIds.includes(c.id) ? { ...c, isFlipped: false } : c
          ));
          setFlippedIds([]);
        }, 1000);
      }
    }
  };

  if (cards.length === 0) return null;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-background-2/50 rounded-2xl border border-white/10">
      <div className="flex justify-between w-full max-w-sm mb-6 items-center">
        <h3 className="text-xl font-display font-bold text-white">Memory Match</h3>
        <div className="text-cyan font-mono text-lg">MOVES: {moves}</div>
      </div>

      <div className="relative p-2 bg-background border border-white/20 rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.05)]">
        <div className="grid grid-cols-4 gap-3 p-2">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 cursor-pointer [perspective:1000px]`}
              onClick={() => handleCardClick(card.id)}
            >
              <motion.div
                className="w-full h-full relative [transform-style:preserve-3d]"
                initial={false}
                animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                {/* Front (Back of card) */}
                <div className="absolute inset-0 bg-background-2 border border-white/10 rounded-lg flex items-center justify-center [backface-visibility:hidden]">
                  <div className="w-8 h-8 rounded-full border border-cyan/30 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan/50" />
                  </div>
                </div>

                {/* Back (Symbol side) */}
                <div className="absolute inset-0 bg-white/5 border border-cyan/50 rounded-lg flex items-center justify-center text-3xl [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                  <AnimatePresence>
                    {(card.isFlipped || card.isMatched) && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', bounce: 0.5 }}
                      >
                        {card.symbol}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {isWon && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 backdrop-blur-sm rounded-xl"
          >
            <h2 className="text-3xl font-display font-bold text-cyan mb-2">WELL DONE!</h2>
            <p className="text-text-2 mb-6 font-mono">Completed in {moves} moves</p>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-cyan hover:text-black transition-colors"
            >
              PLAY AGAIN
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
