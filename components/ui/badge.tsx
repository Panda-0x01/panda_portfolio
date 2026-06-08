import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "label text-foreground border border-foreground px-2.5 py-0.5",
        secondary: "label text-muted-foreground",
        outline: "label text-muted-foreground border border-border px-2.5 py-0.5",
        muted: "label text-muted-foreground",
        success: "label text-foreground",
        warning: "label text-muted-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

