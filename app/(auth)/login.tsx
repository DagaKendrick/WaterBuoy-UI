import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

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
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 30 },
  title: { fontSize: 32, fontWeight: "700", textAlign: "center", marginBottom: 30 },
  input: { backgroundColor: "#FFF", padding: 14, borderRadius: 10, marginBottom: 10 },
  button: { backgroundColor: "#3A6FF8", padding: 14, borderRadius: 10, marginTop: 10 },
  buttonText: { color: "#FFF", textAlign: "center", fontWeight: "600", fontSize: 16 }
});
