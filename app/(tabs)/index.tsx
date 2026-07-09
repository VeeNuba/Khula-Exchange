import React, { useEffect, useRef, useState } from "react";
import { ResponsiveAppShell } from "@/components/responsive-app-shell";
import { AddCardScreen } from "./screens/AddCardScreen";
import { AnalyticsScreen } from "./screens/AnalyticsScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { FundingScreen } from "./screens/FundingScreen";
import { LandingScreen } from "./screens/LandingScreen";
import { MyCardsScreen } from "./screens/MyCardsScreen";
import { QRPayScreen } from "./screens/QRPayScreen";
import { RedeemScreen } from "./screens/RedeemScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { SignInScreen } from "./screens/SignInScreen";
import { SplashScreen } from "./screens/SplashScreen";
import { TransactionsScreen } from "./screens/TransactionsScreen";
import { TransferScreen } from "./screens/TransferScreen";
import {
  AccountKey,
  AnalyticsAccountFilter,
  AuthScreen,
  Balances,
  CardType,
  Transaction,
  WalletCard,
} from "./screens/types";

// Human-readable labels for each account, shared across every screen.
const ACCOUNT_LABELS: Record<AccountKey, string> = {
  fnb: "FNB Account",
  absa: "ABSA Account",
  capitec: "Capitec Account",
};

// Starting balances. These are the "dummy data" the app ships with —
// everything below (transfers, redemptions, the dashboard, the graphs)
// reacts live from this point forward.
const INITIAL_BALANCES: Balances = {
  fnb: 1900,
  absa: 10000,
  capitec: 3100,
};

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "seed-1",
    account: "fnb",
    direction: "inbound",
    title: "Inbound Customer Revenue",
    subtitle: "Andile M. (King William's Town)",
    timestamp: "08 July 2026 • 14:32",
    amount: 2450,
    origin: "seed",
  },
  {
    id: "seed-2",
    account: "fnb",
    direction: "outbound",
    title: "Supply Chain Operations",
    subtitle: "JJ Suppliers (East London)",
    timestamp: "07 July 2026 • 09:15",
    amount: 1200,
    origin: "seed",
  },
  {
    id: "seed-3",
    account: "fnb",
    direction: "inbound",
    title: "CashSend Voucher Redeem",
    subtitle: "ABSA Ref: #98214",
    timestamp: "05 July 2026 • 18:45",
    amount: 500,
    origin: "seed",
  },
  {
    id: "seed-4",
    account: "capitec",
    direction: "inbound",
    title: "Inbound Customer Revenue",
    subtitle: "Sipho T. (Mdantsane)",
    timestamp: "06 July 2026 • 11:20",
    amount: 1850,
    origin: "seed",
  },
  {
    id: "seed-5",
    account: "capitec",
    direction: "outbound",
    title: "Operational Logistics Exp",
    subtitle: "Fuel Depot Fleet (Amalinda)",
    timestamp: "04 July 2026 • 16:40",
    amount: 650,
    origin: "seed",
  },
];

// The weekly analytics view is simply "every transaction in the ledger" —
// the seed data is dated within the last few days, so it already reads as
// this week's activity, and it grows live as transfers/redemptions happen.
// The monthly view layers a fixed "earlier this month" figure per account
// on top of that, so monthly always covers more than weekly. Per-account
// numbers sum to the app's original aggregate monthly totals.
const MONTHLY_EXTRA: Record<AccountKey, { revenue: number; expenses: number }> = {
  fnb: { revenue: 1800, expenses: 800 },
  absa: { revenue: 9400, expenses: 4000 },
  capitec: { revenue: 2900, expenses: 1250 },
};

const BUDGET = 15000;

