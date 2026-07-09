import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { AuthScreen, Balances } from "./types";

const ACTIVE_TAB_ICON_COLOR = "#1b3a6e";
const INACTIVE_TAB_ICON_COLOR = "#95a5a6";

type Props = {
  setCurrentScreen: (screen: AuthScreen) => void;
  balances: Balances;
  netWorth: number;
  spend: number;
  budget: number;
};

export function DashboardScreen({
  setCurrentScreen,
  balances,
  netWorth,
  spend,
  budget,
}: Props) {
    return (
      <View style={styles.dashboardContainer}>
        <ScrollView
          contentContainerStyle={styles.dashboardScroll}
          bounces={false}
        >
          <View style={styles.bannerImageContainer}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
              }}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.dashboardCardShadow}>
            <View style={styles.actionIconRow}>
              <TouchableOpacity
                style={styles.actionIconCell}
                onPress={() => setCurrentScreen("redeem")}
              >
                <View style={[styles.actionIconCircle, styles.actionIconCircleGold]}>
                  <Ionicons name="gift-outline" size={22} color="#1b3a6e" />
                </View>
                <Text style={styles.actionText}>Redeem</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionIconCell}
                onPress={() => setCurrentScreen("transfer")}
              >
                <View style={[styles.actionIconCircle, styles.actionIconCircleBlue]}>
                  <Ionicons name="swap-horizontal-outline" size={22} color="#ffffff" />
                </View>
                <Text style={styles.actionText}>Transfer</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionIconCell}
                onPress={() => setCurrentScreen("mycards")}
              >
                <View style={[styles.actionIconCircle, styles.actionIconCircleNavy]}>
                  <Ionicons name="card-outline" size={22} color="#ffffff" />
                </View>
                <Text style={styles.actionText}>Cards</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionIconCell}
                onPress={() => setCurrentScreen("transactions")}
              >
                <View style={[styles.actionIconCircle, styles.actionIconCircleGreen]}>
                  <Ionicons name="receipt-outline" size={22} color="#ffffff" />
                </View>
                <Text style={styles.actionText}>Transactions</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.dashboardCardShadow}>
            <Text style={styles.growSectionHeading}>Grow Your Business</Text>
            <View style={styles.growCardsRow}>
              <TouchableOpacity
                style={styles.growActionCard}
                onPress={() =>
                  alert("QR Payments — Coming Soon! This feature is currently in development.")
                }
              >
                <View style={styles.growCardTopRow}>
                  <Text style={styles.growActionIcon}>📲</Text>
                  <View style={styles.growComingSoonBadge}>
                    <Text style={styles.growComingSoonBadgeText}>
                      COMING SOON
                    </Text>
                  </View>
                </View>
                <Text style={styles.growActionTitle}>Get Paid Instantly</Text>
                <Text style={styles.growActionSubtitle}>
                  Accept payments with a QR code — no card machine needed
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.growActionCardAlt}
                onPress={() =>
                  alert("Business Funding — Coming Soon! This feature is currently in development.")
                }
              >
                <View style={styles.growCardTopRow}>
                  <Text style={styles.growActionIcon}>💼</Text>
                  <View style={styles.growComingSoonBadge}>
                    <Text style={styles.growComingSoonBadgeText}>
                      COMING SOON
                    </Text>
                  </View>
                </View>
                <Text style={styles.growActionTitleAlt}>
                  Unlock Business Funding
                </Text>
                <Text style={styles.growActionSubtitleAlt}>
                  Get working capital based on your sales — no paperwork
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.dashboardCardShadow}>
            <View style={styles.verifiedAccountsContainer}>
              <Text style={styles.verifiedTitleText}>Verified Accounts:</Text>
              <View style={styles.bankAccountRow}>
                <Text style={styles.bankNameText}>FIRST NATIONAL BANK</Text>
                <Text style={styles.bankBalanceText}>
                  R{balances.fnb.toLocaleString()}
                </Text>
              </View>
              <View style={styles.bankAccountRow}>
                <Text style={styles.bankNameText}>CAPITEC</Text>
                <Text style={styles.bankBalanceText}>
                  R{balances.capitec.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.dashboardCardShadow}>
            <View style={styles.metricsContainerRow}>
              <View style={styles.networthCircleRing}>
                <Text style={styles.networthLabel}>Networth</Text>
                <Text style={styles.networthValue}>
                  R{netWorth.toLocaleString()}
                </Text>
              </View>
              <View style={styles.metricsTextBlock}>
                <Text style={styles.metricItemLabel}>
                  Spend: R{spend.toLocaleString()}
                </Text>
                <View style={styles.metricUnderlineDivider} />
                <Text style={styles.metricItemLabel}>
                  Budget: R{budget.toLocaleString()}
                </Text>
                <View style={styles.metricUnderlineDivider} />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* PERSISTENT TAB BAR */}
        <View style={styles.bottomTabBarRow}>
          <TouchableOpacity
            style={styles.tabBarButtonActive}
            onPress={() => setCurrentScreen("dashboard")}
          >
            <Ionicons name="home" size={24} color={ACTIVE_TAB_ICON_COLOR} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabBarButton}
            onPress={() => setCurrentScreen("analytics")}
          >
            <Ionicons
              name="bar-chart-outline"
              size={24}
              color={INACTIVE_TAB_ICON_COLOR}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabBarButton}
            onPress={() => setCurrentScreen("landing")}
          >
            <Ionicons
              name="person-outline"
              size={24}
              color={INACTIVE_TAB_ICON_COLOR}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabBarButton}>
            <Ionicons
              name="menu-outline"
              size={24}
              color={INACTIVE_TAB_ICON_COLOR}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
}

export default DashboardScreen;
