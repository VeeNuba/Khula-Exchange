import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { AuthScreen } from "./types";

type Props = {
  setCurrentScreen: (screen: AuthScreen) => void;
};

export function LandingScreen({ setCurrentScreen }: Props) {
    return (
      <View style={styles.landingContainer}>
        <View style={styles.miniBrandRow}>
          <Text style={styles.miniBrandText}>KHULA EXCHANGE • WISE</Text>
        </View>

        <View style={styles.welcomeMessageGroup}>
          <Text style={styles.welcomeMainTitle}>Welcome to WISE</Text>
          <Text style={styles.welcomeSubtitle}>
            Empowering informal micro-traders with data-driven financial
            intelligence. Track your business growth effortlessly.
          </Text>
        </View>

        <View style={styles.buttonActionGroup}>
          <TouchableOpacity
            style={styles.landingSignInBtn}
            onPress={() => setCurrentScreen("signin")}
          >
            <Text style={styles.landingSignInBtnText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.landingRegisterBtn}
            onPress={() => setCurrentScreen("register")}
          >
            <Text style={styles.landingRegisterBtnText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

export default LandingScreen;
