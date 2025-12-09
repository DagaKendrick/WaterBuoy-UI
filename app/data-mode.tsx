import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function DataMode() {
  const router = useRouter();
  const [lowData, setLowData] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Data Mode</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="cellular-outline" size={22} color="#666" />
          <Text style={styles.label}>Low Data Mode</Text>
          <Switch value={lowData} onValueChange={setLowData} />
        </View>

        <Text style={styles.desc}>
          Limits background sync, reduces data usage, and delays large updates.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24 },
  header: { flexDirection: "row", alignItems: "center", marginTop: 50 },
  title: { fontSize: 28, fontWeight: "bold", color: "#1D4ED8", marginLeft: 15 },
  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    elevation: 5,
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: { fontSize: 16, fontWeight: "600", color: "#333", marginLeft: -70 },
  desc: { fontSize: 14, color: "#666", marginTop: 20, lineHeight: 20 },
});
