import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center font-head font-semibold transition-all duration-150 ease-[var(--ease-expo)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-cyan text-bg-base rounded-[var(--radius-md)] hover:bg-cyan-light hover:-translate-y-px hover:shadow-[var(--glow-c-s)]",
        secondary: "bg-transparent border border-border-2 text-text-0 rounded-[var(--radius-md)] hover:border-cyan hover:text-cyan hover:bg-cyan-ghost",
        dual: "bg-gradient-to-br from-cyan to-red text-bg-base rounded-[var(--radius-md)] hover:opacity-90 hover:shadow-[var(--glow-dual)]",
        red: "bg-transparent border border-border-r text-red rounded-[var(--radius-md)] hover:bg-red-ghost",
        ghost: "hover:bg-bg-elevated hover:text-text-0",
        icon: "w-10 h-10 rounded-[var(--radius-sm)] border border-border-1",
      },
      size: {
        sm: "h-8 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  }
)

function Button({
  className,
  variant = "secondary",
  size = "md",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
