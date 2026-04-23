import { Inter, Geist_Mono, Syne, Outfit, Bebas_Neue } from 'next/font/google';

// Use Inter as a high-quality replacement for Satoshi
export const satoshi = Inter({
  subsets: ['latin'],
  variable: '--font-satoshi',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['700', '800'],
});

// Use Outfit as a high-quality replacement for Clash Display
export const clashDisplay = Outfit({
  subsets: ['latin'],
  variable: '--font-clash-display',
  display: 'swap',
  weight: ['700', '900'],
});

export const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
  weight: ['400'],
});

export const fontVars = `${satoshi.variable} ${geistMono.variable} ${syne.variable} ${clashDisplay.variable} ${bebasNeue.variable}`;


