import type { Metadata } from 'next';
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
import { WebGLBackground } from '@/components/canvas/webgl-background';
import { ByteContainer } from '@/components/byte/byte-container';

// Easter eggs
import { EasterEggProvider } from '@/components/easter-eggs/EasterEggProvider';
import { EasterEggToast } from '@/components/easter-eggs/EasterEggToast';

export const metadata: Metadata = createMetadata({
  path: '/',
});

export const viewport = sharedViewport;

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", fontVars)}>
      <body className={`bg-bg-base text-text-0 antialiased selection:bg-cyan-500/30 selection:text-white`} suppressHydrationWarning>
        <Providers>
          <SmoothScroll>
            <PageLoader />
            <MagneticCursor />
            <WebGLBackground type="quantum" />
            
            <div className="relative z-10 flex min-h-screen flex-col">
              <Navbar />
              <main id="main" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            
            <ByteContainer />
            <EasterEggProvider>
              <EasterEggToast />
            </EasterEggProvider>
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
