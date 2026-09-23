import * as React from "react";
import { Briefcase, ChevronLeft, User, X } from "lucide-react";
import { cva } from "class-variance-authority";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { OptionRow } from "@/components/send/OptionRow";
import { ACCOUNTS, CONTACTS, type Account, type Contact } from "@/data/accounts";
import { cn } from "@/lib/utils";

const STEP_TITLES = [
  "Who are you sending to?",
  "Which currency?",
  "Personal or business?",
  "How much?",
] as const;

type Step = 0 | 1 | 2 | 3;
type Direction = "forward" | "back";
type AccountType = "personal" | "business";

const ACCOUNT_TYPES = [
  { id: "personal", title: "Personal", description: "Sending to a friend or family member", Icon: User },
  { id: "business", title: "Business", description: "Paying a company or freelancer", Icon: Briefcase },
] as const;

// Steps slide in from the side they are coming from, so the flow reads spatially
const stepVariants = cva(
  "flex flex-col gap-2 animate-in fade-in-0 duration-step ease-drawer motion-reduce:animate-none",
  {
    variants: {
      direction: { forward: "slide-in-from-right-4", back: "slide-in-from-left-4" },
    },
    defaultVariants: { direction: "forward" },
  }
);

const progressVariants = cva("h-1 flex-1 rounded-full transition-colors duration-step ease-drawer motion-reduce:transition-none", {
  variants: { active: { true: "bg-accent-foreground", false: "bg-muted" } },
  defaultVariants: { active: false },
});

export interface SendMoneyDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SendMoneyDrawer({ open, onOpenChange }: SendMoneyDrawerProps) {
  const [step, setStep] = React.useState<Step>(0);
  const [direction, setDirection] = React.useState<Direction>("forward");
  const [recipient, setRecipient] = React.useState<Contact>();
  const [account, setAccount] = React.useState<Account>();
  const [accountType, setAccountType] = React.useState<AccountType>();
  const [amount, setAmount] = React.useState("");
  const amountId = React.useId();

  // Reset on open (not close) so the exit transition keeps its content
  React.useEffect(() => {
    if (!open) return;
    setStep(0);
    setDirection("forward");
    setRecipient(undefined);
    setAccount(undefined);
    setAccountType(undefined);
    setAmount("");
  }, [open]);

  const goTo = (next: Step, dir: Direction) => {
    setDirection(dir);
    setStep(next);
  };

  const handleAmountChange = (value: string) => {
    if (/^\d*(\.\d{0,2})?$/.test(value)) setAmount(value);
  };

  const canSend = Number(amount) > 0;
  const accountTypeLabel = ACCOUNT_TYPES.find((t) => t.id === accountType)?.title;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="p-6">
        <div className="flex items-center justify-between">
          {step > 0 ? (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Back"
              onClick={() => goTo((step - 1) as Step, "back")}
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </Button>
          ) : (
            <span className="size-10" aria-hidden="true" />
          )}
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Close">
              <X className="size-5" aria-hidden="true" />
            </Button>
          </SheetClose>
        </div>

        <div className="mt-4 flex gap-1.5" aria-hidden="true">
          {STEP_TITLES.map((title, i) => (
            <span key={title} className={progressVariants({ active: i <= step })} />
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-1">
          <SheetTitle>{STEP_TITLES[step]}</SheetTitle>
          <SheetDescription>Step {step + 1} of {STEP_TITLES.length}</SheetDescription>
        </div>

        <div key={step} className={cn(stepVariants({ direction }), "mt-6 min-h-0 flex-1 overflow-y-auto")}>
          {step === 0 &&
            CONTACTS.map((contact) => (
              <OptionRow
                key={contact.id}
                selected={recipient?.id === contact.id}
                leading={<Avatar>{contact.initials}</Avatar>}
                title={contact.name}
                description={contact.detail}
                onClick={() => {
                  setRecipient(contact);
                  goTo(1, "forward");
                }}
              />
            ))}

          {step === 1 &&
            ACCOUNTS.map((acc) => (
              <OptionRow
                key={acc.currency}
                selected={account?.currency === acc.currency}
                leading={<Avatar variant="image" src={acc.flagSrc} />}
                title={acc.currency}
                description={`Balance ${acc.balance} ${acc.currency}`}
                onClick={() => {
                  setAccount(acc);
                  goTo(2, "forward");
                }}
              />
            ))}

          {step === 2 &&
            ACCOUNT_TYPES.map(({ id, title, description, Icon }) => (
              <OptionRow
                key={id}
                selected={accountType === id}
                leading={
                  <Avatar>
                    <Icon className="size-5" aria-hidden="true" />
                  </Avatar>
                }
                title={title}
                description={description}
                onClick={() => {
                  setAccountType(id);
                  goTo(3, "forward");
                }}
              />
            ))}

          {step === 3 && recipient && account && (
            <div className="flex flex-1 flex-col gap-6">
              <div className="flex items-center gap-4 rounded-card bg-muted p-4">
                <Avatar variant="brand">{recipient.initials}</Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">{recipient.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {accountTypeLabel} · {account.currency}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor={amountId} className="text-sm text-muted-foreground">
                  You send
                </label>
                <div className="flex items-center gap-3 rounded-card border border-border p-4 focus-within:ring-2 focus-within:ring-ring">
                  <input
                    id={amountId}
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-display font-semibold text-foreground outline-none placeholder:text-muted-foreground/50"
                  />
                  <span className="flex items-center gap-2 font-semibold text-foreground">
                    <Avatar size="xs" variant="image" src={account.flagSrc} />
                    {account.currency}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Balance: {account.balance} {account.currency}
                </p>
              </div>

              <Button
                variant="cta"
                size="lg"
                className="mt-auto w-full"
                disabled={!canSend}
                onClick={() => onOpenChange(false)}
              >
                Send {canSend ? `${amount} ${account.currency}` : "money"}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
