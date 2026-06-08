import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background hover:opacity-80 active:opacity-60 text-xs tracking-widest uppercase font-medium",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-80",
        outline:
          "border border-foreground text-foreground hover:bg-foreground hover:text-background text-xs tracking-widest uppercase font-medium",
        secondary:
          "bg-muted text-foreground hover:bg-accent text-xs tracking-widest uppercase font-medium",
        ghost:
          "text-muted-foreground hover:text-foreground text-xs tracking-widest uppercase font-medium",
        link:
          "text-foreground underline underline-offset-4 hover:opacity-70 text-sm",
      },
      size: {
        default: "h-10 px-8 py-2",
        sm: "h-8 px-5 py-1.5",
        lg: "h-12 px-10 py-3",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

