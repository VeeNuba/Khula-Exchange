import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

export function SplashScreen() {
    return (
      <View style={styles.splashContainer}>
        <View style={styles.logoWrapper}>
          <View style={styles.diamondOuter}>
            <View style={styles.diamondBlueHalf} />
            <View style={styles.diamondGoldHalf} />
            <View style={styles.diamondInnerMask} />
          </View>
          <Text style={styles.splashMainHeader}>KHULA EXCHANGE</Text>
          <Text style={styles.splashSubHeader}>WISE</Text>
        </View>
      </View>
    );
}

export default SplashScreen;
