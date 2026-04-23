"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Lock, ShieldAlert, EyeOff, Terminal, Cpu, Database, Binary } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThreeScene } from '@/components/three/Scene';
import { GlitchShader } from '@/components/three/GlitchShader';
import { useByteStore } from '@/store/byteStore';

const encryptedNodes = [
  {
    title: "PROJECT_BYTE_ORIGIN",
    id: "NEX_001",
    security: "Level 5",
    description: "Documentation on the neural synthesis of the BYTE mascot. Merging reactive state with recursive animation logic.",
    details: "BYTE was conceptualized as a bridging entity between standard DOM interactions and advanced 3D spatial computing. Neural weights: [0.82, 0.94, 1.0]"
  },
  {
    title: "NEXUS_CORE_ARCHITECTURE",
    id: "NEX_002",
    security: "Restricted",
    description: "Topological map of the 16 GLSL shaders powering the Nexus Prime interface.",
    details: "Every shader operates on an isolated lifecycle using IntersectionObservers to maintain 99+ performance scores."
  },
  {
    title: "PROTO_GHOST_SHELL",
    id: "NEX_003",
    security: "Classified",
    description: "Early-stage research into Inverse Kinematics for ultra-responsive cursor-to-mesh tracking.",
    details: "The IK Solver v2.1 uses high-momentum vectors to simulate lifelike curiosity in non-humanoid digital entities."
  }
];

export default function SecretPage() {
  const [authorized, setAuthorized] = React.useState(false);
  const [decryptingId, setDecryptingId] = React.useState<string | null>(null);
  const { actions: byte } = useByteStore();

  const handleAuthorize = () => {
    setAuthorized(true);
    byte.showSpeech("ACCESS_GRANTED. System integrity compromised.", 3000);
  };

  return (
    <PageWrapper>
      {authorized && (
        <ThreeScene className="opacity-40">
           <GlitchShader opacity={0.5} />
        </ThreeScene>
      )}

      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen text-center flex flex-col items-center relative z-10">
        <AnimatePresence mode="wait">
          {!authorized ? (
            <motion.div
              key="auth-gate"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="max-w-md w-full"
            >
              <div className="mb-12 inline-flex items-center justify-center p-6 rounded-full bg-red/10 text-red border border-red/20 shadow-[0_0_30px_rgba(251,113,133,0.2)]">
                <Lock size={48} />
              </div>
              <h1 className="text-4xl font-display font-black text-white uppercase italic tracking-tighter">Encrypted_Sector</h1>
              <p className="text-text-2 font-mono text-[10px] uppercase tracking-[0.3em] mb-12 opacity-60">Authentication Required // Protocol_Zero</p>
              
              <Card variant="glass" className="p-8 space-y-6 text-left border-red/20">
                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-text-4 uppercase tracking-[0.3em]">Neural ID Token</label>
                  <div className="h-12 glass-light border border-white/10 rounded-sm flex items-center px-4 font-mono text-text-3 text-xs">
                    •••• •••• •••• ••••
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full h-12 border border-red/30 text-red hover:bg-red/10 uppercase tracking-[0.2em] font-bold text-[10px]"
                  onClick={handleAuthorize}
                >
                  Bypass Firewall
                </Button>
              </Card>
            </motion.div>
          ) : (
            <div className="w-full text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-4xl mb-24"
              >
                <div className="flex items-center gap-3 text-red font-mono text-[10px] uppercase tracking-[0.4em] mb-6">
                  <ShieldAlert size={14} className="animate-pulse" />
                  SYSTEM_BREACH // CLASSIFIED_ARCHIVE
                </div>
                <h1 className="text-6xl lg:text-9xl font-display font-black mb-12 text-white uppercase tracking-tighter leading-none italic">
                  Deep <span className="text-red">Archive</span>.
                </h1>
                <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed opacity-80">
                  Accessing the decrypted blueprints of the Nexus Prime framework. These logs represent unstable iterations of the core MASCOT and SHADER protocols.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {encryptedNodes.map((node, i) => (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card variant="glass" className="p-8 group hover:border-red/40 border-white/5 transition-all h-full flex flex-col relative overflow-hidden">
                      <div className="flex justify-between items-start mb-8 relative z-10">
                        <div className="p-3 rounded-xl bg-red/10 text-red border border-red/20">
                          {i % 2 === 0 ? <Binary size={20} /> : <Database size={20} />}
                        </div>
                        <span className="font-mono text-[9px] text-text-4 uppercase tracking-[0.3em]">{node.id}</span>
                      </div>
                      
                      <h3 className="text-2xl font-display font-bold text-text-0 mb-2 group-hover:text-red transition-colors italic uppercase tracking-tighter">{node.title}</h3>
                      <div className="inline-flex items-center gap-2 mb-6 opacity-60">
                        <EyeOff size={10} className="text-text-4" />
                        <span className="font-mono text-[8px] text-text-3 uppercase tracking-widest">{node.security} Clearance</span>
                      </div>
                      
                      <p className="text-xs text-text-3 font-mono leading-relaxed mb-8 flex-grow">
                        {decryptingId === node.id ? (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red"
                          >
                            {node.details}
                          </motion.span>
                        ) : (
                          node.description
                        )}
                      </p>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`mt-auto h-9 border border-white/5 font-mono text-[9px] uppercase tracking-[0.2em] gap-2 ${decryptingId === node.id ? 'bg-red/20 text-red' : 'hover:bg-white/5'}`}
                        onClick={() => {
                           setDecryptingId(node.id);
                           byte.showSpeech("Extracting secure data packets...");
                        }}
                      >
                        {decryptingId === node.id ? "LOG_EXTRACTED" : "DECRYPT_RECORD"}
                      </Button>

                      {/* Decryption Progress Bar */}
                      {decryptingId === node.id && (
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-red/10 overflow-hidden">
                           <motion.div 
                             initial={{ x: '-100%' }}
                             animate={{ x: '0%' }}
                             transition={{ duration: 1 }}
                             className="w-full h-full bg-red"
                           />
                        </div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </PageWrapper>
  );
}