import { Space_Grotesk, Geist_Mono, Epilogue, Bebas_Neue } from 'next/font/google';

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const epilogueDisplay = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue-display',
  display: 'swap',
  weight: ['700', '900'],
});

export const epilogueHead = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue-head',
  display: 'swap',
  weight: ['700', '800'],
});

export const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
  weight: ['400'],
});

export const fontVars = `${spaceGrotesk.variable} ${geistMono.variable} ${epilogueDisplay.variable} ${epilogueHead.variable} ${bebasNeue.variable}`;
