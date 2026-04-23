import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "group/card flex flex-col overflow-hidden rounded-[var(--radius-lg)] border transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-border-1 bg-bg-muted text-card-foreground shadow-card hover:border-border-c hover:shadow-[var(--glow-c-m)] mesh-card",
        glass: "glass text-card-foreground shadow-card hover:border-cyan/30 hover:shadow-[var(--glow-c-s)]",
        "glass-light": "glass-light text-card-foreground shadow-elevated hover:border-white/20 hover:bg-white/5",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "none",
    }
  }
)

interface CardProps 
  extends React.ComponentProps<"div">, 
    VariantProps<typeof cardVariants> {}

function Card({
  className,
  variant,
  padding,
  ...props
}: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, padding, className }))}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-display text-xl font-bold leading-none tracking-tight text-text-0", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("font-body text-sm text-text-2", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-6 pt-0 font-body text-text-1", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
}
