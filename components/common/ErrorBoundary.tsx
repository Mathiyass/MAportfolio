'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('NEXUS_SYSTEM_CRITICAL_FAILURE:', error, errorInfo);
  }

  private handleReset = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[9999] bg-bg-base flex flex-col items-center justify-center p-8 overflow-hidden">
          {/* Glitch Background Effect */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50" />
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-red/10 animate-pulse" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl w-full glass p-12 rounded-2xl border-red/30 shadow-[0_0_50px_rgba(255,82,92,0.2)] relative z-10"
          >
            <div className="flex items-center gap-4 mb-8 text-red">
              <div className="p-3 rounded-xl bg-red/10 border border-red/20">
                <AlertTriangle size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-display font-black uppercase italic tracking-tighter">System_Failure</h1>
                <p className="font-mono text-[10px] tracking-[0.3em] opacity-60 uppercase">Kernel Panic // Sector_Null</p>
              </div>
            </div>

            <div className="bg-black/40 border border-white/5 p-6 rounded-lg mb-8 font-mono text-[11px] text-text-3 leading-relaxed break-all whitespace-pre-wrap">
              <span className="text-red/80 font-bold mr-2">[ERROR_LOG]:</span>
              {this.state.error?.message || 'Unknown protocol violation detected in the neural matrix.'}
              <br/><br/>
              <span className="text-cyan/80 font-bold mr-2">[TRACE_ID]:</span>
              {Math.random().toString(36).substring(2, 15).toUpperCase()}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={this.handleReset}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-red text-white font-bold rounded-sm hover:skew-x-[-12deg] transition-all uppercase tracking-widest text-xs"
              >
                <RefreshCw size={14} />
                RE-INITIALIZE_LINK
              </button>
              <a
                href="/"
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 glass-light text-text-0 font-bold rounded-sm hover:bg-white/10 transition-all uppercase tracking-widest text-xs border border-white/10"
              >
                RETURN_TO_HUB
              </a>
            </div>
          </motion.div>

          <div className="mt-12 font-mono text-[8px] text-text-4 uppercase tracking-[0.5em] animate-pulse">
            Nexus Prime OS // Security Protocol Active
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
