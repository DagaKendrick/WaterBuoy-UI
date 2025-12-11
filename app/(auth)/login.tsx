import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/* =========================
   HARD-CODED ADMIN ACCOUNT
   ========================= */
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

const API_BASE_URL = 'https://citc-ustpcdo.com/api/v1/';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // toggle for password visibility

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {
      /* =========================
         ADMIN LOGIN (NO API)
         ========================= */
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        console.log("========== ADMIN LOGIN ==========");
        console.log("[ADMIN] Username:", username);
        console.log("[ADMIN] Password:", password);
        
        await AsyncStorage.multiSet([
          ["isLoggedIn", "true"],
          [
            "userData",
            JSON.stringify({
              username: "admin",
              role: "admin",
            }),
          ],
        ]);

        console.log("[ADMIN] ✅ LOGIN SUCCESSFUL!");
        router.replace("/(tabs)/home");
        return;
      }

      /* =========================
         NORMAL API LOGIN - DJOSER TOKEN AUTH
         Using: POST /auth/token/login/
         Then: GET /auth/users/me/
         ========================= */
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();
      
      // Check if input is email or ID number
      const isIdNumber = /^\d+$/.test(trimmedUsername);
      
      console.log("\n========== API LOGIN REQUEST ==========");
      console.log("[API] POST", API_BASE_URL + "auth/token/login/");
      console.log("[API] Input type:", isIdNumber ? "ID Number" : "Email");
      
      // Create axios instance
      const api = axios.create({
        baseURL: API_BASE_URL,
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      // Step 1: Login to get auth token
      let loginResponse;
      try {
        // Try with email first
        console.log("[API] Trying login with email field...");
        loginResponse = await api.post("auth/token/login/", {
          email: trimmedUsername,
          password: trimmedPassword
        });
        console.log("[API] Email login successful!");
      } catch (emailError: any) {
        console.log("[API] Email login failed, trying with id_number...");
        // Try with id_number field
        loginResponse = await api.post("auth/token/login/", {
          id_number: trimmedUsername,
          password: trimmedPassword
        });
        console.log("[API] ID number login successful!");
      }
      
      console.log("[API] Login Response Status:", loginResponse.status);
      const authTokenValue = loginResponse.data.auth_token;
      console.log("[API] Auth Token:", authTokenValue);
      
      // Step 2: Get user profile using the token
      console.log("\n[API] GET", API_BASE_URL + "auth/users/me/");
      const profileResponse = await api.get("auth/users/me/", {
        headers: {
          'Authorization': `Token ${authTokenValue}`
        }
      });
      
      console.log("[API] Profile Response Status:", profileResponse.status);
      const userData = profileResponse.data;
      
      // Log user credentials
      console.log("\n========== USER CREDENTIALS ==========");
      console.log("[USER] ID:", userData.id);
      console.log("[USER] Name:", `${userData.first_name} ${userData.last_name}`);
      console.log("[USER] Email:", userData.email);
      console.log("[USER] ID Number:", userData.id_number);
      if (userData.department) {
        console.log("[USER] Department:", userData.department.name);
      }
      console.log("==========================================");
      
      console.log("\n✅ LOGIN SUCCESSFUL!");
      console.log("Logged in as:", `${userData.first_name} ${userData.last_name}`);
      console.log("\n=== AUTH TOKEN GENERATED ===");
      console.log("Token:", authTokenValue);
      console.log("User ID:", userData.id);
      console.log("User Name:", `${userData.first_name} ${userData.last_name}`);
      console.log("User Email:", userData.email);
      console.log("Expires At:", new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString());
      
      console.log("\nFull Token Object: {");
      console.log(JSON.stringify({
        token: authTokenValue,
        user: userData,
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
      }, null, 2));
      console.log("}");

      // Store auth token and user data
      await AsyncStorage.setItem("authToken", authTokenValue);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      await AsyncStorage.setItem("isLoggedIn", "true");
      
      router.replace("/(tabs)/home");
    } catch (error: any) {
      console.log("\n❌ LOGIN FAILED");
      console.log("[ERROR] Status:", error.response?.status);
      console.log("[ERROR] Message:", error.message);
      if (error.response?.data) {
        console.log("[ERROR] Response:", JSON.stringify(error.response.data, null, 2));
      }
      
      // Handle specific error cases
      let errorMessage = "Invalid credentials. Please try again.";
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = "Request timeout - The server is taking too long to respond.";
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage = "Network error - Cannot reach server";
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data?.non_field_errors?.[0] || "Invalid credentials";
      } else if (error.response?.status === 401) {
        errorMessage = "Invalid email/ID number or password";
      } else if (error.response?.data) {
        errorMessage = error.response.data?.non_field_errors?.[0]
          || error.response.data?.message
          || error.response.data?.error
          || errorMessage;
      }
      
      Alert.alert("Login Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#ffffff", "#ffffff"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hello}>Hello</Text>
        <Text style={styles.signIn}>Sign in!</Text>
      </View>

      <View style={styles.loginCard}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username / Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username or email"
            placeholderTextColor="#999"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.inputPassword}
              placeholder="*********"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}   // toggle
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="none"
              keyboardType="default"
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />
            <TouchableOpacity
              style={styles.showButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.showButtonText}>{showPassword ? "Hide" : "Show"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "LOGGING IN..." : "SIGN IN"}
          </Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
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
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    color: "#000",
  },
  passwordWrapper: {
    position: "relative",
    width: "100%",
  },
  inputPassword: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    color: "#000",
    paddingRight: 60, // space for Show/Hide
  },
  showButton: {
    position: "absolute",
    right: 15,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  showButtonText: {
    color: "#1D4ED8",
    fontWeight: "bold",
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
    backgroundColor: "#1D4ED8",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonDisabled: {
    backgroundColor: "#8fa3d6",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
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