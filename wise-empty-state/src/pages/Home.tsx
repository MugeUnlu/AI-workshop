import * as React from "react";
import { ActionBar } from "@/components/dashboard/ActionBar";
import { AccountCard } from "@/components/dashboard/AccountCard";
import { SendMoneyDrawer } from "@/components/send/SendMoneyDrawer";
import { ACCOUNTS } from "@/data/accounts";

export function Home() {
  const [sendOpen, setSendOpen] = React.useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-16">
      <section className="flex flex-col p-12">
        <p className="text-base text-muted-foreground">Total balance</p>
        <h1 className="mt-1 text-display font-semibold">1.00 EUR</h1>

        <ActionBar className="mt-10" onActionClick={(action) => action === "Send" && setSendOpen(true)} />

        <div className="mt-9 flex gap-3.5">
          {ACCOUNTS.map((account) => (
            <AccountCard key={account.currency} {...account} />
          ))}
        </div>
      </section>

      <SendMoneyDrawer open={sendOpen} onOpenChange={setSendOpen} />
    </main>
  );
}
