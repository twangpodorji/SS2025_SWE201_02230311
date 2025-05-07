import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";

const SignUp = () => {
  const router = useRouter(); // Use Expo Router's `useRouter` hook
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>("ID");
  const [callingCode, setCallingCode] = useState("62");
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  const onSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setCountryPickerVisible(false);
  };

  const handleContinue = () => {
    if (phoneNumber.length < 8) {
      alert("Please enter a valid phone number");
      return;
    }

    // Log navigation info for debugging
    console.log("Navigating to verification with:", {
      phone: phoneNumber,
      countryCode: callingCode,
    });

    // Try a simpler navigation approach
    try {
      router.push({
        pathname: "/auth/verification",
        params: { phone: phoneNumber, countryCode: callingCode },
      });
    } catch (error) {
      console.error("Navigation error:", error);
      alert("Navigation error: " + JSON.stringify(error));
    }
  };

  const isPhoneNumberValid = phoneNumber.length >= 8;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Gojek!</Text>
        <Text style={styles.subtitle}>
          Enter or create an account in a few easy steps.
        </Text>

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>
            Phone number <Text style={styles.required}>*</Text>
          </Text>

          <View style={styles.phoneInputContainer}>
            <TouchableOpacity
              style={styles.countrySelector}
              onPress={() => setCountryPickerVisible(true)}
            >
              <CountryPicker
                countryCode={countryCode}
                withFilter
                withFlag
                withCallingCode
                withCallingCodeButton
                visible={countryPickerVisible}
                onSelect={onSelectCountry}
                onClose={() => setCountryPickerVisible(false)}
                containerButtonStyle={styles.countryPickerButton}
              />
            </TouchableOpacity>

            <TextInput
              style={styles.phoneInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="8xx-xxx-xxx"
              keyboardType="phone-pad"
              placeholderTextColor="#aaa"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            isPhoneNumberValid ? styles.continueButtonActive : null,
          ]}
          onPress={() => router.push("/auth/verification")}
          disabled={!isPhoneNumberValid}
        >
          <Text
            style={[
              styles.continueButtonText,
              isPhoneNumberValid ? styles.continueButtonTextActive : null,
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By signing up, you agree to our
          <Text style={styles.linkText}> Terms of Service </Text>
          and
          <Text style={styles.linkText}> Privacy Policy</Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 20 : 0,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: "#28A745",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 28,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  required: {
    color: "red",
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
    padding: 8,
  },
  countryPickerButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneInput: {
    flex: 1,
    height: 48,
    fontSize: 18,
    color: "#333",
  },
  continueButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  continueButtonActive: {
    backgroundColor: "#28A745", // Gojek green
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#888",
  },
  continueButtonTextActive: {
    color: "#fff",
  },
  termsText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  linkText: {
    color: "#28A745",
    fontWeight: "bold",
  },
});

export default SignUp;
