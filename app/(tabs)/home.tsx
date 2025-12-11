import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Modal, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TrashCardImage from '../../assets/images/favicon.png';




export default function EcoBouyApp() {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState('User');
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'High Trash Level Detected',
      message: 'Buoy #3 has reached 85% capacity',
      time: '5 min ago',
      type: 'warning',
      read: false,
    },
    {
      id: '2',
      title: 'Maintenance Complete',
      message: 'Buoy #1 maintenance successfully completed',
      time: '1 hour ago',
      type: 'success',
      read: false,
    },
    {
      id: '3',
      title: 'System Update',
      message: 'New firmware available for all devices',
      time: '3 hours ago',
      type: 'info',
      read: true,
    },
  ]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
        setUserName(fullName || user.name || user.email || 'User');
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUserData();
    setRefreshing(false);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const getUnreadCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return { name: 'alert-circle', color: '#FF9500' };
      case 'success':
        return { name: 'checkmark-circle', color: '#34C759' };
      case 'info':
        return { name: 'information-circle', color: '#007AFF' };
      default:
        return { name: 'notifications', color: '#666' };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          {/* Header with Icons */}
          <View style={styles.headerIcons}>
            <TouchableOpacity 
              style={styles.notificationIconContainer} 
              activeOpacity={0.7}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                setModalVisible(true);
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="notifications-outline" size={24} color="#1D4ED8" />
              {getUnreadCount() > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationText}>{getUnreadCount()}</Text>
                </View>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.profileIconContainer} 
              onPress={() => router.push('/profile')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="person-outline" size={24} color="#1D4ED8" />
            </TouchableOpacity>
          </View>

          {/* Enhanced Notification Modal - Floating */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableOpacity 
              style={styles.modalOverlay} 
              activeOpacity={1}
              onPress={() => setModalVisible(false)}
            >
              <TouchableOpacity 
                style={styles.notificationModal}
                activeOpacity={1}
                onPress={(e) => e.stopPropagation()}
              >
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Notifications</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>
                
                {getUnreadCount() > 0 && (
                  <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
                    <Text style={styles.markAllText}>Mark all as read</Text>
                  </TouchableOpacity>
                )}

                <FlatList
                  data={notifications}
                  keyExtractor={(item) => item.id}
                  style={styles.notificationList}
                  renderItem={({ item }) => {
                    const icon = getNotificationIcon(item.type);
                    return (
                      <TouchableOpacity
                        style={[
                          styles.notificationItem,
                          !item.read && styles.unreadNotification,
                        ]}
                        onPress={() => markAsRead(item.id)}
                      >
                        <View style={[styles.notificationIconBg, { backgroundColor: icon.color + '20' }]}>
                          <Ionicons name={icon.name as any} size={24} color={icon.color} />
                        </View>
                        <View style={styles.notificationContent}>
                          <Text style={styles.notificationTitle}>{item.title}</Text>
                          <Text style={styles.notificationMessage}>{item.message}</Text>
                          <Text style={styles.notificationTime}>{item.time}</Text>
                        </View>
                        {!item.read && <View style={styles.unreadDot} />}
                      </TouchableOpacity>
                    );
                  }}
                  ListEmptyComponent={
                    <View style={styles.emptyNotifications}>
                      <Ionicons name="notifications-off-outline" size={48} color="#ccc" />
                      <Text style={styles.emptyText}>No notifications</Text>
                    </View>
                  }
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>


          {/* Welcome Message */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.welcomeName}>{userName}</Text>
          </View>

          {/* Quick Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <LinearGradient colors={['#667eea', '#081c8dff']} style={styles.statGradient}>
                <MaterialCommunityIcons name="lifebuoy" size={32} color="#fff" />
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Active Buoys</Text>
              </LinearGradient>
            </View>
            
            <View style={styles.statCard}>
              <LinearGradient colors={['#667eea', '#081c8dff']} style={styles.statGradient}>
                <Ionicons name="trash-bin" size={32} color="#fff" />
                <Text style={styles.statNumber}>847kg</Text>
                <Text style={styles.statLabel}>Trash Collected</Text>
              </LinearGradient>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <LinearGradient colors={['#667eea', '#081c8dff']} style={styles.statGradient}>
                <Ionicons name="water" size={32} color="#fff" />
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statLabel}>Locations</Text>
              </LinearGradient>
            </View>
            
            <View style={styles.statCard}>
              <LinearGradient colors={['#667eea', '#081c8dff']} style={styles.statGradient}>
                <Ionicons name="checkmark-circle" size={32} color="#fff" />
                <Text style={styles.statNumber}>98%</Text>
                <Text style={styles.statLabel}>Efficiency</Text>
              </LinearGradient>
            </View>
          </View>

          

          {/* Featured Card */}
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <View style={styles.card}>
              <Image
                source={TrashCardImage}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}  
                style={styles.overlay}
              >
                <Text style={styles.cardTitle}>Protecting Our Waterways</Text>
                <Text style={styles.cardSubtitle}>
                  Advanced IoT Technology for smarter ocean cleanups
                </Text>
              </LinearGradient>
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.recentActivitySection}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.activityCard}>
              <View style={styles.activityItem}>
                <View style={[styles.activityDot, { backgroundColor: '#34C759' }]} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Buoy #5 Emptied</Text>
                  <Text style={styles.activityTime}>2 hours ago</Text>
                </View>
              </View>
              
              <View style={styles.activityItem}>
                <View style={[styles.activityDot, { backgroundColor: '#FF9500' }]} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Maintenance Scheduled</Text>
                  <Text style={styles.activityTime}>5 hours ago</Text>
                </View>
              </View>
              
              <View style={styles.activityItem}>
                <View style={[styles.activityDot, { backgroundColor: '#007AFF' }]} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>New Buoy Deployed</Text>
                  <Text style={styles.activityTime}>1 day ago</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    alignItems: 'center',
    paddingTop: 20,
  },
  headerIcons: {
    position: 'absolute',
    top: 10,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    zIndex: 10,
  },
  notificationIconContainer: {
    position: 'relative',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileIconContainer: {
    position: 'relative',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeContainer: {
    width: '90%',
    marginTop: 70,
    marginBottom: 25,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  welcomeName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D4ED8',
  },
  notificationBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -4,
    right: -4,
    borderWidth: 2,
    borderColor: '#fff',
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
    padding: 20,
  },
  notificationModal: {
    backgroundColor: '#fff',
    borderRadius: 25,
    width: '100%',
    maxWidth: 450,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  markAllButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'flex-end',
  },
  markAllText: {
    color: '#1D4ED8',
    fontSize: 14,
    fontWeight: '600',
  },
  notificationList: {
    maxHeight: 400,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    alignItems: 'flex-start',
  },
  unreadNotification: {
    backgroundColor: '#f8f9ff',
  },
  notificationIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1D4ED8',
    marginLeft: 8,
    marginTop: 6,
  },
  emptyNotifications: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: '#999',
  },
  statsContainer: {
    flexDirection: 'row',
    width: '90%',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f5f7fb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  featuredSection: {
    width: '90%',
    marginBottom: 25,
  },
  card: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  recentActivitySection: {
    width: '90%',
    marginBottom: 30,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 5,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 13,
    color: '#999',
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