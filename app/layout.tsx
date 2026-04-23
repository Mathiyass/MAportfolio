import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import { fontVars } from '@/lib/fonts';
import { Providers } from './providers';
import { createMetadata, sharedViewport } from '@/lib/metadata';
import { cn } from '@/lib/utils';

// Core layout components
import { SmoothScroll } from '@/components/layout/smooth-scroll';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/Footer';

// Core UI components
import { PageLoader } from '@/components/ui/page-loader';
import { MagneticCursor } from '@/components/ui/magnetic-cursor';
import { ProgressBar } from '@/components/common/ProgressBar';
import { AudioToggle } from '@/components/common/AudioToggle';
import { ByteContainer } from '@/components/byte/byte-container';
import { TechnicalTicker } from '@/components/common/TechnicalTicker';
import { WebGLBackground } from '@/components/canvas/webgl-background';

// Easter eggs
import { EasterEggProvider } from '@/components/easter-eggs/EasterEggProvider';
import { EasterEggToast } from '@/components/easter-eggs/EasterEggToast';

// Client State Wrapper
import { RootLayoutClient } from './layout-client';

export const metadata: Metadata = createMetadata({
  path: '/',
});

export const viewport = sharedViewport;

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", fontVars)}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Mathisha Angirasa",
          "url": "https://mathiya.vercel.app",
          "jobTitle": "Founder & CEO at SIVION",
          "sameAs": ["https://github.com/Mathiyass"]
        }) }} />
      </head>
      <RootLayoutClient>
        <Providers>
          <PageLoader />
          <MagneticCursor />
          <ProgressBar />
          <Navbar />
          <AudioToggle />
          <Suspense fallback={null}>
            <TechnicalTicker />
          </Suspense>
          
          <SmoothScroll>
            <Suspense fallback={null}>
              <WebGLBackground type="quantum" />
            </Suspense>
            
            <div className="flex min-h-screen flex-col">
              <main id="main" className="flex-1 relative z-base">
                {children}
              </main>
              <Footer />
            </div>
            
            <EasterEggProvider>
              <EasterEggToast />
            </EasterEggProvider>
          </SmoothScroll>

          <Suspense fallback={null}>
            <ByteContainer />
          </Suspense>
        </Providers>
      </RootLayoutClient>
    </html>
  );
}
