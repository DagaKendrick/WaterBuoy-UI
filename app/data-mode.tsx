import { View, Text, StyleSheet } from "react-native";

export default function DataMode() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Mode</Text>
      <Text style={styles.text}>
        Analytics, logs, and system-level data controls will be available here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