const ACCOUNT_ORDER: AccountKey[] = ["fnb", "absa", "capitec"];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>("splash");

  // Registration Form States
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);

  // Login State
  const [pin, setPin] = useState("");

  // Add Card Form States
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState<CardType>("Debit Card");
  const [cards, setCards] = useState<WalletCard[]>([]);
  const nextCardId = useRef(1);

  // Live Money State — every screen reads from this single source of truth
  const [balances, setBalances] = useState<Balances>(INITIAL_BALANCES);
  const [transactions, setTransactions] = useState<Transaction[]>(
    INITIAL_TRANSACTIONS,
  );
  const nextTxId = useRef(INITIAL_TRANSACTIONS.length + 1);

  // Transfer Form States
  const [transferFrom, setTransferFrom] = useState<AccountKey>("fnb");
  const [transferTo, setTransferTo] = useState<AccountKey>("absa");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferReference, setTransferReference] = useState("");

  // CashSend Redeem Form States
  const [selectedProvider, setSelectedProvider] = useState("absa");
  const [voucherPin, setVoucherPin] = useState("");
  const [voucherAccessCode, setVoucherAccessCode] = useState("");
  const [voucherAmount, setVoucherAmount] = useState("");
  const [selectedDestinationAccount, setSelectedDestinationAccount] =
    useState<AccountKey>("fnb");

  // Transactions Filter Tab Tracker State
  const [activeTxAccount, setActiveTxAccount] = useState<AccountKey>("fnb");

  // Analytics Filter Period & Account State Trackers
  const [analyticsPeriod, setAnalyticsPeriod] = useState<"weekly" | "monthly">(
    "weekly",
  );
  const [analyticsAccount, setAnalyticsAccount] =
    useState<AnalyticsAccountFilter>("all");

  // QR Pay ("Get Paid") State — lets an informal trader show a QR code to
  // collect a payment without needing a card machine.
  const [qrAccount, setQrAccount] = useState<AccountKey>("fnb");
  const [qrAmount, setQrAmount] = useState("");

  // Business Funding State — a mock, data-driven working-capital offer
  // sized off the trader's own transaction history (no paperwork/collateral,
  // matching how informal traders are usually excluded from bank credit).
  const [fundingAccount, setFundingAccount] = useState<AccountKey>("fnb");
  const [fundingPercent, setFundingPercent] = useState(100);

  // Splash Screen automatic transition
  useEffect(() => {
    if (currentScreen === "splash") {
      const timer = setTimeout(() => {
        setCurrentScreen("landing");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Cycles fnb -> absa -> capitec -> fnb, used by the tappable account
  // pickers on the Transfer screen.
  const cycleAccount = (current: AccountKey): AccountKey => {
    return ACCOUNT_ORDER[(ACCOUNT_ORDER.indexOf(current) + 1) % ACCOUNT_ORDER.length];
  };

  const logTransaction = (entry: Omit<Transaction, "id" | "origin">) => {
    const id = `tx-${nextTxId.current++}`;
    setTransactions((prev) => [{ ...entry, id, origin: "session" }, ...prev]);
  };

  const handleAddCard = () => {
    const trimmedName = cardHolderName.trim();
    const digitsOnly = cardNumber.replace(/\D/g, "");

    if (!/^[A-Za-z\s'-]{2,}$/.test(trimmedName)) {
      alert("Please enter the cardholder's name.");
      return;
    }
    if (digitsOnly.length < 13 || digitsOnly.length > 19) {
      alert("Please enter a valid card number (13–19 digits).");
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      alert("Please enter the expiry date as MM/YY.");
      return;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      alert("Please enter a valid 3 or 4 digit CVV.");
      return;
    }

    const newCard: WalletCard = {
      id: `card-${nextCardId.current++}`,
      holderName: trimmedName,
      last4: digitsOnly.slice(-4),
      expiryDate,
      cardType,
    };
    setCards((prev) => [...prev, newCard]);

    alert("Card Saved Successfully!");
    setCurrentScreen("mycards");
    setCardHolderName("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setCardType("Debit Card");
  };

  const handleTransfer = () => {
    const amount = parseFloat(transferAmount);

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount to transfer.");
      return;
    }
    if (transferFrom === transferTo) {
      alert("Please choose two different accounts.");
      return;
    }
    if (amount > balances[transferFrom]) {
      alert(`Insufficient funds in your ${ACCOUNT_LABELS[transferFrom]}.`);
      return;
    }

    setBalances((prev) => ({
      ...prev,
      [transferFrom]: prev[transferFrom] - amount,
      [transferTo]: prev[transferTo] + amount,
    }));

    const reference = transferReference || "Internal Transfer";

    logTransaction({
      account: transferFrom,
      direction: "outbound",
      title: `Transfer to ${ACCOUNT_LABELS[transferTo]}`,
      subtitle: reference,
      timestamp: "Just now",
      amount,
    });
    logTransaction({
      account: transferTo,
      direction: "inbound",
      title: `Transfer from ${ACCOUNT_LABELS[transferFrom]}`,
      subtitle: reference,
      timestamp: "Just now",
      amount,
    });

    alert(`Transfer of R${amount.toLocaleString()} successful!`);
    setCurrentScreen("dashboard");
    setTransferAmount("");
    setTransferReference("");
  };

  const handleRedeem = () => {
    const amount = parseFloat(voucherAmount);

    if (!voucherPin || !voucherAccessCode) {
      alert("Please enter voucher details and access PIN.");
      return;
    }
    if (!amount || amount <= 0) {
      alert("Please enter the voucher amount.");
      return;
    }

    setBalances((prev) => ({
      ...prev,
      [selectedDestinationAccount]: prev[selectedDestinationAccount] + amount,
    }));

    logTransaction({
      account: selectedDestinationAccount,
      direction: "inbound",
      title: "CashSend Voucher Redeem",
      subtitle: `${selectedProvider.toUpperCase()} Ref: #${
        voucherPin.slice(-4) || "0000"
      }`,
      timestamp: "Just now",
      amount,
    });

    alert(
      `Success! R${amount.toLocaleString()} deposited instantly into your verified ${
        ACCOUNT_LABELS[selectedDestinationAccount]
      }.`,
    );
    setCurrentScreen("dashboard");
    setVoucherPin("");
    setVoucherAccessCode("");
    setVoucherAmount("");
  };

  // Simulates a customer scanning the trader's QR code and paying. Stays on
  // the QR screen (rather than navigating away) so the balance/recent list
  // updates live in front of whoever is watching the demo.
  const handleSimulateQrPayment = () => {
    let amount: number;
    if (qrAmount.trim()) {
      amount = parseFloat(qrAmount);
      if (!amount || amount <= 0) {
        alert(
          "Please enter a valid amount, or leave it blank to accept any amount.",
        );
        return;
      }
    } else {
      amount = Math.floor(Math.random() * 450) + 50;
    }

    setBalances((prev) => ({ ...prev, [qrAccount]: prev[qrAccount] + amount }));
    logTransaction({
      account: qrAccount,
      direction: "inbound",
      title: "QR Payment Received",
      subtitle: "Customer Payment",
      timestamp: "Just now",
      amount,
    });
    alert(`Payment Received! R${amount.toLocaleString()} from customer.`);
    setQrAmount("");
  };

  const handleGetFunds = () => {
    if (fundingRequestAmount <= 0) {
      alert("Please select a funding amount.");
      return;
    }

    setBalances((prev) => ({
      ...prev,
      [fundingAccount]: prev[fundingAccount] + fundingRequestAmount,
    }));
    logTransaction({
      account: fundingAccount,
      direction: "inbound",
      title: "Business Funding Disbursed",
      subtitle: "Working Capital Advance",
      timestamp: "Just now",
      amount: fundingRequestAmount,
    });

    alert(
      `R${fundingRequestAmount.toLocaleString()} has been added to your ${
        ACCOUNT_LABELS[fundingAccount]
      }. No paperwork needed!`,
    );
    setCurrentScreen("dashboard");
  };

  // Derived, always-live money figures — nothing below this point is
  // hardcoded, it all reads off `balances` / `transactions`.
  const netWorth = balances.fnb + balances.absa + balances.capitec;
  const totalSpend = transactions
    .filter((t) => t.direction === "outbound")
    .reduce((sum, t) => sum + t.amount, 0);

  // QR Pay — most recent payments collected via the QR flow, newest first.
  const recentQrPayments = transactions.filter(
    (t) => t.title === "QR Payment Received",
  );

  // Business Funding — a mock "credit score" derived entirely from the
  // trader's own inbound transaction history, not a real bureau check.
  // This is the pitch: informal traders without formal credit history can
  // still prove they're creditworthy through their own cash-flow data.
  const allTimeRevenue = transactions
    .filter((t) => t.direction === "inbound")
    .reduce((sum, t) => sum + t.amount, 0);
  const businessScore = Math.max(
    35,
    Math.min(95, Math.round(allTimeRevenue / 100)),
  );
  const eligibleAmount = businessScore * 100;
  const fundingRequestAmount = Math.round(
    (eligibleAmount * fundingPercent) / 100,
  );

  // Transactions relevant to whichever account the Analytics screen is
  // currently filtered to (or every account, for the combined view).
  const analyticsTransactions =
    analyticsAccount === "all"
      ? transactions
      : transactions.filter((t) => t.account === analyticsAccount);

  const weeklyRevenue = analyticsTransactions
    .filter((t) => t.direction === "inbound")
    .reduce((sum, t) => sum + t.amount, 0);
  const weeklyExpenses = analyticsTransactions
    .filter((t) => t.direction === "outbound")
    .reduce((sum, t) => sum + t.amount, 0);
  const weeklyProfit = weeklyRevenue - weeklyExpenses;
  const weeklyMargin =
    weeklyRevenue > 0 ? Math.round((weeklyProfit / weeklyRevenue) * 100) : 0;

  const monthlyExtra =
    analyticsAccount === "all"
      ? ACCOUNT_ORDER.reduce(
          (acc, key) => ({
            revenue: acc.revenue + MONTHLY_EXTRA[key].revenue,
            expenses: acc.expenses + MONTHLY_EXTRA[key].expenses,
          }),
          { revenue: 0, expenses: 0 },
        )
      : MONTHLY_EXTRA[analyticsAccount];

  const monthlyRevenue = weeklyRevenue + monthlyExtra.revenue;
  const monthlyExpenses = weeklyExpenses + monthlyExtra.expenses;
  const monthlyProfit = monthlyRevenue - monthlyExpenses;
  const monthlyMargin =
    monthlyRevenue > 0 ? Math.round((monthlyProfit / monthlyRevenue) * 100) : 0;

  // Determine active view variables based on period state choice
  const activeRevenue =
    analyticsPeriod === "weekly" ? weeklyRevenue : monthlyRevenue;
  const activeExpenses =
    analyticsPeriod === "weekly" ? weeklyExpenses : monthlyExpenses;
  const activeProfit =
    analyticsPeriod === "weekly" ? weeklyProfit : monthlyProfit;
  const activeMargin =
    analyticsPeriod === "weekly" ? weeklyMargin : monthlyMargin;

  // Maximum value boundary for scaling graph bars — guarded against zero
  // so an account with no activity yet doesn't divide by zero.
  const maxBarValue = Math.max(activeRevenue, activeExpenses, activeProfit, 1);
  const revBarHeight = (activeRevenue / maxBarValue) * 100;
  const expBarHeight = (activeExpenses / maxBarValue) * 100;
  const profitBarHeight = Math.max(0, (activeProfit / maxBarValue) * 100);

  let screenContent: React.ReactNode = null;

  if (currentScreen === "splash") {
    screenContent = <SplashScreen />;
  } else if (currentScreen === "landing") {
    screenContent = <LandingScreen setCurrentScreen={setCurrentScreen} />;
  } else if (currentScreen === "register") {
    screenContent = (
      <RegisterScreen
        setCurrentScreen={setCurrentScreen}
        fullName={fullName}
        setFullName={setFullName}
        businessName={businessName}
        setBusinessName={setBusinessName}
        idNumber={idNumber}
        setIdNumber={setIdNumber}
        contactInfo={contactInfo}
        setContactInfo={setContactInfo}
        address1={address1}
        setAddress1={setAddress1}
        address2={address2}
        setAddress2={setAddress2}
        termsAccepted={termsAccepted}
        setTermsAccepted={setTermsAccepted}
        consentAccepted={consentAccepted}
        setConsentAccepted={setConsentAccepted}
      />
    );
  } else if (currentScreen === "signin") {
    screenContent = (
      <SignInScreen
        setCurrentScreen={setCurrentScreen}
        pin={pin}
        setPin={setPin}
      />
    );
  } else if (currentScreen === "dashboard") {
    screenContent = (
      <DashboardScreen
        setCurrentScreen={setCurrentScreen}
        balances={balances}
        netWorth={netWorth}
        spend={totalSpend}
        budget={BUDGET}
      />
    );
  } else if (currentScreen === "addcard") {
    screenContent = (
      <AddCardScreen
        setCurrentScreen={setCurrentScreen}
        cardHolderName={cardHolderName}
        setCardHolderName={setCardHolderName}
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        expiryDate={expiryDate}
        setExpiryDate={setExpiryDate}
        cvv={cvv}
        setCvv={setCvv}
        cardType={cardType}
        setCardType={setCardType}
        onAddCard={handleAddCard}
      />
    );
  } else if (currentScreen === "transfer") {
    screenContent = (
      <TransferScreen
        setCurrentScreen={setCurrentScreen}
        balances={balances}
        accountLabels={ACCOUNT_LABELS}
        transferFrom={transferFrom}
        setTransferFrom={setTransferFrom}
        transferTo={transferTo}
        setTransferTo={setTransferTo}
        cycleAccount={cycleAccount}
        transferAmount={transferAmount}
        setTransferAmount={setTransferAmount}
        transferReference={transferReference}
        setTransferReference={setTransferReference}
        onTransfer={handleTransfer}
      />
    );
  } else if (currentScreen === "mycards") {
    screenContent = (
      <MyCardsScreen
        setCurrentScreen={setCurrentScreen}
        balances={balances}
        cards={cards}
      />
    );
  } else if (currentScreen === "redeem") {
    screenContent = (
      <RedeemScreen
        setCurrentScreen={setCurrentScreen}
        balances={balances}
        selectedProvider={selectedProvider}
        setSelectedProvider={setSelectedProvider}
        voucherPin={voucherPin}
        setVoucherPin={setVoucherPin}
        voucherAccessCode={voucherAccessCode}
        setVoucherAccessCode={setVoucherAccessCode}
        voucherAmount={voucherAmount}
        setVoucherAmount={setVoucherAmount}
        selectedDestinationAccount={selectedDestinationAccount}
        setSelectedDestinationAccount={setSelectedDestinationAccount}
        onRedeem={handleRedeem}
      />
    );
  } else if (currentScreen === "transactions") {
    screenContent = (
      <TransactionsScreen
        setCurrentScreen={setCurrentScreen}
        activeTxAccount={activeTxAccount}
        setActiveTxAccount={setActiveTxAccount}
        accountLabels={ACCOUNT_LABELS}
        transactions={transactions.filter((t) => t.account === activeTxAccount)}
      />
    );
  } else if (currentScreen === "analytics") {
    screenContent = (
      <AnalyticsScreen
        setCurrentScreen={setCurrentScreen}
        analyticsPeriod={analyticsPeriod}
        setAnalyticsPeriod={setAnalyticsPeriod}
        analyticsAccount={analyticsAccount}
        setAnalyticsAccount={setAnalyticsAccount}
        activeRevenue={activeRevenue}
        activeExpenses={activeExpenses}
        activeProfit={activeProfit}
        activeMargin={activeMargin}
        revBarHeight={revBarHeight}
        expBarHeight={expBarHeight}
        profitBarHeight={profitBarHeight}
      />
    );
  } else if (currentScreen === "qrpay") {
    screenContent = (
      <QRPayScreen
        setCurrentScreen={setCurrentScreen}
        balances={balances}
        accountLabels={ACCOUNT_LABELS}
        qrAccount={qrAccount}
        setQrAccount={setQrAccount}
        cycleAccount={cycleAccount}
        qrAmount={qrAmount}
        setQrAmount={setQrAmount}
        onSimulatePayment={handleSimulateQrPayment}
        recentQrPayments={recentQrPayments}
      />
    );
  } else if (currentScreen === "funding") {
    screenContent = (
      <FundingScreen
        setCurrentScreen={setCurrentScreen}
        balances={balances}
        accountLabels={ACCOUNT_LABELS}
        businessScore={businessScore}
        eligibleAmount={eligibleAmount}
        fundingPercent={fundingPercent}
        setFundingPercent={setFundingPercent}
        fundingRequestAmount={fundingRequestAmount}
        fundingAccount={fundingAccount}
        setFundingAccount={setFundingAccount}
        cycleAccount={cycleAccount}
        onGetFunds={handleGetFunds}
      />
    );
  }

  return <ResponsiveAppShell>{screenContent}</ResponsiveAppShell>;
}
