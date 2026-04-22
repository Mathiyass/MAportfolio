import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';

export default function BlogPage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-32 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-display font-bold capitalize">blog</h1>
          <p className="font-mono text-text-2 uppercase tracking-widest">[MODULE IN DEVELOPMENT]</p>
        </div>
      </div>
    </PageWrapper>
  );
}
