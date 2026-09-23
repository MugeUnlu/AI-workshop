import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Mirrors the Figma `avatar` component set: size xs–xl × style neutral / brand / image
const avatarVariants = cva(
  "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold",
  {
    variants: {
      size: {
        xs: "size-6 text-xs",
        sm: "size-10 text-sm",
        md: "size-12 text-base",
        lg: "size-18 text-xl",
        xl: "size-22 text-2xl",
      },
      variant: {
        neutral: "bg-muted text-foreground",
        brand: "bg-primary text-primary-foreground",
        image: "bg-muted",
      },
    },
    defaultVariants: { size: "md", variant: "neutral" },
  }
);

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof avatarVariants> {
  src?: string;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, variant, src, children, ...props }, ref) => (
    <span ref={ref} className={cn(avatarVariants({ size, variant }), className)} {...props}>
      {src ? <img src={src} alt="" aria-hidden="true" className="size-full object-cover" /> : children}
    </span>
  )
);
Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
