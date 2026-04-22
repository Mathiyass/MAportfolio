import { Inter, Geist_Mono, Syne, Outfit } from 'next/font/google';

// Fallback for Satoshi using Inter
export const satoshi = Inter({
  subsets: ['latin'],
  variable: '--font-satoshi',
  display: 'swap',
});

// Geist Mono is available in Google Fonts as Geist_Mono
export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

// Syne is available in Google Fonts
export const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

// Fallback for ClashDisplay using Outfit
export const clashDisplay = Outfit({
  subsets: ['latin'],
  variable: '--font-clash-display',
  display: 'swap',
});

export const fontVars = `${satoshi.variable} ${geistMono.variable} ${syne.variable} ${clashDisplay.variable}`;

