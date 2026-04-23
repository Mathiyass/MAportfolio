import { Metadata, Viewport } from 'next';

export function createMetadata({
  title, description, path, image, type = 'website'
}: { title?: string, description?: string, path: string, image?: string, type?: 'website' | 'article' }): Metadata {
  const fullTitle = title ? `${title} — MATHIYA` : 'MATHIYA — Mathisha Angirasa';
  const siteUrl = 'https://mathiya.github.io/MAportfolio';
  
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: fullTitle,
      template: `%s — MATHIYA`
    },
    description: description ?? 'MATHIYA (Nexus Prime) — Next.js 15 Engineering Showcase building Android, WebGL, and developer tools.',
    openGraph: {
      title: fullTitle,
      description: description ?? 'Engineering Showcase by Mathisha Angirasa.',
      url: `${siteUrl}${path}`,
      siteName: 'MATHIYA',
      images: [{ url: image ?? '/MAportfolio/api/og', width: 1200, height: 630, alt: 'MATHIYA NEXUS' }],
      type: type,
    },
    twitter: { 
      card: 'summary_large_image', 
      title: fullTitle, 
      description: description ?? 'Engineering Showcase by Mathisha Angirasa.',
      creator: '@Mathiyass' 
    },
    robots: { 
      index: true, 
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      }
    },
    manifest: '/MAportfolio/manifest.json',
  };
}

export const sharedViewport: Viewport = {
  themeColor: '#0F131C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};
