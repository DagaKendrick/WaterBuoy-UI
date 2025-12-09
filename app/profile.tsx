import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function ProfilePage() {
  const router = useRouter();

  const handleSignOut = async () => {
    await AsyncStorage.multiRemove([
      "isLoggedIn",
      "userData",
      "authToken",
    ]);
    router.replace("/login");
  };

  const menuItems = [
    {
      id: 1,
      title: "Message user",
      icon: "message",
      action: () => router.push("/messages"),
    },
    {
      id: 2,
      title: "Settings",
      icon: "settings",
      action: () => router.push("/settings"),
    },
    {
      id: 3,
      title: "Notifications",
      icon: "notifications",
      action: () => router.push("/notifications"),
    },
    {
      id: 4,
      title: "Data Mode",
      icon: "analytics",
      action: () => router.push("/data-mode"),
    },
    {
      id: 5,
      title: "Sign Out",
      icon: "log-out",
      action: handleSignOut,
    },
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "message":
        return <Ionicons name="chatbubble-outline" size={22} color="#666" />;
      case "settings":
        return <Ionicons name="settings-outline" size={22} color="#666" />;
      case "notifications":
        return <Ionicons name="notifications-outline" size={22} color="#666" />;
      case "analytics":
        return <Ionicons name="analytics-outline" size={22} color="#666" />;
      case "log-out":
        return <Feather name="log-out" size={22} color="#FF3B30" />;
      default:
        return <Ionicons name="help-outline" size={22} color="#666" />;
    }
  };

  return (
    <LinearGradient colors={["#ffffff", "#ffffff"]} style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.userCard}>
          <LinearGradient
            colors={["#667eea", "#764ba2"]}
            style={styles.avatarContainer}
          >
            <Text style={styles.avatarText}>AD</Text>
          </LinearGradient>
          <Text style={styles.userName}>Admin User</Text>
          <Text style={styles.userEmail}>admin@ecobouy.com</Text>
        </View>

        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Profile</Text>

          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                item.title === "Sign Out" && styles.signOutItem,
              ]}
              onPress={item.action}
            >
              <View style={styles.menuItemLeft}>
                {getIconComponent(item.icon)}
                <Text
                  style={[
                    styles.menuItemText,
                    item.title === "Sign Out" && styles.signOutText,
                  ]}
                >
                  {item.title}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={item.title === "Sign Out" ? "#FF3B30" : "#999"}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1D4ED8",
    marginLeft: 20,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  userCard: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    marginBottom: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userEmail: {
    color: "#666",
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 30,
    marginBottom: 30,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  signOutItem: {
    borderBottomWidth: 0,
    marginTop: 10,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  menuItemText: {
    fontSize: 16,
  },
  signOutText: {
    color: "#FF3B30",
  },
});
