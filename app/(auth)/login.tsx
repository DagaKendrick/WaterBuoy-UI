import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import api from "hooks/http";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }

    setLoading(true); // Start loading

    try {
      // Make API call to your login endpoint
      const response = await api.post("/login", {
        username: username, // or email depending on your API
        password: password,
      });

      // Check if login was successful based on your API response structure
      if (response.data.success || response.data.token) {
        // Store the authentication token if your API returns one
        if (response.data.token) {
          await AsyncStorage.setItem("authToken", response.data.token);
        }
        
        // Store user data if needed
        if (response.data.user) {
          await AsyncStorage.setItem("userData", JSON.stringify(response.data.user));
        }
        
        // Set login status
        await AsyncStorage.setItem("isLoggedIn", "true");
        
        // Navigate to home
        router.replace("/(tabs)/home");
      } else {
        // Handle API-specific error messages
        const errorMessage = response.data.message || "Invalid credentials";
        Alert.alert("Login Failed", errorMessage);
      }
    } catch (error: any) {
      // Handle different types of errors
      let errorMessage = "An error occurred during login";
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          errorMessage = "Invalid username or password";
        } else if (error.response.status === 400) {
          errorMessage = "Bad request. Please check your input.";
        } else if (error.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response from server. Check your connection.";
      } else {
        // Something happened in setting up the request
        errorMessage = error.message || "Network error";
      }
      
      Alert.alert("Login Error", errorMessage);
      console.error("Login error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <LinearGradient
      colors={["#ffffff", "#ffffff"]} // White background
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.hello}>Hello</Text>
        <Text style={styles.signIn}>Sign in!</Text>
      </View>

      <View style={styles.loginCard}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username / Email</Text> {/* Changed label */}
          <TextInput
            style={styles.input}
            placeholder="Enter your username or email"
            placeholderTextColor="#999"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
            editable={!loading} // Disable when loading
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="*********"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading} // Disable when loading
          />
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={loading} // Disable button when loading
        >
          <Text style={styles.buttonText}>
            {loading ? "LOGGING IN..." : "SIGN IN"}
          </Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have account? </Text>
          <TouchableOpacity>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 100,
    backgroundColor: "#fff",
  },
  header: {
    width: "85%",
    marginBottom: 50,
  },
  hello: {
    fontSize: 40,
    fontWeight: "normal",
    color: "#1D4ED8",
    marginBottom: 5,
  },
  signIn: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#1D4ED8",
  },
  loginCard: {
    width: "85%",
    backgroundColor: "transparent",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    width: "100%",
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    color: "#000",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#666",
  },
  button: {
    width: "100%",
    backgroundColor: "#1D4ED8",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonDisabled: {
    backgroundColor: "#8fa3d6", // Lighter blue when disabled
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    color: "#666",
  },
  signupLink: {
    fontSize: 14,
    color: "#1D4ED8",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});