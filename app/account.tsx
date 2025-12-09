import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Account() {
  const router = useRouter();

  // Sample user data; in a real app, you'd fetch this from your backend or state
  const user = {
    profilePicture: "https://via.placeholder.com/100",
    fullName: "Henz Abcede",
    username: "henz.abcede",
    email: "henz.abcede@ecobouy.com",
    phone: "+63 912 345 6789",
    address: "Barra Dike, Cagayan de Oro City, Philippines",
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Profile</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{user.fullName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.value}>{user.username}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{user.phone}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>{user.address}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, backgroundColor: "#f2f4f8" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  headerTitle: { fontSize: 24, fontWeight: "bold", marginLeft: 15, color: "#1D4ED8" },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    elevation: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 25,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: { fontSize: 16, fontWeight: "600", color: "#333" },
  value: { fontSize: 16, color: "#666", maxWidth: "60%", textAlign: "right" },
});
