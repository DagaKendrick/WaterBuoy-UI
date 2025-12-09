import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const languages = ["English", "Spanish", "French", "German", "Chinese"];

export default function Language() {
  const router = useRouter();
  const [selected, setSelected] = useState("English");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language Settings</Text>
      </View>

      {languages.map((lang) => (
        <TouchableOpacity
          key={lang}
          style={[styles.option, selected === lang && styles.selectedOption]}
          onPress={() => setSelected(lang)}
        >
          <Text style={[styles.optionText, selected === lang && styles.selectedText]}>{lang}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  headerTitle: { fontSize: 24, fontWeight: "bold", marginLeft: 15, color: "#1D4ED8" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, color: "#1D4ED8" },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedOption: { backgroundColor: "#1D4ED8", borderColor: "#1D4ED8" },
  optionText: { fontSize: 16, color: "#333" },
  selectedText: { color: "#fff", fontWeight: "bold" },
});
