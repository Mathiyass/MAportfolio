import { Metadata, Viewport } from 'next';

export function createMetadata({
  title, description, path, image
}: { title?: string, description?: string, path: string, image?: string }): Metadata {
  const fullTitle = title ? `${title} — MATHIYA` : 'MATHIYA — Mathisha Angirasa';
  const siteUrl = 'https://mathiya.github.io/MAportfolio';
  
  return {
    metadataBase: new URL(siteUrl),
    title: fullTitle,
    description: description ?? 'Software engineering student building Android, WebGL, and developer tools.',
    openGraph: {
      title: fullTitle,
      description,
      url: `${siteUrl}${path}`,
      siteName: 'MATHIYA',
      images: [{ url: image ?? '/MAportfolio/api/og', width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
    robots: { index: true, follow: true },
    manifest: '/MAportfolio/manifest.json',
  };
}

export const sharedViewport: Viewport = {
  themeColor: '#22D3EE',
  width: 'device-width',
  initialScale: 1,
};
