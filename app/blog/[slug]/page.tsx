import { notFound } from 'next/navigation';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, Share2, BookOpen } from 'lucide-react';
import Link from 'next/link';

const posts = [
  {
    title: "Raw WebGL2 vs. Three.js: The Performance Frontier",
    excerpt: "Exploring the overhead of abstractions in modern browser-based graphics pipelines.",
    date: "2025-04-12",
    readTime: "8 min",
    category: "Graphics",
    id: "POST_01"
  },
  {
    title: "Architecting the Marketplace: A Multi-Agent Approach",
    excerpt: "How we built a highly concurrent digital asset store using Next.js 15 and Jules.",
    date: "2025-03-28",
    readTime: "12 min",
    category: "Architecture",
    id: "POST_02"
  },
  {
    title: "Kotlin Clean MVVM in Production",
    excerpt: "Lessons learned from deploying large-scale native Android systems in 2024.",
    date: "2025-02-15",
    readTime: "10 min",
    category: "Mobile",
    id: "POST_03"
  }
];

export async function generateStaticParams() {
  return posts.map((p) => ({
    slug: p.id.toLowerCase(),
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find(p => p.id.toLowerCase() === slug);

  if (!post) notFound();

  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen">
        <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-text-4 hover:text-cyan transition-colors font-mono text-[10px] uppercase tracking-widest mb-12 group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Back to Archive
            </Link>

            <div className="space-y-8 mb-16">
                <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-red border-red/20">{post.category}</Badge>
                    <span className="font-mono text-[10px] text-text-4 uppercase tracking-[0.4em]">{post.id}</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-display font-bold text-text-0 tracking-tight leading-tight">{post.title}</h1>
                
                <div className="flex flex-wrap items-center gap-8 pt-4 border-t border-border-1">
                    <div className="flex items-center gap-2 text-text-3 font-mono text-[10px] uppercase">
                        <Calendar size={14} className="text-cyan" />
                        {post.date}
                    </div>
                    <div className="flex items-center gap-2 text-text-3 font-mono text-[10px] uppercase">
                        <Clock size={14} className="text-cyan" />
                        {post.readTime}
                    </div>
                    <div className="ml-auto flex items-center gap-4">
                        <button className="text-text-4 hover:text-cyan transition-colors">
                            <Share2 size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <Card variant="glass-light" className="p-10 mb-16 border-white/5">
                <div className="flex items-start gap-6">
                    <div className="p-3 rounded-xl bg-cyan/10 text-cyan shrink-0">
                        <BookOpen size={24} />
                    </div>
                    <p className="text-xl text-text-1 font-body italic leading-relaxed">
                        {post.excerpt}
                    </p>
                </div>
            </Card>

            <article className="prose prose-invert prose-lg max-w-none font-body text-text-2 leading-relaxed space-y-8">
                <p>The full technical analysis for {post.title} is currently being processed and decrypted from the project archives.</p>
                <p>Expect a deep dive into implementation details, performance benchmarks, and architectural decisions that shaped this system.</p>
                
                <div className="p-8 rounded-xl bg-bg-muted border border-border-1 font-mono text-xs text-text-4 text-center uppercase tracking-widest mt-24">
                    [END OF TRANSMISSION — MORE DATA PENDING]
                </div>
            </article>
        </div>
      </section>
    </PageWrapper>
  );
}
