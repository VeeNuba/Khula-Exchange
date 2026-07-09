export type AuthScreen =
  | "splash"
  | "landing"
  | "signin"
  | "register"
  | "dashboard"
  | "addcard"
  | "transfer"
  | "mycards"
  | "redeem"
  | "transactions"
  | "analytics"
  | "qrpay"
  | "funding";

// The three live money accounts the mock app tracks. Balances, transfers,
// redemptions and the transaction ledger are all keyed off this union so
// every screen stays in sync with the same source of truth.
export type AccountKey = "fnb" | "absa" | "capitec";

export type Balances = Record<AccountKey, number>;

// What the Analytics screen is currently filtered to: a single account,
// or the combined view across all of them.
export type AnalyticsAccountFilter = AccountKey | "all";

export type CardType = "Debit Card" | "Credit Card";

// A payment card the user has linked in the Add Card flow. Kept separate
// from the money accounts (fnb/absa/capitec) — this is a card in the
// wallet, not a new account with its own balance.
export type WalletCard = {
  id: string;
  holderName: string;
  last4: string;
  expiryDate: string;
  cardType: CardType;
};

export type Transaction = {
  id: string;
  account: AccountKey;
  direction: "inbound" | "outbound";
  title: string;
  subtitle: string;
  timestamp: string;
  amount: number;
  // "seed" = the starting dummy data the app ships with.
  // "session" = created live by the user (transfers, redemptions, ...).
  origin: "seed" | "session";
};

// This file only exports types, but expo-router scans every file under
// app/ and expects a default export. This dummy default keeps it quiet
// without affecting the named type imports used everywhere else.
export default {};
