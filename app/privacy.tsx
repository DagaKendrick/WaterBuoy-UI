import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Privacy() {
  const router = useRouter();
  const [shareLocation, setShareLocation] = useState(false);
  const [showProfile, setShowProfile] = useState(true);
  const [adPersonalization, setAdPersonalization] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Settings</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Share Location</Text>
        <Switch value={shareLocation} onValueChange={setShareLocation} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Show Profile to Others</Text>
        <Switch value={showProfile} onValueChange={setShowProfile} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Ad Personalization</Text>
        <Switch value={adPersonalization} onValueChange={setAdPersonalization} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  headerTitle: { fontSize: 24, fontWeight: "bold", marginLeft: 15, color: "#1D4ED8" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, color: "#1D4ED8" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: { fontSize: 16, color: "#333" },
});
