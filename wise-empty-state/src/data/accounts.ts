import euFlag from "flag-icons/flags/1x1/eu.svg";
import auFlag from "flag-icons/flags/1x1/au.svg";
import caFlag from "flag-icons/flags/1x1/ca.svg";

export interface Account {
  currency: string;
  flagSrc: string;
  accountNumber: string;
  balance: string;
}

export const ACCOUNTS: Account[] = [
  { currency: "EUR", flagSrc: euFlag, accountNumber: "·· 5 1568", balance: "1.00" },
  { currency: "AUD", flagSrc: auFlag, accountNumber: "·· 30779", balance: "0.00" },
  { currency: "CAD", flagSrc: caFlag, accountNumber: "·· 15376", balance: "0.00" },
];

export interface Contact {
  id: string;
  name: string;
  initials: string;
  detail: string;
}

export const CONTACTS: Contact[] = [
  { id: "amelia", name: "Amelia Clarke", initials: "AC", detail: "Account ending 4821" },
  { id: "jonas", name: "Jonas Weber", initials: "JW", detail: "Account ending 7304" },
  { id: "priya", name: "Priya Shah", initials: "PS", detail: "Account ending 1196" },
  { id: "lucas", name: "Lucas Martin", initials: "LM", detail: "Account ending 5587" },
  { id: "sofia", name: "Sofia Rossi", initials: "SR", detail: "Account ending 2043" },
];
