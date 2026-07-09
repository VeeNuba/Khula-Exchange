import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { AuthScreen } from "./types";

type Props = {
  setCurrentScreen: (screen: AuthScreen) => void;
  fullName: string;
  setFullName: (value: string) => void;
  businessName: string;
  setBusinessName: (value: string) => void;
  idNumber: string;
  setIdNumber: (value: string) => void;
  contactInfo: string;
  setContactInfo: (value: string) => void;
  address1: string;
  setAddress1: (value: string) => void;
  address2: string;
  setAddress2: (value: string) => void;
  termsAccepted: boolean;
  setTermsAccepted: (value: boolean) => void;
  consentAccepted: boolean;
  setConsentAccepted: (value: boolean) => void;
};

export function RegisterScreen({
  setCurrentScreen,
  fullName,
  setFullName,
  businessName,
  setBusinessName,
  idNumber,
  setIdNumber,
  contactInfo,
  setContactInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  termsAccepted,
  setTermsAccepted,
  consentAccepted,
  setConsentAccepted,
}: Props) {
    return (
      <ScrollView
        contentContainerStyle={styles.registerScrollContainer}
        bounces={false}
      >
        <View style={styles.registerHeaderZone}>
          <Text style={styles.registerTitleText}>Register</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.fieldLabel}>
            Full Name: <Text style={styles.asterisk}>*</Text>
          </Text>
          <TextInput
            style={styles.formInput}
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.fieldLabel}>
            Business Name: <Text style={styles.asterisk}>*</Text>
          </Text>
          <TextInput
            style={styles.formInput}
            value={businessName}
            onChangeText={setBusinessName}
          />

          <Text style={styles.fieldLabel}>
            ID Number: <Text style={styles.asterisk}>*</Text>
          </Text>
          <TextInput
            style={styles.formInput}
            value={idNumber}
            onChangeText={setIdNumber}
            keyboardType="numeric"
          />

          <Text style={styles.fieldLabel}>
            Email/Phone Number: <Text style={styles.asterisk}>*</Text>
          </Text>
          <TextInput
            style={styles.formInput}
            value={contactInfo}
            onChangeText={setContactInfo}
          />

          <View style={styles.splitAddressRow}>
            <View style={styles.splitFieldColumn}>
              <Text style={styles.fieldLabel}>
                Address 1: <Text style={styles.asterisk}>*</Text>
              </Text>
              <TextInput
                style={styles.formInput}
                value={address1}
                onChangeText={setAddress1}
              />
            </View>
            <View style={styles.splitFieldColumn}>
              <Text style={styles.fieldLabel}>
                Address 2: <Text style={styles.asterisk}>*</Text>
              </Text>
              <TextInput
                style={styles.formInput}
                value={address2}
                onChangeText={setAddress2}
              />
            </View>
          </View>

          <View style={styles.checkboxRow}>
            <TouchableOpacity
              style={[
                styles.checkboxBox,
                termsAccepted && styles.checkboxChecked,
              ]}
              onPress={() => setTermsAccepted(!termsAccepted)}
            />
            <Text style={styles.checkboxLabelBlue}>Terms &amp; Conditions</Text>
          </View>

          <View style={styles.checkboxRow}>
            <TouchableOpacity
              style={[
                styles.checkboxBox,
                consentAccepted && styles.checkboxChecked,
              ]}
              onPress={() => setConsentAccepted(!consentAccepted)}
            />
            <Text style={styles.checkboxLabelBlue}>i consent</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => setCurrentScreen("signin")}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    );
}

export default RegisterScreen;
