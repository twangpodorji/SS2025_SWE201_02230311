import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function App() { 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;


  const images = [
    require("@/assets/images/favicon.png"),
    require("@/assets/images/icon.png"),
    require("@/assets/images/react-logo.png"),
  ];


  const swapImage = () => {
    translateX.setValue(0);

    Animated.timing(translateX, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      translateX.setValue(300);
      Animated.timing(translateX, {
        toValue: 0, 
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };
  useEffect(() => {
    const interval = setInterval(swapImage, 2000);
    return () => clearInterval(interval); 
  }, []);

  const renderPaginationDots = () => {
    return (
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentImageIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <LinearGradient colors={["#e6ffe6", "#ffffff"]} style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.illustrationContainer}>
            <View style={styles.purpleCard}>
              <Animated.Image
                source={images[currentImageIndex]}
                style={[
                  styles.carouselImage,
                  { transform: [{ translateX: translateX }] },
                ]}
                resizeMode="contain"
              />
            </View>
            {renderPaginationDots()}
          </View>

          <View style={styles.brandContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require("@/assets/images/logo.png")}
                style={styles.logoImage}
              />
              <Text style={styles.logoText}>gojek</Text>
            </View>

            <Text style={styles.welcomeText}>Welcome, Wangpo!</Text>
            <Text style={styles.descriptionText}>
              Discover a hassle-free life with the super app for all your needs.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Login as Wangpo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>
                Login with phone number
              </Text>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              By logging in or registering, you agree to our{" "}
              <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  purpleCard: {
    width: 280,
    height: 140,
    backgroundColor: "#7d4cbb",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden", 
  },
  carouselImage: {
    width: 200,
    height: 120,
  },
  paginationContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#7d4cbb",
  },
  brandContainer: {
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  logoImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  logoText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 18,
    color: "#666",
    lineHeight: 26,
  },
  buttonContainer: {
    width: "100%",
  },
  primaryButton: {
    backgroundColor: "#00AA13",
    borderRadius: 30,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 30,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  secondaryButtonText: {
    color: "#00AA13",
    fontSize: 18,
    fontWeight: "500",
  },
  termsText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    lineHeight: 20,
  },
  termsLink: {
    color: "#00AA13",
    fontWeight: "500",
  },
});
