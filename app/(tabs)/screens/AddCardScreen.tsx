import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { AuthScreen, CardType } from "./types";

type Props = {
  setCurrentScreen: (screen: AuthScreen) => void;
  cardHolderName: string;
  setCardHolderName: (value: string) => void;
  cardNumber: string;
  setCardNumber: (value: string) => void;
  expiryDate: string;
  setExpiryDate: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;
  cardType: CardType;
  setCardType: (value: CardType) => void;
  onAddCard: () => void;
};

export function AddCardScreen({
  setCurrentScreen,
  cardHolderName,
  setCardHolderName,
  cardNumber,
  setCardNumber,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv,
  cardType,
  setCardType,
  onAddCard,
}: Props) {
    return (
      <View style={styles.addCardContainer}>
        <View style={styles.addCardHeaderZone}>
          <TouchableOpacity
            style={styles.backArrowTouchLeft}
            onPress={() => setCurrentScreen("mycards")}
          >
            <Text style={styles.backArrowLabelText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.addCardTitleText}>Add Account:</Text>
          <View style={styles.headerRightSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.addCardFormWrapper}
          bounces={false}
        >
          <View style={styles.greyCardDataBox}>
            <View style={styles.cardNoInputRow}>
              <Text style={styles.cardBoxInlineLabel}>Name:</Text>
              <TextInput
                style={styles.cardBoxInputFieldWide}
                value={cardHolderName}
                onChangeText={setCardHolderName}
                placeholder="Cardholder Name"
                placeholderTextColor="#7f8c8d"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.cardNoInputRow}>
              <Text style={styles.cardBoxInlineLabel}>Card No:</Text>
              <TextInput
                style={styles.cardBoxInputFieldWide}
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#7f8c8d"
                maxLength={19}
              />
            </View>

            <View style={styles.inlineCardDateCvvRow}>
              <View style={styles.cardInlineSegment}>
                <Text style={styles.cardBoxInlineLabel}>Exp.Date:</Text>
                <TextInput
                  style={styles.cardBoxInputFieldShort}
                  placeholder="MM/YY"
                  placeholderTextColor="#7f8c8d"
                  value={expiryDate}
                  onChangeText={setExpiryDate}
                  maxLength={5}
                />
              </View>

              <View style={styles.cardInlineSegment}>
                <Text style={styles.cardBoxInlineLabel}>CVV:</Text>
                <TextInput
                  style={styles.cardBoxInputFieldShort}
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="numeric"
                  secureTextEntry={true}
                  maxLength={4}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.debitCreditSelectorPill}
            onPress={() =>
              setCardType(cardType === "Debit Card" ? "Credit Card" : "Debit Card")
            }
          >
            <View style={styles.selectorPillLeftBlock}>
              <Text style={styles.pillCardIcon}>💳</Text>
              <Text style={styles.pillCardText}>{cardType}</Text>
            </View>
            <Text style={styles.pillChevronIcon}>⇅</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cardSubmitActionButton}
            onPress={onAddCard}
          >
            <Text style={styles.cardSubmitButtonText}>Add</Text>
          </TouchableOpacity>

          <View style={styles.biometricOuterFrameZone}>
            <View style={styles.fingerprintGraphicTarget}>
              <Text style={styles.fingerprintGraphicIcon}>🧬</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
}

export default AddCardScreen;
