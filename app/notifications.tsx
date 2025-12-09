import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Notifications() {
  const router = useRouter();

  const notifications = [
    { id: "1", text: "Bouy 12 reported abnormal readings." },
    { id: "2", text: "Firmware v2.1 installed successfully." },
    { id: "3", text: "New data logs are available." },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Ionicons name="notifications-outline" size={24} color="#1D4ED8" />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24 },
  header: { flexDirection: "row", alignItems: "center", marginTop: 50 },
  title: { fontSize: 28, fontWeight: "bold", color: "#1D4ED8", marginLeft: 15 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
  },
  text: { marginLeft: 15, fontSize: 15, color: "#333", flex: 1 },
});
