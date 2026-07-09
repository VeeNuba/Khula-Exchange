import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { AuthScreen, Balances, WalletCard } from "./types";

type Props = {
  setCurrentScreen: (screen: AuthScreen) => void;
  balances: Balances;
  cards: WalletCard[];
};

export function MyCardsScreen({ setCurrentScreen, balances, cards }: Props) {
    return (
      <View style={styles.myCardsContainer}>
        <View style={styles.myCardsHeaderZone}>
          <TouchableOpacity
            style={styles.backArrowTouch}
            onPress={() => setCurrentScreen("dashboard")}
          >
            <Text style={styles.backArrowLabelText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.myCardsTitleText}>My Cards</Text>
          <TouchableOpacity
            style={styles.addCardButtonHeaderTouch}
            onPress={() => setCurrentScreen("addcard")}
          >
            <Text style={styles.headerPlusIconGraphic}>⊕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.myCardsScrollWrapper}
          bounces={false}
        >
          <View style={styles.stackedCardsWalletLayout}>
            <View
              style={[
                styles.baseVisualCardStructure,
                styles.fnbCardBackgroundLayer,
              ]}
            >
              <View style={styles.cardTopBrandingRow}>
                <View>
                  <Text style={styles.fnbBrandTextLabel}>FNB</Text>
                  <Text style={styles.cardAccountTypeSubtitle}>
                    Business Account
                  </Text>
                  <Text style={styles.cardBalanceText}>
                    R{balances.fnb.toLocaleString()}
                  </Text>
                  <Text style={styles.cardBalanceCaption}>
                    Available Balance
                  </Text>
                </View>
                <Text style={styles.fnbTreeGraphicLogo}>🌳</Text>
              </View>
            </View>

            <View
              style={[
                styles.baseVisualCardStructure,
                styles.absaCardForegroundLayer,
              ]}
            >
              <View style={styles.cardTopBrandingRow}>
                <View style={styles.absaCircleBrandLogoBadge}>
                  <Text style={styles.absaLogoInlineText}>ABSA</Text>
                </View>
                <Text style={styles.contactlessWaveGraphicIcon}>📶</Text>
              </View>
              <Text style={styles.cardBalanceText}>
                R{balances.absa.toLocaleString()}
              </Text>
              <View style={styles.cardBottomDetailsRow}>
                <Text style={styles.cardMaskedNumbersLabel}>● ● ● 9876</Text>
                <Text style={styles.visaNetworkTextLogo}>VISA</Text>
              </View>
            </View>
          </View>

          <Text style={styles.linkedCardsSectionHeading}>Linked Cards</Text>
          {cards.length === 0 ? (
            <Text style={styles.linkedCardsEmptyText}>
              No additional cards linked yet. Tap ⊕ above to add one.
            </Text>
          ) : (
            cards.map((card) => (
              <View key={card.id} style={styles.linkedCardRow}>
                <View style={styles.linkedCardLeftBlock}>
                  <Text style={styles.linkedCardIcon}>💳</Text>
                  <View>
                    <Text style={styles.linkedCardNumberText}>
                      •••• •••• •••• {card.last4}
                    </Text>
                    <Text style={styles.linkedCardMetaText}>
                      {card.holderName}
                    </Text>
                    <Text style={styles.linkedCardMetaText}>
                      Expires {card.expiryDate}
                    </Text>
                  </View>
                </View>
                <Text style={styles.linkedCardTypeBadge}>
                  {card.cardType.toUpperCase()}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    );
}

export default MyCardsScreen;
