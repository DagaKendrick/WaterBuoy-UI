import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

// Define TypeScript interfaces
interface AnalyticsData {
  wasteCollected: string;
  co2Prevented: string;
  waterQuality: string;
}

interface SampleData {
  [key: string]: AnalyticsData;
}

const sampleData: SampleData = {
  '2024-01-15': { wasteCollected: '24.8 tons', co2Prevented: '1.8 tons', waterQuality: '+18%' },
  '2024-01-14': { wasteCollected: '22.5 tons', co2Prevented: '1.6 tons', waterQuality: '+16%' },
  '2024-01-13': { wasteCollected: '20.1 tons', co2Prevented: '1.4 tons', waterQuality: '+15%' },
  '2024-01-12': { wasteCollected: '18.7 tons', co2Prevented: '1.3 tons', waterQuality: '+14%' }
};

export default function AnalyticsScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const formatDate = (date: Date) => date.toISOString().split('T')[0]; // YYYY-MM-DD

  const getCurrentData = (): AnalyticsData => {
    const dateKey = formatDate(selectedDate);
    const randomWaste = (Math.random() * 30 + 10).toFixed(1) + ' tons'; // 10–40 tons
    const randomCO2 = (Math.random() * 3).toFixed(1) + ' tons'; // 0–3 tons
    const randomWater = '+' + (Math.random() * 25).toFixed(0) + '%'; // 0–25%

    return sampleData[dateKey] || {
      wasteCollected: randomWaste,
      co2Prevented: randomCO2,
      waterQuality: randomWater,
    };
  };

  const onDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setShowCalendar(false);
    }
  };

  const handleDateSelect = (daysAgo: number) => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - daysAgo);
    setSelectedDate(newDate);
    setShowCalendar(false);
  };

  const handlePickSpecificDate = () => {
    setShowCalendar(false);
    setTimeout(() => setShowDatePicker(true), 100);
  };

  const currentData = getCurrentData();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Analytics &{'\n'}Reports</Text>
      <Text style={styles.subtitle}>
        Comprehensive data analysis and{'\n'}environmental impact tracking
      </Text>

      {/* Date Range Button */}
      <TouchableOpacity 
        style={styles.dateButton} 
        activeOpacity={0.7}
        onPress={() => setShowCalendar(true)}
      >
        <Ionicons name="calendar-outline" size={18} color="#374151" />
        <Text style={styles.dateButtonText}>
          {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </Text>
      </TouchableOpacity>

      {/* Cards */}
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Total Waste Collected</Text>
            <Text style={styles.cardValue}>{currentData.wasteCollected}</Text>
            <Text style={styles.cardNote}>
              {selectedDate.toDateString() === new Date().toDateString() ? '+2 this week' : 'Historical data'}
            </Text>
          </View>
          <View style={[styles.iconContainer, { backgroundColor: '#D1FAE5' }]}>
            <MaterialCommunityIcons name="chart-bar" size={24} color="#04803A" />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>CO2 Emissions Prevented</Text>
            <Text style={styles.cardValue}>{currentData.co2Prevented}</Text>
            <Text style={[styles.cardNote, { color: '#059669' }]}>
              {selectedDate.toDateString() === new Date().toDateString() ? 'Carbon Footprint reduced' : 'Historical impact'}
            </Text>
          </View>
          <View style={[styles.iconContainer, { backgroundColor: '#DBEAFE' }]}>
            <FontAwesome5 name="leaf" size={22} color="#2563EB" />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Water Quality Improvement</Text>
            <Text style={styles.cardValue}>{currentData.waterQuality}</Text>
            <Text style={[styles.cardNote, { color: '#7C3AED' }]}>
              {selectedDate.toDateString() === new Date().toDateString() ? 'Since Deployment' : 'On selected date'}
            </Text>
          </View>
          <View style={[styles.iconContainer, { backgroundColor: '#EDE9FE' }]}>
            <MaterialCommunityIcons name="water" size={26} color="#7C3AED" />
          </View>
        </View>
      </View>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date()}
        />
      )}

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Date</Text>
            
            <TouchableOpacity style={styles.dateOption} onPress={handlePickSpecificDate}>
              <Ionicons name="calendar" size={20} color="#2563EB" />
              <Text style={styles.dateOptionText}>Pick specific date</Text>
            </TouchableOpacity>

            <ScrollView style={styles.quickDatesContainer}>
              <Text style={styles.quickDatesTitle}>Quick Select</Text>
              
              <TouchableOpacity style={styles.quickDateOption} onPress={() => handleDateSelect(0)}>
                <Text style={styles.quickDateText}>Today</Text>
                <Text style={styles.quickDateSubtext}>{new Date().toLocaleDateString()}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickDateOption} onPress={() => handleDateSelect(1)}>
                <Text style={styles.quickDateText}>Yesterday</Text>
                <Text style={styles.quickDateSubtext}>{new Date(Date.now() - 86400000).toLocaleDateString()}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickDateOption} onPress={() => handleDateSelect(7)}>
                <Text style={styles.quickDateText}>Last Week</Text>
                <Text style={styles.quickDateSubtext}>7 days ago</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickDateOption} onPress={() => handleDateSelect(30)}>
                <Text style={styles.quickDateText}>Last Month</Text>
                <Text style={styles.quickDateSubtext}>30 days ago</Text>
              </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity style={styles.closeButton} onPress={() => setShowCalendar(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', paddingHorizontal: 20, paddingTop: 50 },
  title: { fontSize: 34, fontWeight: '700', color: '#1D4ED8', lineHeight: 34 },
  subtitle: { marginTop: 6, fontSize: 14, color: '#6B7280', lineHeight: 20 },
  dateButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 14, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, alignSelf: 'flex-start', marginTop: 20 },
  dateButtonText: { marginLeft: 6, fontSize: 14, color: '#374151' },
  cardsContainer: { marginTop: 30, gap: 20 },
  card: { backgroundColor: '#FFFFFF', paddingVertical: 18, paddingHorizontal: 20, borderRadius: 16, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 14, fontWeight: '600', color: '#374151' },
  cardValue: { marginTop: 4, fontSize: 20, fontWeight: '700', color: '#111827' },
  cardNote: { marginTop: 6, fontSize: 12 },
  iconContainer: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: 'white', borderRadius: 20, padding: 20, width: '85%', maxHeight: '70%' },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#1F2937', textAlign: 'center', marginBottom: 20 },
  dateOption: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#F3F4F6', borderRadius: 12, marginBottom: 16 },
  dateOptionText: { marginLeft: 12, fontSize: 16, color: '#374151', fontWeight: '600' },
  quickDatesContainer: { maxHeight: 200 },
  quickDatesTitle: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 12 },
  quickDateOption: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  quickDateText: { fontSize: 16, fontWeight: '600', color: '#111827' },
  quickDateSubtext: { fontSize: 14, color: '#6B7280', marginTop: 2 },
  closeButton: { backgroundColor: '#2563EB', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  closeButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
