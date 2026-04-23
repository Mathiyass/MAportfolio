'use client';

import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/themeStore';

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const { isRetroMode } = useThemeStore();

  return (
    <body 
      className={cn(
        "bg-bg-base text-text-0 antialiased selection:bg-cyan-500/30 selection:text-white pb-8 md:pb-0",
        isRetroMode && "retro-mode"
      )} 
      suppressHydrationWarning
    >
      {children}
    </body>
  );
}
