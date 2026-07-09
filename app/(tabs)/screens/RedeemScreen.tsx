import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { AccountKey, AuthScreen, Balances } from "./types";

type Props = {
  setCurrentScreen: (screen: AuthScreen) => void;
  balances: Balances;
  selectedProvider: string;
  setSelectedProvider: (value: string) => void;
  voucherPin: string;
  setVoucherPin: (value: string) => void;
  voucherAccessCode: string;
  setVoucherAccessCode: (value: string) => void;
  voucherAmount: string;
  setVoucherAmount: (value: string) => void;
  selectedDestinationAccount: AccountKey;
  setSelectedDestinationAccount: (value: AccountKey) => void;
  onRedeem: () => void;
};

export function RedeemScreen({
  setCurrentScreen,
  balances,
  selectedProvider,
  setSelectedProvider,
  voucherPin,
  setVoucherPin,
  voucherAccessCode,
  setVoucherAccessCode,
  voucherAmount,
  setVoucherAmount,
  selectedDestinationAccount,
  setSelectedDestinationAccount,
  onRedeem,
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
          <Text style={styles.redeemTitleText}>Redeem CashSend</Text>
          <View style={styles.headerRightSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.redeemFormScrollWrapper}
          bounces={false}
        >
          <Text style={styles.redeemSectionFieldHeading}>
            Select Voucher Provider:
          </Text>
          <View style={styles.customSelectorDropdownRow}>
            <TouchableOpacity
              style={[
                styles.dropdownPillOption,
                selectedProvider === "absa" && styles.dropdownPillActive,
              ]}
              onPress={() => setSelectedProvider("absa")}
            >
              <Text
                style={[
                  styles.dropdownPillText,
                  selectedProvider === "absa" && styles.dropdownPillTextActive,
                ]}
              >
                ABSA CashSend
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.dropdownPillOption,
                selectedProvider === "fnb" && styles.dropdownPillActive,
              ]}
              onPress={() => setSelectedProvider("fnb")}
            >
              <Text
                style={[
                  styles.dropdownPillText,
                  selectedProvider === "fnb" && styles.dropdownPillTextActive,
                ]}
              >
                FNB eWallet
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.dropdownPillOption,
                selectedProvider === "standard" && styles.dropdownPillActive,
              ]}
              onPress={() => setSelectedProvider("standard")}
            >
              <Text
                style={[
                  styles.dropdownPillText,
                  selectedProvider === "standard" &&
                    styles.dropdownPillTextActive,
                ]}
              >
                Instant Money
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.redeemSectionFieldHeading}>Voucher Number:</Text>
          <TextInput
            style={styles.redeemFormInputFieldElement}
            value={voucherPin}
            onChangeText={setVoucherPin}
            keyboardType="numeric"
            placeholder="Enter 10-digit pin code"
            placeholderTextColor="#a4a4a4"
          />

          <Text style={styles.redeemSectionFieldHeading}>
            6-Digit Access PIN:
          </Text>
          <TextInput
            style={styles.redeemFormInputFieldElement}
            value={voucherAccessCode}
            onChangeText={setVoucherAccessCode}
            keyboardType="numeric"
            secureTextEntry={true}
            placeholder="Enter access code"
            placeholderTextColor="#a4a4a4"
            maxLength={6}
          />

          <Text style={styles.redeemSectionFieldHeading}>
            Voucher Amount (R):
          </Text>
          <TextInput
            style={styles.redeemFormInputFieldElement}
            value={voucherAmount}
            onChangeText={setVoucherAmount}
            keyboardType="numeric"
            placeholder="Enter the voucher's value"
            placeholderTextColor="#a4a4a4"
          />

          <Text style={styles.redeemSectionFieldHeading}>
            Deposit To (Destination Account):
          </Text>

          <TouchableOpacity
            style={[
              styles.accountSelectorCardBlock,
              selectedDestinationAccount === "fnb" &&
                styles.accountCardBlockSelected,
            ]}
            onPress={() => setSelectedDestinationAccount("fnb")}
          >
            <View style={styles.accountCardLeftContents}>
              <View
                style={[
                  styles.customRadioBubble,
                  selectedDestinationAccount === "fnb" &&
                    styles.customRadioBubbleChecked,
                ]}
              />
              <Text style={styles.accountNameDisplayLabel}>
                FIRST NATIONAL BANK
              </Text>
            </View>
            <View style={styles.redeemAccountRightBlock}>
              <Text style={styles.verifiedTextBadge}>VERIFIED</Text>
              <Text style={styles.redeemAccountBalanceText}>
                R{balances.fnb.toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.accountSelectorCardBlock,
              selectedDestinationAccount === "capitec" &&
                styles.accountCardBlockSelected,
            ]}
            onPress={() => setSelectedDestinationAccount("capitec")}
          >
            <View style={styles.accountCardLeftContents}>
              <View
                style={[
                  styles.customRadioBubble,
                  selectedDestinationAccount === "capitec" &&
                    styles.customRadioBubbleChecked,
                ]}
              />
              <Text style={styles.accountNameDisplayLabel}>CAPITEC</Text>
            </View>
            <View style={styles.redeemAccountRightBlock}>
              <Text style={styles.verifiedTextBadge}>VERIFIED</Text>
              <Text style={styles.redeemAccountBalanceText}>
                R{balances.capitec.toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.redeemExecutionButton}
            onPress={onRedeem}
          >
            <Text style={styles.redeemExecutionButtonText}>Redeem Now</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
}

export default RedeemScreen;
