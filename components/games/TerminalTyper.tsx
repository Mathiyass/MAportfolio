'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const WORDS = [
  "system", "nexus", "prime", "module", "cyber", "neural", "link",
  "data", "stream", "packet", "quantum", "encrypt", "matrix", "vector",
  "algorithm", "binary", "kernel", "protocol", "syntax", "compile",
  "deploy", "iterate", "render", "shader", "vertex", "polygon", "mesh"
];

const GAME_DURATION = 30; // seconds

export function TerminalTyper() {
  const [currentWords, setCurrentWords] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [wpm, setWpm] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize words
  useEffect(() => {
    generateWords();
  }, []);

  const generateWords = () => {
    const shuffled = [...WORDS].sort(() => 0.5 - Math.random());
    setCurrentWords(shuffled.slice(0, 10)); // Load 10 words at a time
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setWordIndex(0);
    setInput('');
    generateWords();
    inputRef.current?.focus();
  };

  const endGame = useCallback(() => {
    setIsPlaying(false);
    setGameOver(true);
    // Calculate WPM: (characters typed / 5) / (time in minutes)
    // Here we use score as correct words, average word length is roughly 6 chars
    const calculatedWpm = Math.round((score * 6 / 5) / (GAME_DURATION / 60));
    setWpm(calculatedWpm);
  }, [score]);

  // Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, endGame]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPlaying && !gameOver && e.target.value.length > 0) {
      startGame();
    }

    const val = e.target.value;
    
    // Check if space is pressed
    if (val.endsWith(' ')) {
      const typedWord = val.trim();
      if (typedWord === currentWords[wordIndex]) {
        // Correct word
        setScore((s) => s + 1);
        
        // Move to next word, generate more if needed
        if (wordIndex === currentWords.length - 1) {
          generateWords();
          setWordIndex(0);
        } else {
          setWordIndex((i) => i + 1);
        }
      }
      setInput('');
    } else {
      setInput(val);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-background-2/50 rounded-2xl border border-white/10 font-mono">
      <div className="flex justify-between w-full mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <span className="text-cyan mr-2">&gt;_</span> Terminal Typer
        </h3>
        <div className="text-sm text-text-2">
          TIME: <span className={timeLeft <= 10 ? 'text-red' : 'text-cyan'}>0:{timeLeft.toString().padStart(2, '0')}</span>
        </div>
      </div>

      <div className="w-full bg-black/50 p-6 rounded-lg border border-white/5 mb-6 shadow-inner min-h-[120px] relative overflow-hidden">
        {gameOver ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-center"
          >
            <h4 className="text-2xl text-white mb-2">SESSION COMPLETE</h4>
            <div className="flex gap-6 text-xl">
              <div><span className="text-text-2">SCORE:</span> <span className="text-cyan">{score}</span></div>
              <div><span className="text-text-2">WPM:</span> <span className="text-cyan">{wpm}</span></div>
            </div>
            <button 
              onClick={startGame}
              className="mt-6 px-4 py-1 border border-cyan text-cyan hover:bg-cyan hover:text-black transition-colors"
            >
              [ RESTART_SEQUENCE ]
            </button>
          </motion.div>
        ) : (
          <div className="text-2xl leading-relaxed tracking-wide break-words flex flex-wrap gap-x-3 gap-y-2">
            {currentWords.map((word, i) => {
              let color = 'text-text-2/50'; // upcoming
              if (i < wordIndex) color = 'text-green-400 opacity-50'; // typed correctly
              else if (i === wordIndex) color = 'text-white font-bold bg-white/10 px-1 rounded'; // current
              
              // Highlight partial matches on current word
              if (i === wordIndex && input.length > 0) {
                const isCorrectSoFar = word.startsWith(input);
                return (
                  <span key={i} className={color}>
                    <span className={isCorrectSoFar ? 'text-cyan' : 'text-red bg-red/20'}>{input}</span>
                    <span className="opacity-50">{word.substring(input.length)}</span>
                  </span>
                );
              }

              return <span key={i} className={color}>{word}</span>;
            })}
          </div>
        )}
      </div>

      <div className="w-full relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan font-bold">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          disabled={gameOver}
          className="w-full bg-black/80 border border-white/20 rounded-lg py-4 pl-10 pr-4 text-white font-mono text-xl focus:outline-none focus:border-cyan transition-colors"
          placeholder={isPlaying ? "" : "Type to begin..."}
          autoComplete="off"
          spellCheck="false"
        />
      </div>
      
      <div className="mt-4 text-xs text-text-2/50 self-start">
        Current Score: <span className="text-white">{score}</span> words
      </div>
    </div>
  );
}
