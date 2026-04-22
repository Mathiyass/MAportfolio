import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-32 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-9xl font-display font-bold text-red/20 mb-4">404</h1>
          <h2 className="text-4xl font-display font-bold text-white">System Error</h2>
          <p className="text-xl text-text-2 max-w-md mx-auto">
            The requested module could not be found in the current sector.
          </p>
          <div className="pt-8">
            <Link 
              href="/"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 py-2 px-4 bg-red hover:bg-red/80 text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Return to Base
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
