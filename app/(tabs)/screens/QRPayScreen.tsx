import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { AccountKey, AuthScreen, Balances, Transaction } from "./types";

// Decorative QR-style grid — not a real scannable code, just enough visual
// authenticity for a demo ("show this to your customer to get paid").
const QR_PATTERN = [
  "111001101",
  "101011010",
  "111000111",
  "000101000",
  "010110101",
  "101001010",
  "000111000",
  "010100111",
  "101011101",
];

type Props = {
  setCurrentScreen: (screen: AuthScreen) => void;
  balances: Balances;
  accountLabels: Record<AccountKey, string>;
  qrAccount: AccountKey;
  setQrAccount: (value: AccountKey) => void;
  cycleAccount: (current: AccountKey) => AccountKey;
  qrAmount: string;
  setQrAmount: (value: string) => void;
  onSimulatePayment: () => void;
  recentQrPayments: Transaction[];
};

export function QRPayScreen({
  setCurrentScreen,
  balances,
  accountLabels,
  qrAccount,
  setQrAccount,
  cycleAccount,
  qrAmount,
  setQrAmount,
  onSimulatePayment,
  recentQrPayments,
}: Props) {
  return (
    <View style={styles.redeemContainer}>
      <View style={styles.redeemHeaderZone}>
        <TouchableOpacity
          style={styles.backArrowTouch}
          onPress={() => setCurrentScreen("dashboard")}
        >
          <Text style={styles.backArrowLabelText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.redeemTitleText}>Get Paid</Text>
        <View style={styles.headerRightSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.redeemFormScrollWrapper}
        bounces={false}
      >
        <Text style={styles.redeemSectionFieldHeading}>
          Receiving Account: (tap to switch)
        </Text>
        <TouchableOpacity
          style={styles.accountSelectorCardBlock}
          onPress={() => setQrAccount(cycleAccount(qrAccount))}
        >
          <View style={styles.accountCardLeftContents}>
            <Text style={styles.cardVisualGraphicIcon}>💳</Text>
            <Text style={styles.accountNameDisplayLabel}>
              {accountLabels[qrAccount]}
            </Text>
          </View>
          <View style={styles.accountBalanceRight}>
            <Text style={styles.accountBalanceDisplayValue}>
              R{balances[qrAccount].toLocaleString()}
            </Text>
            <Text style={styles.accountSwapChevron}>⇅</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.redeemSectionFieldHeading}>
          Request Amount (optional):
        </Text>
        <TextInput
          style={styles.redeemFormInputFieldElement}
          value={qrAmount}
          onChangeText={setQrAmount}
          keyboardType="numeric"
          placeholder="Leave blank to accept any amount"
          placeholderTextColor="#a4a4a4"
        />

        <View style={styles.qrCodeWrapper}>
          {QR_PATTERN.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.qrGridRow}>
              {row.split("").map((cell, cellIndex) => (
                <View
                  key={cellIndex}
                  style={[
                    styles.qrCell,
                    cell === "1" ? styles.qrCellFilled : styles.qrCellEmpty,
                  ]}
                />
              ))}
            </View>
          ))}
        </View>
        <Text style={styles.qrCaptionText}>
          Show this code to your customer to get paid
        </Text>

        <View style={styles.qrStatusPill}>
          <Text style={styles.qrStatusText}>Waiting for payment…</Text>
        </View>

        <TouchableOpacity
          style={styles.redeemExecutionButton}
          onPress={onSimulatePayment}
        >
          <Text style={styles.redeemExecutionButtonText}>
            Confirm Payment Received
          </Text>
        </TouchableOpacity>

        <Text style={styles.recentQrHeading}>Recent QR Payments</Text>
        {recentQrPayments.length === 0 ? (
          <Text style={styles.linkedCardsEmptyText}>
            No QR payments yet. Tap the button above to simulate one.
          </Text>
        ) : (
          recentQrPayments.map((tx) => (
            <View key={tx.id} style={styles.txItemRowContainer}>
              <View style={styles.txItemLeftMetaBlock}>
                <Text style={styles.txItemStatusSymbolEmoji}>📲</Text>
                <View>
                  <Text style={styles.txItemDescriptionMainTitle}>
                    {tx.title}
                  </Text>
                  <Text style={styles.txItemLocationSubtitle}>
                    {tx.subtitle}
                  </Text>
                  <Text style={styles.txItemTimestampString}>
                    {tx.timestamp}
                  </Text>
                </View>
              </View>
              <Text style={styles.txItemAmountValueTextInbound}>
                +R{tx.amount.toLocaleString()}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

export default QRPayScreen;
