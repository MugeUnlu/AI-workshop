import euFlag from "flag-icons/flags/1x1/eu.svg";
import auFlag from "flag-icons/flags/1x1/au.svg";
import caFlag from "flag-icons/flags/1x1/ca.svg";
import { ActionBar } from "@/components/dashboard/ActionBar";
import { AccountCard } from "@/components/dashboard/AccountCard";

const ACCOUNTS = [
  { currency: "EUR", flagSrc: euFlag, accountNumber: "·· 5 1568", balance: "1.00" },
  { currency: "AUD", flagSrc: auFlag, accountNumber: "·· 30779", balance: "0.00" },
  { currency: "CAD", flagSrc: caFlag, accountNumber: "·· 15376", balance: "0.00" },
];

export function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-16">
      <section className="flex flex-col p-12">
        <p className="text-base text-muted-foreground">Total balance</p>
        <h1 className="mt-1 text-display font-semibold">1.00 EUR</h1>

        <ActionBar className="mt-10" />

        <div className="mt-9 flex gap-3.5">
          {ACCOUNTS.map((account) => (
            <AccountCard key={account.currency} {...account} />
          ))}
        </div>
      </section>
    </main>
  );
}
