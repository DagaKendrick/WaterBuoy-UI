import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Messages() {
  const router = useRouter();

  const messages = [
  { id: "1", name: "Vince Simon Pejana", last: "Boi, may update naba sa buoy?" },
  { id: "4", name: "Maria Vistal", last: "Kumusta bb?" },
  { id: "5", name: "Von Dexter Yecyec", last: "I sent the report, paki check." },
  { id: "6", name: "Negan Smith", last: "You need my DNA" },
  { id: "3", name: "Tech Support", last: "Logs received." },
  { id: "2", name: "Admin", last: "Your account was verified." },
];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Messages</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Ionicons name="chatbubble-outline" size={24} color="#1D4ED8" />
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.last}>{item.last}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24 },
  header: { flexDirection: "row", alignItems: "center", marginTop: 50 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1D4ED8",
    marginLeft: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
  },
  name: { fontSize: 16, fontWeight: "600", color: "#333" },
  last: { fontSize: 13, color: "#666", marginTop: 3 },
});

