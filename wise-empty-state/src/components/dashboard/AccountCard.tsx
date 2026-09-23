import * as React from "react";
import { Landmark } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccountCardProps extends React.HTMLAttributes<HTMLDivElement> {
  currency: string;
  flagSrc: string;
  accountNumber: string;
  balance: string;
}

const AccountCard = React.forwardRef<HTMLDivElement, AccountCardProps>(
  ({ className, currency, flagSrc, accountNumber, balance, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-card w-card flex-col justify-between rounded-card bg-card p-4 text-card-foreground shadow-card",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <img src={flagSrc} alt="" aria-hidden="true" className="size-12 rounded-full object-cover" />
        <span className="text-lg font-semibold text-muted-foreground">{currency}</span>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Landmark className="size-3.5" aria-hidden="true" />
          <span>{accountNumber}</span>
        </div>
        <span className="text-2xl font-semibold">{balance}</span>
      </div>
    </div>
  )
);
AccountCard.displayName = "AccountCard";

export { AccountCard };
