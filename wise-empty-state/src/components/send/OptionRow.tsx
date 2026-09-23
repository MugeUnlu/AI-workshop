import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const optionRowVariants = cva(
  "flex w-full items-center gap-4 rounded-card p-3 text-left transition-colors duration-step ease-drawer " +
    "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
  {
    variants: { selected: { true: "bg-muted", false: "" } },
    defaultVariants: { selected: false },
  }
);

export interface OptionRowProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title">,
    VariantProps<typeof optionRowVariants> {
  leading: React.ReactNode;
  title: string;
  description?: string;
}

const OptionRow = React.forwardRef<HTMLButtonElement, OptionRowProps>(
  ({ className, selected, leading, title, description, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      aria-pressed={selected ?? false}
      className={cn(optionRowVariants({ selected }), className)}
      {...props}
    >
      {leading}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-semibold text-foreground">{title}</span>
        {description && <span className="text-sm text-muted-foreground">{description}</span>}
      </span>
      <ChevronRight className="size-5 text-muted-foreground" aria-hidden="true" />
    </button>
  )
);
OptionRow.displayName = "OptionRow";

export { OptionRow, optionRowVariants };
