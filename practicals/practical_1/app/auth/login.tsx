import React, { useRef } from "react";
import {
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const width = Dimensions.get("window").width;

// image data
const data = [
  {
    image:
      "data:image/png;base64,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",
    description: "Your Gojek Account is More Secure with New Login Features",
  },
  {
    image:
      "data:image/png;base64,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",
    description: "Gojek launches rebrand to bolster super app position",
  }
];

const App = () => { // Main component
  const ref = useRef<ICarouselInstance>(null); // Reference to the carousel instance
  const progress = useSharedValue<number>(0); // Shared value for tracking the progress of the carousel
  const router = useRouter();

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.carouselContainer}>
          <Carousel
            ref={ref}
            width={width * 0.9}
            height={width / 1.5}
            data={data}
            onProgressChange={progress}
            renderItem={({ item }) => (
              <View style={styles.carouselItem}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.description}>{item.description}</Text>
              </View>
            )}
          />
          <Pagination.Basic
            progress={progress}
            data={data}
            dotStyle={styles.paginationDot}
            containerStyle={styles.paginationContainer}
            onPress={onPressPagination}
          />
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/auth/signin")}
        >
          <Text style={styles.loginButtonText}>Log in as Wangpo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => router.push("/auth/signup")}
        >
          <Text style={styles.signupButtonText}>I'm new, sign me up</Text>
        </TouchableOpacity>

        {/* Additional Text Below Buttons */}
        <Text style={styles.termsText}>
          By logging in or registering, you agree to our
          <Text style={styles.linkText}> Terms of service </Text>
          and
          <Text style={styles.linkText}> Privacy policy</Text>.
        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
 // Main component that renders the login screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  carouselContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  carouselItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
  },
  image: {
    width: "90%",
    height: "70%",
    borderRadius: 8,
    resizeMode: "cover",
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
  paginationDot: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 50,
    width: 6,
    height: 6,
  },
  paginationContainer: {
    marginTop: 10,
  },
  loginButton: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#28A745",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupButton: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "black",
  },
  signupButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  termsText: {
    marginTop: 10,
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  linkText: {
    color: "#28A745",
    fontWeight: "bold",
  },
});

export default App;
