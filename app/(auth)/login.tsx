import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import api from "hooks/http";
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

        router.replace("/(tabs)/home");
        return;
      }

      /* =========================
         NORMAL API LOGIN (LATER)
         ========================= */
      const response = await api.post("/login", {
        username,
        password,
      });

      if (response.data?.success || response.data?.token) {
        if (response.data.token) {
          await AsyncStorage.setItem("authToken", response.data.token);
        }

        if (response.data.user) {
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify(response.data.user)
          );
        }

        await AsyncStorage.setItem("isLoggedIn", "true");
        router.replace("/(tabs)/home");
      } else {
        Alert.alert("Login Failed", "Invalid credentials");
      }
    } catch (error) {
      Alert.alert(
        "Login Error",
        "API unavailable. Use the admin account for now."
      );
      console.error("Login error:", error);
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
