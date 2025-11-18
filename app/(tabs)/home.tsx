import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function EcoBouyApp() {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Notification Icon */}
      <TouchableOpacity style={styles.notificationIcon} onPress={() => setModalVisible(true)}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3602/3602145.png' }} style={styles.bellIcon} />
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>2</Text>
        </View>
      </TouchableOpacity>
            <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Android back button closes modal
      >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Notifications</Text>
            <Text>You have 2 new notifications.</Text>
            {/* Add your notification details or list here */}
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Live Dashboard Button */}
      <TouchableOpacity style={styles.dashboardButton} onPress={() => router.push('/(tabs)/dashboard')}>
        
        <LinearGradient
          colors={['#83d475', '#2ded2d']} // Example gradient colors
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <Text style={styles.dashboardButtonText}>View Live Dashboard</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* EcoBouy Logo and Text */}
      <View style={styles.logoContainer}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3067/3067850.png' }} style={styles.ecoBouyLogo} />
        <Text style={styles.ecoBouyText}>EcoBouy</Text>
      </View>
      <Text style={styles.tagline}>Smart Floating Trash Trap with IOT Monitoring</Text>

      {/* Main Content Card */}
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1549725969-92d52cfc2162?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dW5kZXJ3YXRlciUyMGRpdmVyfGVufDB8fDB8fHww&w=1000&q=80' }} // Replace with your image
          style={styles.cardImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.overlay}
        >
          <Text style={styles.cardTitle}>Protecting Our Waterways</Text>
          <Text style={styles.cardSubtitle}>
            Advanced IoT Technology for smarter ocean cleanups
          </Text>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    alignItems: 'center',
    paddingTop: 50,
  },
  notificationIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
  },
  bellIcon: {
    width: 24,
    height: 24,
    tintColor: '#4f4f4f',
  },
  notificationBadge: {
    backgroundColor: 'red',
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -5,
    right: -5,
  },
  notificationText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2193B0',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dashboardButton: {
    marginTop: 30,
    width: '80%',
    borderRadius: 25,
    overflow: 'hidden', // Required for LinearGradient to respect borderRadius
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashboardButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  ecoBouyLogo: {
    width: 40,
    height: 40,
    tintColor: '#2193B0',
    marginRight: 10,
  },
  ecoBouyText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  tagline: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  card: {
    width: '90%',
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'white',
  },
});