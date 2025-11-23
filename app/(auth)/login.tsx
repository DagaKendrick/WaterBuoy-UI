import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }

    // Hardcoded credentials
    const validUsername = "admin";
    const validPassword = "12345";

    if (username === validUsername && password === validPassword) {
      await AsyncStorage.setItem("isLoggedIn", "true");
      router.replace("/(tabs)/home"); // navigate without back button
    } else {
      Alert.alert("Invalid Credentials", "Username or password is incorrect.");
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
          <Text style={styles.inputLabel}>Gmail</Text>
          <TextInput
            style={styles.input}
            placeholder="Joyelee@gmail.com"
            placeholderTextColor="#999"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
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
          />
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>SIGN IN</Text>
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