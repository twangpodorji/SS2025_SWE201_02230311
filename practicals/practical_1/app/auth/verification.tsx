import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function VerificationMethodScreen() {
  const params = useLocalSearchParams();
  const { phone, countryCode } = params;

  const handleMethodSelect = (method: string) => {
    router.push({
      pathname: "/auth/otp",
      params: { phone, countryCode, method },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Choose verification method</Text>

        <TouchableOpacity
          style={styles.methodCard}
          onPress={() => handleMethodSelect("email")}
        >
          <Ionicons
            name="mail"
            size={24}
            color="#00AA13"
            style={styles.methodIcon}
          />
          <Text style={styles.methodText}>OTP via Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.methodCard}
          onPress={() => handleMethodSelect("sms")}
        >
          <Ionicons
            name="chatbubble"
            size={24}
            color="#FF9500"
            style={styles.methodIcon}
          />
          <Text style={styles.methodText}>OTP via SMS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.methodCard}
          onPress={() => handleMethodSelect("whatsapp")}
        >
          <Ionicons
            name="logo-whatsapp"
            size={24}
            color="#25D366"
            style={styles.methodIcon}
          />
          <Text style={styles.methodText}>OTP via WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 20 : 0,
    height: 56,
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 28,
  },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  methodIcon: {
    marginRight: 16,
  },
  methodText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});
