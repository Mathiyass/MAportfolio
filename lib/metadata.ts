import { Metadata, Viewport } from 'next';

export function createMetadata({
  title, description, path, image
}: { title?: string, description?: string, path: string, image?: string }): Metadata {
  const fullTitle = title ? `${title} — MATHIYA` : 'MATHIYA — Mathisha Angirasa';
  return {
    metadataBase: new URL('https://mathiya.vercel.app'),
    title: fullTitle,
    description: description ?? 'Software engineering student building Android, WebGL, and developer tools.',
    openGraph: {
      title: fullTitle,
      description,
      url: `https://mathiya.vercel.app${path}`,
      siteName: 'MATHIYA',
      images: [{ url: image ?? '/api/og', width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
    robots: { index: true, follow: true },
    manifest: '/manifest.json',
  };
}

export const sharedViewport: Viewport = {
  themeColor: '#22D3EE',
  width: 'device-width',
  initialScale: 1,
};
