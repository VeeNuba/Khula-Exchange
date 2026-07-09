import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { AccountKey, AuthScreen, Balances } from "./types";

type Props = {
  setCurrentScreen: (screen: AuthScreen) => void;
  balances: Balances;
  accountLabels: Record<AccountKey, string>;
  transferFrom: AccountKey;
  setTransferFrom: (value: AccountKey) => void;
  transferTo: AccountKey;
  setTransferTo: (value: AccountKey) => void;
  cycleAccount: (current: AccountKey) => AccountKey;
  transferAmount: string;
  setTransferAmount: (value: string) => void;
  transferReference: string;
  setTransferReference: (value: string) => void;
  onTransfer: () => void;
};

export function TransferScreen({
  setCurrentScreen,
  balances,
  accountLabels,
  transferFrom,
  setTransferFrom,
  transferTo,
  setTransferTo,
  cycleAccount,
  transferAmount,
  setTransferAmount,
  transferReference,
  setTransferReference,
  onTransfer,
}: Props) {
    return (
      <View style={styles.transferContainer}>
        <View style={styles.transferHeaderZone}>
          <TouchableOpacity
            style={styles.backArrowTouch}
            onPress={() => setCurrentScreen("dashboard")}
          >
            <Text style={styles.backArrowLabelText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.transferTitleText}>Transfer</Text>
          <View style={styles.headerRightSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.transferFormScrollWrapper}
          bounces={false}
        >
          <Text style={styles.transferSectionFieldHeading}>
            From: (tap to switch account)
          </Text>
          <TouchableOpacity
            style={styles.accountSelectorCardBlock}
            onPress={() => setTransferFrom(cycleAccount(transferFrom))}
          >
            <View style={styles.accountCardLeftContents}>
              <Text style={styles.cardVisualGraphicIcon}>💳</Text>
              <Text style={styles.accountNameDisplayLabel}>
                {accountLabels[transferFrom]}
              </Text>
            </View>
            <View style={styles.accountBalanceRight}>
              <Text style={styles.accountBalanceDisplayValue}>
                R{balances[transferFrom].toLocaleString()}
              </Text>
              <Text style={styles.accountSwapChevron}>⇅</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.transferSectionFieldHeading}>
            To: (tap to switch account)
          </Text>
          <TouchableOpacity
            style={styles.accountSelectorCardBlock}
            onPress={() => setTransferTo(cycleAccount(transferTo))}
          >
            <View style={styles.accountCardLeftContents}>
              <Text style={styles.cardVisualGraphicIcon}>💳</Text>
              <Text style={styles.accountNameDisplayLabel}>
                {accountLabels[transferTo]}
              </Text>
            </View>
            <View style={styles.accountBalanceRight}>
              <Text style={styles.accountBalanceDisplayValue}>
                R{balances[transferTo].toLocaleString()}
              </Text>
              <Text style={styles.accountSwapChevron}>⇅</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.transferSectionFieldHeading}>Amount:</Text>
          <TextInput
            style={styles.transferFormInputFieldElement}
            value={transferAmount}
            onChangeText={setTransferAmount}
            keyboardType="numeric"
            placeholder="Enter amount"
            placeholderTextColor="#a4a4a4"
          />

          <Text style={styles.transferSectionFieldHeading}>Refence:</Text>
          <TextInput
            style={styles.transferFormInputFieldElement}
            value={transferReference}
            onChangeText={setTransferReference}
            placeholder="Enter reference"
            placeholderTextColor="#a4a4a4"
          />

          <TouchableOpacity
            style={styles.transferExecutionButton}
            onPress={onTransfer}
          >
            <Text style={styles.transferExecutionButtonText}>Transfer</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
}

export default TransferScreen;
