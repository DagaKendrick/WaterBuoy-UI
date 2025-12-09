import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';

export default function EcoBuoyDashboard() {
  
  const activeBuoys = Math.floor(Math.random() * 10) + 5; 
  const trashCollectedTotal = (Math.random() * 5000 + 500).toFixed(1); 
  const alertsCount = Math.floor(Math.random() * 5); 
  const newAlerts = Math.floor(Math.random() * 3); 
  const collectionToday = (Math.random() * 500 + 50).toFixed(0); 

  // Trash categories with random percentages
  const categories = ['Plastic', 'Metal Cans', 'Textiles', 'Rubber', 'Paper'];
  const normalizedPercentages = categories.map(() => Math.floor(Math.random() * 100));

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.contentContainer, { paddingBottom: 80 }]}
    >
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
        <Link href="/(tabs)/BuoyMap" asChild>
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Active Buoys</Text>
              <Text style={styles.cardValue}>{activeBuoys}</Text>
              <View style={styles.cardNoteRow}>
                <MaterialCommunityIcons name="wave" size={12} color="#6B7280" />
                <Text style={styles.cardNote}>+{Math.floor(Math.random() * 5)} this week</Text>
              </View>
            </View>
            <MaterialCommunityIcons name="waves" size={28} color="#2563EB" />
          </TouchableOpacity>
        </Link>

        {/* Trash Collected Card */}
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.cardTitle}>Trash Collected</Text>
              <MaterialIcons name="delete-outline" size={28} color="#22C55E" />
            </View>
            <Text style={styles.cardValue}>{trashCollectedTotal} kg</Text>
            <View style={styles.cardNoteRow}>
              <MaterialCommunityIcons name="wave" size={12} color="#6B7280" />
              <Text style={styles.cardNote}>+{Math.floor(Math.random() * 500)}kg today</Text>
            </View>

            {/* Trash Category Breakdown */}
            <View style={{ marginTop: 10 }}>
              {categories.map((cat, index) => (
                <View key={cat} style={styles.categoryRow}>
                  <Text style={styles.categoryLabel}>{cat}</Text>
                  <Text style={styles.categoryValue}>{normalizedPercentages[index]}%</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Alerts Card */}
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Alerts</Text>
            <Text style={styles.cardValue}>{alertsCount}</Text>
            <View style={styles.cardNoteRow}>
              <MaterialCommunityIcons name="wave" size={12} color="#6B7280" />
              <Text style={[styles.cardNote, { color: '#EF4444' }]}>+{newAlerts} critical</Text>
            </View>
          </View>
          <Entypo name="warning" size={28} color="#EF4444" />
        </View>
      </View>

      {/* Active Alerts Section */}
      <View style={styles.alertsContainer}>
        <View style={styles.alertsHeader}>
          <Entypo name="warning" size={18} color="#DC2626" />
          <Text style={styles.alertsTitle}> Active Alerts</Text>
        </View>

        <View style={[styles.alertCard, styles.alertYellow]}>
          <MaterialIcons name="error-outline" size={16} color="#B45309" />
          <View style={styles.alertTextContainer}>
            <Text style={styles.alertTitleYellow}>High Turbidity Detected</Text>
            <Text style={styles.alertDescription}>Buoy #2 (East Coast Park) showing elevated turbidity levels</Text>
            <Text style={styles.alertTime}>5 minutes ago</Text>
          </View>
        </View>

        <View style={[styles.alertCard, styles.alertRed]}>
          <MaterialIcons name="error-outline" size={16} color="#B91C1C" />
          <View style={styles.alertTextContainer}>
            <Text style={styles.alertTitleRed}>Buoy Full - Maintenance Required</Text>
            <Text style={styles.alertDescription}>Buoy #3 (Sentosa Cove) has reached maximum capacity</Text>
            <Text style={styles.alertTime}>2 minutes ago</Text>
          </View>
        </View>

        <View style={[styles.alertCard, styles.alertGreen]}>
          <MaterialIcons name="check-circle-outline" size={16} color="#15803D" />
          <View style={styles.alertTextContainer}>
            <Text style={styles.alertTitleGreen}>System Operational</Text>
            <Text style={styles.alertDescription}>All other buoys operating within normal parameters</Text>
            <Text style={styles.alertTime}>Just now</Text>
          </View>
        </View>
      </View>

      {/* Collection Efficiency Section */}
      <View style={styles.collectionContainer}>
        <Text style={styles.collectionTitle}>Collection Efficiency</Text>
        <View style={styles.collectionRow}>
          <Text style={styles.collectionLabel}>Today</Text>
          <Text style={styles.collectionValue}>{collectionToday}kg</Text>
        </View>
        <View style={styles.collectionBarBackground}>
          <View style={[styles.collectionBarFill, { width: `${Math.floor(Math.random() * 100)}%` }]} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  contentContainer: { padding: 24 },
  title: { fontSize: 34, fontWeight: '800', color: '#1D4ED8', lineHeight: 40 },
  subtitle: { marginTop: 6, fontSize: 14, color: '#6B7280', lineHeight: 20 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCFCE7', alignSelf: 'flex-start', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12, marginTop: 16 },
  statusText: { marginLeft: 6, fontSize: 13, color: '#16A34A', fontWeight: '600' },
  cardsContainer: { marginTop: 32, gap: 24 },
  card: { backgroundColor: '#FFFFFF', paddingVertical: 20, paddingHorizontal: 24, borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 7, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 14, fontWeight: '600', color: '#374151' },
  cardValue: { marginTop: 6, fontSize: 24, fontWeight: '700', color: '#111827' },
  cardNoteRow: { marginTop: 6, flexDirection: 'row', alignItems: 'center' },
  cardNote: { marginLeft: 6, fontSize: 12, color: '#6B7280' },
  categoryRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 },
  categoryLabel: { fontSize: 12, color: '#374151' },
  categoryValue: { fontSize: 12, fontWeight: '700', color: '#111827' },
  alertsContainer: { marginTop: 40, backgroundColor: '#fff', borderRadius: 16, padding: 16, elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4 },
  alertsHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  alertsTitle: { fontSize: 16, fontWeight: '600', color: '#374151', marginLeft: 6 },
  alertCard: { padding: 12, borderRadius: 8, flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  alertTextContainer: { marginLeft: 8, flex: 1 },
  alertTitleYellow: { fontSize: 14, fontWeight: '700', color: '#B45309' },
  alertTitleRed: { fontSize: 14, fontWeight: '700', color: '#B91C1C' },
  alertTitleGreen: { fontSize: 14, fontWeight: '700', color: '#15803D' },
  alertDescription: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  alertTime: { fontSize: 10, color: '#9CA3AF', marginTop: 4 },
  alertYellow: { backgroundColor: '#FEF3C7' },
  alertRed: { backgroundColor: '#FEE2E2' },
  alertGreen: { backgroundColor: '#DCFCE7' },
  collectionContainer: { marginTop: 32, backgroundColor: '#fff', borderRadius: 16, padding: 16, elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4 },
  collectionTitle: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 12 },
  collectionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  collectionLabel: { fontSize: 14, color: '#374151' },
  collectionValue: { fontSize: 14, fontWeight: '700', color: '#111827' },
  collectionBarBackground: { height: 10, backgroundColor: '#E5E7EB', borderRadius: 5 },
  collectionBarFill: { height: '100%', backgroundColor: '#22C55E', borderRadius: 5 },
});
