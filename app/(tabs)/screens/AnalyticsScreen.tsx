import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { AnalyticsAccountFilter, AuthScreen } from "./types";

type Props = {
  setCurrentScreen: (screen: AuthScreen) => void;
  analyticsPeriod: "weekly" | "monthly";
  setAnalyticsPeriod: (value: "weekly" | "monthly") => void;
  analyticsAccount: AnalyticsAccountFilter;
  setAnalyticsAccount: (value: AnalyticsAccountFilter) => void;
  activeRevenue: number;
  activeExpenses: number;
  activeProfit: number;
  activeMargin: number;
  revBarHeight: number;
  expBarHeight: number;
  profitBarHeight: number;
};

const ACCOUNT_FILTERS: { key: AnalyticsAccountFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "fnb", label: "FNB" },
  { key: "absa", label: "ABSA" },
  { key: "capitec", label: "Capitec" },
];

const ACCOUNT_FILTER_HEADING: Record<AnalyticsAccountFilter, string> = {
  all: "ALL ACCOUNTS",
  fnb: "FNB",
  absa: "ABSA",
  capitec: "CAPITEC",
};

export function AnalyticsScreen({
  setCurrentScreen,
  analyticsPeriod,
  setAnalyticsPeriod,
  analyticsAccount,
  setAnalyticsAccount,
  activeRevenue,
  activeExpenses,
  activeProfit,
  activeMargin,
  revBarHeight,
  expBarHeight,
  profitBarHeight,
}: Props) {
    return (
      <View style={styles.analyticsMainContainer}>
        {/* Dynamic Window Header */}
        <View style={styles.analyticsHeaderZone}>
          <TouchableOpacity
            style={styles.backArrowTouch}
            onPress={() => setCurrentScreen("dashboard")}
          >
            <Text style={styles.backArrowLabelText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.analyticsTitleText}>Gross Profit Analytics</Text>
          <View style={styles.headerRightSpacer} />
        </View>

        {/* Period Responsive Sub-Tabs */}
        <View style={styles.periodFilterToggleRow}>
          <TouchableOpacity
            style={[
              styles.periodTogglePill,
              analyticsPeriod === "weekly" && styles.periodTogglePillActive,
            ]}
            onPress={() => setAnalyticsPeriod("weekly")}
          >
            <Text
              style={[
                styles.periodToggleText,
                analyticsPeriod === "weekly" && styles.periodToggleTextActive,
              ]}
            >
              Weekly View
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.periodTogglePill,
              analyticsPeriod === "monthly" && styles.periodTogglePillActive,
            ]}
            onPress={() => setAnalyticsPeriod("monthly")}
          >
            <Text
              style={[
                styles.periodToggleText,
                analyticsPeriod === "monthly" && styles.periodToggleTextActive,
              ]}
            >
              Monthly View
            </Text>
          </TouchableOpacity>
        </View>

        {/* Account Filter Sub-Tabs — check one account or all of them */}
        <View style={styles.periodFilterToggleRow}>
          {ACCOUNT_FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.periodTogglePill,
                analyticsAccount === filter.key && styles.periodTogglePillActive,
              ]}
              onPress={() => setAnalyticsAccount(filter.key)}
            >
              <Text
                style={[
                  styles.periodToggleText,
                  analyticsAccount === filter.key &&
                    styles.periodToggleTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView
          contentContainerStyle={styles.analyticsScrollWrapper}
          bounces={true}
        >
          {/* Numeric Aggregated Overview Indicators */}
          <View style={styles.analyticsNumericalSummaryCard}>
            <View style={styles.numericalMetricBlock}>
              <Text style={styles.metricSummaryLabel}>REVENUE</Text>
              <Text style={styles.metricSummaryValueGreen}>
                R{activeRevenue.toLocaleString()}
              </Text>
            </View>

            <View style={styles.verticalDividerLine} />

            <View style={styles.numericalMetricBlock}>
              <Text style={styles.metricSummaryLabel}>EXPENSES</Text>
              <Text style={styles.metricSummaryValueRed}>
                R{activeExpenses.toLocaleString()}
              </Text>
            </View>

            <View style={styles.verticalDividerLine} />

            <View style={styles.numericalMetricBlock}>
              <Text style={styles.metricSummaryLabel}>NET PROFIT</Text>
              <Text style={styles.metricSummaryValueBlue}>
                R{activeProfit.toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Dynamic Responsive Flexbox Chart Engine Canvas */}
          <View style={styles.chartCanvasContainerCard}>
            <Text style={styles.canvasInsideLabelHeader}>
              VISUAL PERFORMANCE MATRIX — {ACCOUNT_FILTER_HEADING[analyticsAccount]}
            </Text>

            <View style={styles.chartBarGraphAxisRow}>
              {/* Vertical Reference Scale */}
              <View style={styles.graphYAxisScalesColumn}>
                <Text style={styles.yAxisScaleLabelText}>Max</Text>
                <Text style={styles.yAxisScaleLabelText}>50%</Text>
                <Text style={styles.yAxisScaleLabelText}>R0</Text>
              </View>

              {/* Dynamic Scaling Bar Containers */}
              <View style={styles.graphBarsMainPlotZone}>
                {/* Bar 1: Revenue Tracking */}
                <View style={styles.individualBarColumnGrouping}>
                  <View style={styles.barVerticalGrowthTrackEmptySpace}>
                    <View
                      style={[
                        styles.liveColorBarGrowthPill,
                        styles.revenueBarColor,
                        { height: `${revBarHeight}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.barBottomLabelIndicator}>Revenue</Text>
                </View>

                {/* Bar 2: Expenses Tracking */}
                <View style={styles.individualBarColumnGrouping}>
                  <View style={styles.barVerticalGrowthTrackEmptySpace}>
                    <View
                      style={[
                        styles.liveColorBarGrowthPill,
                        styles.expensesBarColor,
                        { height: `${expBarHeight}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.barBottomLabelIndicator}>Expenses</Text>
                </View>

                {/* Bar 3: Profit Margins Tracking */}
                <View style={styles.individualBarColumnGrouping}>
                  <View style={styles.barVerticalGrowthTrackEmptySpace}>
                    <View
                      style={[
                        styles.liveColorBarGrowthPill,
                        styles.profitBarColor,
                        { height: `${profitBarHeight}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.barBottomLabelIndicator}>Net Profit</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Efficiency Ratios Bottom Scorecard */}
          <View style={styles.analyticsNumericalSummaryCard}>
            <View style={styles.efficiencyRatioDetailsRow}>
              <Text style={styles.efficiencyRatioLabelText}>
                Gross Profit Margin Ratio
              </Text>
              <Text style={styles.efficiencyRatioValuePercentageText}>
                {activeMargin}%
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* PERSISTENT TAB BAR */}
        <View style={styles.bottomTabBarRow}>
          <TouchableOpacity
            style={styles.tabBarButton}
            onPress={() => setCurrentScreen("dashboard")}
          >
            <Text style={styles.tabBarIcon}>🏠</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabBarButtonActive}
            onPress={() => setCurrentScreen("analytics")}
          >
            <Text style={styles.tabBarIcon}>📈</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabBarButton}
            onPress={() => setCurrentScreen("landing")}
          >
            <Text style={styles.tabBarIcon}>👤</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabBarButton}>
            <Text style={styles.tabBarIcon}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

export default AnalyticsScreen;
