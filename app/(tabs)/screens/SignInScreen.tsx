import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { AuthScreen } from "./types";

type Props = {
  setCurrentScreen: (screen: AuthScreen) => void;
  pin: string;
  setPin: (value: string) => void;
};

export function SignInScreen({ setCurrentScreen, pin, setPin }: Props) {
    return (
      <View style={styles.loginContainer}>
        <TouchableOpacity
          style={styles.topRightRegisterShortcut}
          onPress={() => setCurrentScreen("register")}
        >
          <Text style={styles.addPersonIcon}>+👤</Text>
        </TouchableOpacity>

        <View style={styles.loginLogoZone}>
          <View style={styles.diamondOuterMini}>
            <View style={styles.diamondBlueHalf} />
            <View style={styles.diamondGoldHalf} />
            <View style={styles.diamondInnerMask} />
          </View>
        </View>

        <View style={styles.loginInputWrapper}>
          <TextInput
            style={styles.pinInputField}
            placeholder="PIN"
            placeholderTextColor="#000000"
            secureTextEntry={true}
            value={pin}
            onChangeText={setPin}
            keyboardType="numeric"
          />
          <Text style={styles.lockIcon}>🔒</Text>
        </View>

        <TouchableOpacity
          style={styles.loginCoreButton}
          onPress={() => setCurrentScreen("dashboard")}
        >
          <Text style={styles.loginCoreButtonText}>LOG IN ➜</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotPinTouch}
          onPress={() => alert("PIN reset requested")}
        >
          <Text style={styles.forgotPinText}>Forgot Pin</Text>
        </TouchableOpacity>
      </View>
    );
}

export default SignInScreen;
