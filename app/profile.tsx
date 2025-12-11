import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface UserData {
  id?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  email?: string;
  id_number?: string;
  department?: {
    id: number;
    name: string;
    code: string;
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userDataStr = await AsyncStorage.getItem('userData');
      if (userDataStr) {
        const user = JSON.parse(userDataStr);
        setUserData(user);
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUserData();
    setRefreshing(false);
  };

  const handleSignOut = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            await AsyncStorage.multiRemove(["isLoggedIn", "authToken", "userData"]);
            router.replace("/login");
          }
        }
      ]
    );
  };

  const getInitials = () => {
    if (!userData) return 'U';
    const firstName = userData.first_name || '';
    const lastName = userData.last_name || '';
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    if (userData.name) {
      const names = userData.name.split(' ');
      return names.length > 1 
        ? `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase()
        : names[0].charAt(0).toUpperCase();
    }
    return userData.email?.charAt(0).toUpperCase() || 'U';
  };

  const getFullName = () => {
    if (!userData) return 'User';
    const fullName = `${userData.first_name || ''} ${userData.last_name || ''}`.trim();
    return fullName || userData.name || 'User';
  };

  const getEmail = () => {
    return userData?.email || 'user@ecobouy.com';
  };

  const menuItems = [
    {
      id: 1,
      title: "Edit Profile",
      icon: "person-edit",
      color: "#1D4ED8",
      action: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Alert.alert("Edit Profile", "Profile editing feature coming soon!");
      },
    },
    {
      id: 2,
      title: "Account Details",
      icon: "account",
      color: "#34C759",
      action: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push("/account");
      },
    },
    {
      id: 3,
      title: "Settings",
      icon: "settings",
      color: "#8E8E93",
      action: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push("/settings");
      },
    },
    {
      id: 4,
      title: "Help & Support",
      icon: "help",
      color: "#FF9500",
      action: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Alert.alert(
          "Help & Support",
          "Need help? Contact us at support@ecobouy.com",
          [{ text: "OK", onPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light) }]
        );
      },
    },
    {
      id: 5,
      title: "Sign Out",
      icon: "log-out",
      color: "#FF3B30",
      action: handleSignOut,
    },
  ];

  const getIconComponent = (iconName: string, color: string) => {
    switch (iconName) {
      case 'person-edit':
        return <Ionicons name="person-outline" size={22} color={color} />;
      case 'account':
        return <MaterialCommunityIcons name="card-account-details-outline" size={22} color={color} />;
      case 'settings':
        return <Ionicons name="settings-outline" size={22} color={color} />;
      case 'help':
        return <Ionicons name="help-circle-outline" size={22} color={color} />;
      case 'log-out':
        return <Feather name="log-out" size={22} color={color} />;
      default:
        return <Ionicons name="help-outline" size={22} color={color} />;
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#1D4ED8" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          activeOpacity={0.7}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.back();
          }}
        >
          <Ionicons name="chevron-back" size={24} color="#1D4ED8" />
        </TouchableOpacity>
        <Text style={styles.title}>My Profile</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* User Info Card */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.userCard}
        >
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{getInitials()}</Text>
          </View>
          <Text style={styles.userName}>{getFullName()}</Text>
          <Text style={styles.userEmail}>{getEmail()}</Text>
          {userData?.id_number && (
            <View style={styles.badgeContainer}>
              <Ionicons name="card-outline" size={14} color="#fff" />
              <Text style={styles.userIdNumber}>ID: {userData.id_number}</Text>
            </View>
          )}
          {userData?.department && (
            <View style={styles.departmentBadge}>
              <Text style={styles.userDepartment}>{userData.department.name}</Text>
            </View>
          )}
        </LinearGradient>

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Ionicons name="water" size={28} color="#1D4ED8" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Buoys Monitored</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="checkmark-circle" size={28} color="#34C759" />
            <Text style={styles.statNumber}>847kg</Text>
            <Text style={styles.statLabel}>Trash Collected</Text>
          </View>
        </View>

        {/* Profile Menu */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Profile</Text>
          
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                item.title === "Sign Out" && styles.signOutItem
              ]}
              activeOpacity={0.7}
              onPress={item.action}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.iconCircle, { backgroundColor: item.color + '15' }]}>
                  {getIconComponent(item.icon, item.color)}
                </View>
                <Text style={[
                  styles.menuItemText,
                  item.title === "Sign Out" && styles.signOutText
                ]}>{item.title}</Text>
              </View>
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color={item.color} 
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Account Information */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Account Information</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoLabelContainer}>
              <Ionicons name="calendar-outline" size={18} color="#1D4ED8" />
              <Text style={styles.infoLabel}>Member since</Text>
            </View>
            <Text style={styles.infoValue}>January 2024</Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoLabelContainer}>
              <Ionicons name="shield-checkmark-outline" size={18} color="#34C759" />
              <Text style={styles.infoLabel}>Account Status</Text>
            </View>
            <View style={styles.activeBadge}>
              <Text style={styles.activeText}>Active</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoLabelContainer}>
              <Ionicons name="location-outline" size={18} color="#FF9500" />
              <Text style={styles.infoLabel}>Location</Text>
            </View>
            <Text style={styles.infoValue}>Cagayan de Oro</Text>
          </View>
        </View>

        {/* App Version */}
        <Text style={styles.versionText}>EcoBouy v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f7fb',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(29, 78, 216, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D4ED8',
    marginLeft: 15,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  userCard: {
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 20,
    marginTop: 10,
  },
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 8,
    gap: 6,
  },
  userIdNumber: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
  },
  departmentBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
  },
  userDepartment: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  signOutItem: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  signOutText: {
    color: '#FF3B30',
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  infoLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoLabel: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  activeBadge: {
    backgroundColor: '#34C75920',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeText: {
    color: '#34C759',
    fontSize: 13,
    fontWeight: '700',
  },
  versionText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 13,
    marginTop: 10,
    marginBottom: 20,
  },
});