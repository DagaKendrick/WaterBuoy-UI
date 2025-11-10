import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
export default function AnalyticsScreen() {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.title}>Analytics &{'\n'}Reports</Text>
      <Text style={styles.subtitle}>
        Comprehensive data analysis and{'\n'}environmental impact tracking
      </Text>

      {/* Date Range Button */}
      <TouchableOpacity style={styles.dateButton} activeOpacity={0.7}>
        <Ionicons name="calendar-outline" size={18} color="#374151" />
        <Text style={styles.dateButtonText}>Date Range</Text>
      </TouchableOpacity>

      {/* Cards Container */}
      <View style={styles.cardsContainer}>
        {/* Card 1: Total Waste Collected */}
        <View style={styles.card}>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Total Waste Collected</Text>
            <Text style={styles.cardValue}>24.8 tons</Text>
            <Text style={styles.cardNote}>+2 this week</Text>
          </View>
          <View style={[styles.iconContainer, { backgroundColor: '#D1FAE5' }]}>
            <MaterialCommunityIcons name="chart-bar" size={24} color="#04803A" />
          </View>
        </View>

        {/* Card 2: CO2 Emissions Prevented */}
        <View style={styles.card}>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>CO2 Emissions Prevented</Text>
            <Text style={styles.cardValue}>1.8 tons</Text>
            <Text style={[styles.cardNote, { color: '#059669' }]}>Carbon Footprint reduced</Text>
          </View>
          <View style={[styles.iconContainer, { backgroundColor: '#DBEAFE' }]}>
            <FontAwesome5 name="leaf" size={22} color="#2563EB" />
          </View>
        </View>

        {/* Card 3: Water Quality Improvement */}
        <View style={styles.card}>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Water Quality Improvement</Text>
            <Text style={styles.cardValue}>+18 %</Text>
            <Text style={[styles.cardNote, { color: '#7C3AED' }]}>Since Deployment</Text>
          </View>
          <View style={[styles.iconContainer, { backgroundColor: '#EDE9FE' }]}>
            <MaterialCommunityIcons name="water" size={26} color="#7C3AED" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#1D4ED8', // blue-800
    lineHeight: 34,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280', // gray-500
    lineHeight: 20,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#D1D5DB', // gray-300
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  dateButtonText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#374151', // gray-700
  },
  cardsContainer: {
    marginTop: 30,
    gap: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    // Elevation for Android
    elevation: 2,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151', // gray-700
  },
  cardValue: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: '700',
    color: '#111827', // gray-900
  },
  cardNote: {
    marginTop: 6,
    fontSize: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});