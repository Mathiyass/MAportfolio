"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Send, Github, Linkedin, Radio, Info, Twitter, Facebook, Instagram, Music, MessageSquare, MessageCircle, Gamepad2, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [status, setStatus] = React.useState<'idle' | 'transmitting' | 'success' | 'error'>('idle');
  const [buttonText, setButtonText] = React.useState('Initialize Signal');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const contactNodes = [
    { label: "GitHub", icon: <Github size={16} />, href: siteConfig.links.github },
    { label: "LinkedIn", icon: <Linkedin size={16} />, href: siteConfig.links.linkedin },
    { label: "X / Twitter", icon: <Twitter size={16} />, href: siteConfig.links.twitter },
    { label: "Facebook", icon: <Facebook size={16} />, href: siteConfig.links.facebook },
    { label: "Instagram", icon: <Instagram size={16} />, href: siteConfig.links.instagram },
    { label: "Discord", icon: <MessageSquare size={16} />, href: siteConfig.links.discord },
    { label: "WhatsApp", icon: <MessageCircle size={16} />, href: siteConfig.links.whatsapp },
    { label: "Spotify", icon: <Music size={16} />, href: siteConfig.links.spotify },
    { label: "Steam", icon: <Gamepad2 size={16} />, href: siteConfig.links.steam },
    { label: "Epic Games", icon: <Gamepad2 size={16} />, href: siteConfig.links.epic },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'transmitting') return;

    setStatus('transmitting');
    setButtonText('Transmitting...');
    setErrorMessage(null);

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyooBrDPZPFRyW1pgi509siT98imErhwyJIi9u2MWx5uiiXaRI7baa64hyyNYpeS7ow/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(formData),
      });

      const text = await response.text();

      
      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse response as JSON:', text);
        throw new Error('Malformed server response');
      }

      // Handle common GAS success patterns (status: success or result: success)
      if (result.status === 'success' || result.result === 'success') {
        setStatus('success');
        setButtonText('Signal Received');
        setFormData({ name: '', email: '', message: '' });
        
        setTimeout(() => {
          setStatus('idle');
          setButtonText('Initialize Signal');
        }, 3000);
      } else {
        console.error('Server returned failure status:', result);
        throw new Error(result.message || 'Signal failed');
      }
    } catch (error: any) {
      console.error('Transmission error:', error);
      setStatus('error');
      setErrorMessage(error.message);
      setButtonText('Transmission Failed');
      
      setTimeout(() => {
        setStatus('idle');
        setButtonText('Initialize Signal');
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen pb-32">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-24"
        >
            <div className="flex items-center gap-3 text-cyan font-mono text-[10px] uppercase tracking-[0.3em] mb-6">
                <Info size={14} />
                GET IN TOUCH
            </div>
            <h1 className="text-6xl lg:text-9xl font-display font-bold mb-12 text-text-0 uppercase tracking-tighter leading-none">
                Direct <br/>
                <span className="text-text-4 font-black tracking-tighter">// Uplink.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                Establishing a high-bandwidth connection for professional inquiries, strategic partnerships, or system collaborations.
            </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-20 items-start">
            <div className="lg:col-span-5 space-y-16">
                <div className="space-y-12">
                    <div className="space-y-4">
                        <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan opacity-60">Frequency</h3>
                        <a href={`mailto:${siteConfig.links.email}`} className="group flex items-center gap-4 text-2xl md:text-3xl font-display font-bold text-text-0 hover:text-cyan transition-all break-all">
                            {siteConfig.links.email}
                            <Send size={20} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-cyan flex-shrink-0" />
                        </a>
                        <div className="flex items-center gap-2 text-text-3 font-mono text-[10px] uppercase">
                            <span className="text-red">EA_ID:</span> {siteConfig.links.eaid}
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-red opacity-60">Network Nodes</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {contactNodes.map((node) => (
                                <a 
                                    key={node.label}
                                    href={node.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-xl glass border-white/5 hover:border-cyan/30 hover:bg-cyan/5 transition-all group"
                                >
                                    <div className="p-2 rounded-lg bg-white/5 text-text-4 group-hover:text-cyan transition-colors">
                                        {node.icon}
                                    </div>
                                    <span className="font-head font-bold text-[10px] uppercase tracking-widest text-text-1">{node.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <Card variant="glass-light" className="p-8 border-cyan/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan to-transparent opacity-40" />
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`size-2 rounded-full 
                          ${status === 'transmitting' ? 'bg-yellow-400 animate-pulse' : 
                            status === 'error' ? 'bg-red animate-ping' : 
                            status === 'success' ? 'bg-cyan' : 'bg-cyan animate-pulse'} shadow-[0_0_8px_currentColor]`} 
                        />
                        <span className={`font-mono text-[10px] uppercase tracking-[0.3em] ${status === 'error' ? 'text-red' : 'text-cyan'}`}>
                          {status === 'transmitting' ? 'Transmitting...' : 
                           status === 'error' ? 'Transmission Failed' :
                           status === 'success' ? 'Signal Received' : 'Ready for Input'}
                        </span>
                    </div>
                    <p className="text-sm text-text-3 font-body leading-relaxed">
                        {errorMessage ? (
                          <span className="text-red/80 italic">Error: {errorMessage}</span>
                        ) : (
                          <>Establishing a secure communication link. Expected response latency: <span className="text-text-1">Fast</span>.</>
                        )}
                    </p>
                </Card>
            </div>


            <div className="lg:col-span-7">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Card variant="glass" className="p-12 relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-full h-[2px] transition-all duration-500 ${status === 'success' ? 'bg-cyan' : status === 'error' ? 'bg-red' : 'bg-gradient-to-r from-red to-transparent'} opacity-30`} />
                        
                        <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-mono text-text-4 uppercase tracking-[0.4em] ml-1">Name</label>
                                    <Input 
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="Full Name" 
                                        disabled={status === 'transmitting'}
                                        className="h-14 bg-bg-base/40 border-white/5 rounded-xl focus:border-cyan transition-all font-body text-base" 
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-mono text-text-4 uppercase tracking-[0.4em] ml-1">Email</label>
                                    <Input 
                                        required
                                        type="email" 
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        placeholder="email@address.com" 
                                        disabled={status === 'transmitting'}
                                        className="h-14 bg-bg-base/40 border-white/5 rounded-xl focus:border-cyan transition-all font-body text-base" 
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <label className="text-[10px] font-mono text-text-4 uppercase tracking-[0.4em] ml-1">Message</label>
                                <Textarea 
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                    placeholder="Enter your transmission..." 
                                    disabled={status === 'transmitting'}
                                    className="min-h-[200px] bg-bg-base/40 border-white/5 rounded-xl focus:border-cyan transition-all font-body text-base py-6 resize-none" 
                                />
                            </div>

                            <Button 
                              type="submit"
                              disabled={status === 'transmitting'}
                              variant="technical" 
                              state={status === 'transmitting' ? 'ai-generating' : 'default'}
                              className={cn(
                                "w-full h-16 text-xs font-black tracking-[0.3em] uppercase transition-all",
                                status === 'transmitting' ? 'shadow-[0_0_40px_rgba(0,240,255,0.4)] opacity-80 cursor-wait' : 'shadow-[0_0_30px_rgba(0,240,255,0.2)] hover:scale-[1.02] active:scale-95',
                                status === 'success' && 'bg-cyan text-bg-base',
                                status === 'error' && 'bg-red text-white shadow-[0_0_30px_rgba(255,82,92,0.3)]'
                              )}
                            >
                                {status === 'transmitting' ? (
                                  <span className="flex items-center gap-3">
                                    <motion.span
                                      animate={{ rotate: 360 }}
                                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                      className="flex items-center"
                                    >
                                      <Radio size={16} />
                                    </motion.span>
                                    {buttonText}
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-3">
                                    <Radio size={16} /> {buttonText}
                                  </span>
                                )}
                            </Button>
                        </form>
                    </Card>
                </motion.div>
            </div>
        </div>
      </section>
    </PageWrapper>
  );
}

