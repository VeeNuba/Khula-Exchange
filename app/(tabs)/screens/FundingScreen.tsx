import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { AccountKey, AuthScreen, Balances } from "./types";

type Props = {
  setCurrentScreen: (screen: AuthScreen) => void;
  balances: Balances;
  accountLabels: Record<AccountKey, string>;
  businessScore: number;
  eligibleAmount: number;
  fundingPercent: number;
  setFundingPercent: (value: number) => void;
  fundingRequestAmount: number;
  fundingAccount: AccountKey;
  setFundingAccount: (value: AccountKey) => void;
  cycleAccount: (current: AccountKey) => AccountKey;
  onGetFunds: () => void;
};

const PRESET_PERCENTS = [25, 50, 100];

export function FundingScreen({
  setCurrentScreen,
  balances,
  accountLabels,
  businessScore,
  eligibleAmount,
  fundingPercent,
  setFundingPercent,
  fundingRequestAmount,
  fundingAccount,
  setFundingAccount,
  cycleAccount,
  onGetFunds,
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
        <Text style={styles.redeemTitleText}>Business Funding</Text>
        <View style={styles.headerRightSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.redeemFormScrollWrapper}
        bounces={false}
      >
        <View style={styles.fundingScoreWrapper}>
          <View style={styles.networthCircleRing}>
            <Text style={styles.networthLabel}>Score</Text>
            <Text style={styles.networthValue}>{businessScore}</Text>
          </View>
          <Text style={styles.fundingEligibleLabel}>
            Based on your recent sales, you're pre-qualified for:
          </Text>
          <Text style={styles.fundingEligibleAmountText}>
            R{eligibleAmount.toLocaleString()}
          </Text>
        </View>

        <Text style={styles.redeemSectionFieldHeading}>
          Select Funding Amount:
        </Text>
        <View style={styles.presetAmountRow}>
          {PRESET_PERCENTS.map((percent) => (
            <TouchableOpacity
              key={percent}
              style={[
                styles.presetAmountPill,
                fundingPercent === percent && styles.presetAmountPillActive,
              ]}
              onPress={() => setFundingPercent(percent)}
            >
              <Text
                style={[
                  styles.presetAmountPillText,
                  fundingPercent === percent &&
                    styles.presetAmountPillTextActive,
                ]}
              >
                {percent}%
              </Text>
              <Text
                style={[
                  styles.presetAmountPillAmountText,
                  fundingPercent === percent &&
                    styles.presetAmountPillAmountTextActive,
                ]}
              >
                R{Math.round((eligibleAmount * percent) / 100).toLocaleString()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.fundingSelectedAmountText}>
          You'll receive: R{fundingRequestAmount.toLocaleString()}
        </Text>

        <Text style={styles.redeemSectionFieldHeading}>
          Deposit To: (tap to switch)
        </Text>
        <TouchableOpacity
          style={styles.accountSelectorCardBlock}
          onPress={() => setFundingAccount(cycleAccount(fundingAccount))}
        >
          <View style={styles.accountCardLeftContents}>
            <Text style={styles.cardVisualGraphicIcon}>💳</Text>
            <Text style={styles.accountNameDisplayLabel}>
              {accountLabels[fundingAccount]}
            </Text>
          </View>
          <View style={styles.accountBalanceRight}>
            <Text style={styles.accountBalanceDisplayValue}>
              R{balances[fundingAccount].toLocaleString()}
            </Text>
            <Text style={styles.accountSwapChevron}>⇅</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.fundingDisclaimerText}>
          No paperwork. No collateral. Approved instantly based on your own
          transaction history.
        </Text>

        <TouchableOpacity
          style={styles.redeemExecutionButton}
          onPress={onGetFunds}
        >
          <Text style={styles.redeemExecutionButtonText}>
            Accept Funding Offer
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default FundingScreen;
