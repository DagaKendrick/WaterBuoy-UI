import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Settings() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);

  // Navigation functions
  const handleAccount = () => {
    router.push("/account");
  };

  const handleLanguage = () => {
    router.push("/language");
  };

  const handlePrivacy = () => {
    router.push("/privacy");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>

        {/* Notifications */}
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="notifications-outline" size={20} color="#666" />
            <Text style={styles.rowLabel}>Notifications</Text>
          </View>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>

        {/* Account */}
        <TouchableOpacity style={styles.row} onPress={handleAccount}>
          <View style={styles.rowLeft}>
            <Ionicons name="person-outline" size={20} color="#666" />
            <Text style={styles.rowLabel}>Account</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        {/* Language */}
        <TouchableOpacity style={styles.row} onPress={handleLanguage}>
          <View style={styles.rowLeft}>
            <Ionicons name="language-outline" size={20} color="#666" />
            <Text style={styles.rowLabel}>Language</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        {/* Privacy */}
        <TouchableOpacity style={styles.row} onPress={handlePrivacy}>
          <View style={styles.rowLeft}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" />
            <Text style={styles.rowLabel}>Privacy</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", marginTop: 50 },
  title: { fontSize: 28, fontWeight: "bold", color: "#1D4ED8", marginLeft: 15 },
  section: {
    marginTop: 30,
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    backgroundColor: "#fff",
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#333", marginBottom: 15 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  rowLabel: { fontSize: 16, color: "#333" },
});
