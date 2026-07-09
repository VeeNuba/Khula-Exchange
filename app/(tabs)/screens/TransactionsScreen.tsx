import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { AccountKey, AuthScreen, Transaction } from "./types";

type Props = {
  setCurrentScreen: (screen: AuthScreen) => void;
  activeTxAccount: AccountKey;
  setActiveTxAccount: (value: AccountKey) => void;
  accountLabels: Record<AccountKey, string>;
  transactions: Transaction[];
};

const TAB_LABELS: Record<AccountKey, string> = {
  fnb: "FIRST NATIONAL BANK",
  absa: "ABSA",
  capitec: "CAPITEC",
};

export function TransactionsScreen({
  setCurrentScreen,
  activeTxAccount,
  setActiveTxAccount,
  accountLabels,
  transactions,
}: Props) {
    return (
      <View style={styles.txContainer}>
        <View style={styles.txHeaderZone}>
          <TouchableOpacity
            style={styles.backArrowTouch}
            onPress={() => setCurrentScreen("dashboard")}
          >
            <Text style={styles.backArrowLabelText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.txTitleText}>Transaction History</Text>
          <View style={styles.headerRightSpacer} />
        </View>

        <View style={styles.txAccountFilterTabBarRow}>
          {(Object.keys(TAB_LABELS) as AccountKey[]).map((account) => (
            <TouchableOpacity
              key={account}
              style={[
                styles.txAccountFilterTabButton,
                activeTxAccount === account &&
                  styles.txAccountFilterTabButtonActive,
              ]}
              onPress={() => setActiveTxAccount(account)}
            >
              <Text
                style={[
                  styles.txAccountFilterTabText,
                  activeTxAccount === account &&
                    styles.txAccountFilterTabTextActive,
                ]}
              >
                {TAB_LABELS[account]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.txActiveSectionLabelFrame}>
          <Text style={styles.txActiveSectionLabelText}>
            {accountLabels[activeTxAccount].toUpperCase()} LOGS
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.txListScrollWrapper}
          bounces={true}
        >
          {transactions.length === 0 ? (
            <Text style={styles.txItemLocationSubtitle}>
              No transactions yet for this account.
            </Text>
          ) : (
            transactions.map((tx) => (
              <View key={tx.id} style={styles.txItemRowContainer}>
                <View style={styles.txItemLeftMetaBlock}>
                  <Text style={styles.txItemStatusSymbolEmoji}>
                    {tx.direction === "inbound" ? "📥" : "📤"}
                  </Text>
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
                <Text
                  style={
                    tx.direction === "inbound"
                      ? styles.txItemAmountValueTextInbound
                      : styles.txItemAmountValueTextOutbound
                  }
                >
                  {tx.direction === "inbound" ? "+" : "-"}R
                  {tx.amount.toLocaleString()}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    );
}

export default TransactionsScreen;
