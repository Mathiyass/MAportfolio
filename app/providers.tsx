"use client"
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ErrorBoundary } from "@/components/common/ErrorBoundary"
import { useKonami } from "@/hooks/useKonami"

export function Providers({ children }: { children: React.ReactNode }) {
  useKonami();
  return (
    <ErrorBoundary>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </ErrorBoundary>
  )
}
