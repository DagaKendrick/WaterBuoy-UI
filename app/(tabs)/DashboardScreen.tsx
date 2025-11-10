import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

export default function EcoBuoyDashboard() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>EcoBuoy{'\n'}Dashboard</Text>
      <Text style={styles.subtitle}>
        Real-time monitoring of{'\n'}your smart floating trash traps
      </Text>

      {/* System Active Badge */}
      <View style={styles.statusBadge}>
        <MaterialIcons name="check-circle" size={16} color="#22C55E" />
        <Text style={styles.statusText}>System Active</Text>
      </View>

      {/* Cards */}
      <View style={styles.cardsContainer}>
        {/* Active Buoys Card */}
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Active Buoys</Text>
            <Text style={styles.cardValue}>15</Text>
            <View style={styles.cardNoteRow}>
              <MaterialCommunityIcons name="wave" size={12} color="#6B7280" />
              <Text style={styles.cardNote}>+2 this week</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="waves" size={28} color="#2563EB" />
        </View>

        {/* Trash Collected Card */}
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Trash Collected</Text>
            <Text style={styles.cardValue}>2.5k kg</Text>
            <View style={styles.cardNoteRow}>
              <MaterialCommunityIcons name="wave" size={12} color="#6B7280" />
              <Text style={styles.cardNote}>+340kg today</Text>
            </View>
          </View>
          <MaterialIcons name="delete-outline" size={28} color="#22C55E" />
        </View>

        {/* Alerts Card */}
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Alerts</Text>
            <Text style={styles.cardValue}>2</Text>
            <View style={styles.cardNoteRow}>
              <MaterialCommunityIcons name="wave" size={12} color="#6B7280" />
              <Text style={[styles.cardNote, { color: '#EF4444' }]}>+1 critical</Text>
            </View>
          </View>
          <Entypo name="warning" size={28} color="#EF4444" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1D4ED8', // blue-700
    lineHeight: 40,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280', // gray-500
    lineHeight: 20,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7', // green-100
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  statusText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#16A34A', // green-600
    fontWeight: '600',
  },
  cardsContainer: {
    marginTop: 32,
    gap: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // Shadow iOS
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 4 },
    // Elevation Android
    elevation: 3,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151', // gray-700
  },
  cardValue: {
    marginTop: 6,
    fontSize: 24,
    fontWeight: '700',
    color: '#111827', // gray-900
  },
  cardNoteRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardNote: {
    marginLeft: 6,
    fontSize: 12,
    color: '#6B7280', // gray-500
  },
});
