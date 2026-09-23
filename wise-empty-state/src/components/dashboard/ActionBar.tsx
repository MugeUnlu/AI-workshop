import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DEFAULT_ACTIONS = [
  "Send",
  "Add money",
  "Create payment link",
  "Create invoice",
  "Set up batch payment",
  "Pay invoice",
] as const;

export interface ActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  actions?: readonly string[];
  onActionClick?: (action: string) => void;
}

const ActionBar = React.forwardRef<HTMLDivElement, ActionBarProps>(
  ({ className, actions = DEFAULT_ACTIONS, onActionClick, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-wrap items-center gap-2.5", className)} {...props}>
      {actions.map((label) => (
        <Button key={label} variant="pill" size="pill" onClick={() => onActionClick?.(label)}>
          {label}
        </Button>
      ))}
    </div>
  )
);
ActionBar.displayName = "ActionBar";

export { ActionBar };
