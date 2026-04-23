import { projects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Calendar, Code2, Tag } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.link.split('/').pop(),
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(p => p.link.endsWith(slug));

  if (!project) notFound();

  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen">
        <Link href="/projects" className="inline-flex items-center gap-2 text-text-4 hover:text-cyan transition-colors font-mono text-[10px] uppercase tracking-widest mb-12 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Registry
        </Link>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8">
                <div className="space-y-6 mb-12">
                    <div className="flex items-center gap-4">
                        <span className="font-mono text-[10px] text-cyan uppercase tracking-[0.4em]">{project.id.toUpperCase()}</span>
                        <div className="h-px flex-1 bg-border-1" />
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-display font-bold text-text-0 tracking-tight">{project.title}</h1>
                    <p className="text-xl lg:text-2xl text-text-1 font-body">{project.subtitle}</p>
                </div>

                {/* Project Hero Image */}
                <div className="aspect-video rounded-[var(--radius-2xl)] bg-bg-muted border border-border-1 overflow-hidden mb-16 relative group shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-red/5 z-10" />
                    <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20 transition-all duration-1000 z-0">
                        <Code2 size={120} />
                    </div>
                </div>

                <div className="prose prose-invert prose-lg max-w-none font-body text-text-2 leading-relaxed space-y-8">
                    <p>{project.description}</p>
                    
                    {project.gallery && project.gallery.length > 0 && (
                        <div className="mt-20 space-y-12">
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-2xl font-display font-bold text-text-0 uppercase tracking-tight">Visual Tour // Protocol</h2>
                                <div className="h-px flex-1 bg-border-1" />
                            </div>
                            <div className="grid grid-cols-1 gap-8">
                                {project.gallery.map((img: string, idx: number) => (
                                    <div key={idx} className="group relative rounded-2xl overflow-hidden border border-white/5 bg-bg-muted aspect-video shadow-xl">
                                        <div className="absolute inset-0 bg-gradient-to-t from-bg-base/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                                        <img 
                                            src={img} 
                                            alt={`${project.title} visual ${idx + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute bottom-6 left-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                            <span className="font-mono text-[10px] text-cyan uppercase tracking-widest bg-bg-base/80 backdrop-blur-md px-3 py-1 rounded border border-cyan/20">
                                                Record_{idx + 1}.png
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div className="mt-16 p-8 rounded-2xl border border-dashed border-border-1 bg-white/[0.02]">
                        <p className="text-sm italic opacity-60">
                            Detailed technical analysis and system architecture breakdown for {project.title} is currently being compiled into the neural archive.
                        </p>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4 sticky top-32">
                <Card variant="glass" className="p-8 space-y-10">
                    <div className="space-y-4">
                        <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-4">Technical Stack</h3>
                        <div className="flex gap-2 flex-wrap">
                            {project.tech.map(t => (
                                <Badge key={t} variant="secondary" className="bg-white/5 border-white/10">{t}</Badge>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-4">Project Metadata</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-text-3 flex items-center gap-2"><Calendar size={14} /> Deployment</span>
                                <span className="font-mono text-[10px] text-text-1">{project.date}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-text-3 flex items-center gap-2"><Tag size={14} /> Category</span>
                                <span className="font-mono text-[10px] text-text-1">SYSTEM_ARCH</span>
                            </div>
                            {project.github && (
                                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                    <span className="text-xs text-text-3 flex items-center gap-2"><Code2 size={14} /> Repository</span>
                                    <a 
                                        href={project.github} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="font-mono text-[10px] text-cyan hover:underline"
                                    >
                                        GITHUB // SOURCE
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    <a 
                        href={project.github || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={cn(
                            buttonVariants({ variant: "primary" }),
                            "w-full h-12 gap-3 text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                        )}
                    >
                        {project.github ? 'Access Repository' : 'Initialize Live View'} <ExternalLink size={14} />
                    </a>
                </Card>
            </div>
        </div>
      </section>
    </PageWrapper>
  );
}
