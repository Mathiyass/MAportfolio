import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const skeletonVariants = cva(
  "relative overflow-hidden rounded-md bg-bg-muted",
  {
    variants: {
      variant: {
        pulse: "animate-pulse",
        shimmer: "",
      },
      direction: {
        right: "after:animate-shimmer-right",
        left: "after:animate-shimmer-left",
        up: "after:animate-shimmer-up",
        down: "after:animate-shimmer-down",
      }
    },
    compoundVariants: [
      {
        variant: "shimmer",
        className: "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-cyan/10 after:to-transparent after:content-['']",
      }
    ],
    defaultVariants: {
      variant: "pulse",
      direction: "right",
    }
  }
)

interface SkeletonProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, variant, direction, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(skeletonVariants({ variant, direction, className }))}
      {...props}
    />
  )
}

export { Skeleton }
