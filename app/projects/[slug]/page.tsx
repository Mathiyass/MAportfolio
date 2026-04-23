import { projects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Calendar, Code2, Tag } from 'lucide-react';
import Link from 'next/link';

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

                <div className="aspect-video rounded-[var(--radius-2xl)] bg-bg-muted border border-border-1 overflow-hidden mb-16 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-red/5" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-105 group-hover:opacity-20 transition-all duration-1000">
                        <Code2 size={120} />
                    </div>
                </div>

                <div className="prose prose-invert prose-lg max-w-none font-body text-text-2 leading-relaxed space-y-8">
                    <p>{project.description}</p>
                    <p>Detailed technical analysis and system architecture breakdown for {project.title} will be synced here shortly.</p>
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
                        </div>
                    </div>

                    <Button variant="primary" className="w-full h-12 gap-3 text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                        Initialize Live View <ExternalLink size={14} />
                    </Button>
                </Card>
            </div>
        </div>
      </section>
    </PageWrapper>
  );
}
