import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center font-head font-semibold transition-all duration-150 ease-[var(--ease-expo)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        technical: "bg-transparent border border-cyan/20 text-cyan rounded-none relative overflow-hidden glass hover:bg-cyan/5 hover:border-cyan/60 group/tech",
        primary: "bg-cyan text-bg-base rounded-[var(--radius-md)] hover:bg-cyan-light hover:-translate-y-px hover:shadow-[var(--glow-c-s)]",
        secondary: "bg-transparent border border-border-2 text-text-0 rounded-[var(--radius-md)] hover:border-cyan hover:text-cyan hover:bg-cyan-ghost",
        dual: "bg-gradient-to-br from-cyan to-red text-bg-base rounded-[var(--radius-md)] hover:opacity-90 hover:shadow-[var(--glow-dual)]",
        red: "bg-transparent border border-border-r text-red rounded-[var(--radius-md)] hover:bg-red-ghost",
        ghost: "hover:bg-bg-elevated hover:text-text-0",
        icon: "w-10 h-10 rounded-[var(--radius-sm)] border border-border-1",
      },
      size: {
        sm: "h-8 px-4 text-[10px] tracking-widest",
        md: "h-11 px-6 text-xs tracking-[0.15em]",
        lg: "h-13 px-8 text-xs tracking-[0.2em]",
        icon: "size-10",
        "icon-sm": "size-8",
      },
      state: {
        default: "",
        "ai-generating": "animate-gradient bg-gradient-to-r from-cyan/40 via-red/40 to-cyan/40 bg-[length:200%_auto] pointer-events-none opacity-90 shadow-[0_0_30px_rgba(0,240,255,0.4)]",
      },
    },
    defaultVariants: {
      variant: "technical",
      size: "md",
      state: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  state,
  children,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  const isTechnical = variant === 'technical';

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, state, className }))}
      {...props}
    >
      {isTechnical && (
        <>
          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan/60 group-hover/tech:border-cyan transition-colors" />
          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-cyan/60 group-hover/tech:border-cyan transition-colors" />
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-cyan/60 group-hover/tech:border-cyan transition-colors" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan/60 group-hover/tech:border-cyan transition-colors" />
          
          {/* Scanline Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,240,255,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-scan opacity-0 group-hover/tech:opacity-100 pointer-events-none transition-opacity" />
        </>
      )}
      {children}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
