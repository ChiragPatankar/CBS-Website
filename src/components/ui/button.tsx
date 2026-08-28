import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
    // Explicit property list + tactile press, both defined in globals.css.
    // Scale reads as depression without displacing neighbours, and the shorter
    // active duration makes the press land instantly while the release eases.
    "ui-transition ui-press",
    "focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    // Arrow icons lean into the direction of travel on hover.
    "[&_svg]:transition-transform [&_svg]:duration-200",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-white shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset] hover:brightness-110 hover:-translate-y-px hover:glow-brand hover:[&_svg]:translate-x-0.5",
        secondary:
          "border border-border-strong bg-surface-2/60 text-fg hover:bg-surface-3 hover:border-brand/50 hover:[&_svg]:translate-x-0.5",
        ghost: "text-muted hover:text-fg hover:bg-surface-2",
        link: "text-brand underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3.5",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-[0.95rem]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
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
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
