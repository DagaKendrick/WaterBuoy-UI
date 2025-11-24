import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from 'expo-blur';
import { Redirect, Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';

export default function TabLayout() {
  // ALL HOOKS MUST RUN FIRST
  const [loggedIn, setLoggedIn] = useState<null | boolean>(null);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    const checkLogin = async () => {
      const value = await AsyncStorage.getItem("isLoggedIn");
      setLoggedIn(value === "true");
    };
    checkLogin();
  }, []);

  // Still checking...
  if (loggedIn === null) return null;

  // Redirect once login state is known
  if (!loggedIn) return <Redirect href="/(auth)/login" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: theme.tint,
        tabBarInactiveTintColor: theme.icon,
        tabBarStyle: {
          position: 'absolute',
          bottom: 23,
          left: 24,
          right: 24,
          height: 65,
          borderRadius: 35,
          borderCurve: 'continuous',
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
          paddingTop: 10,
          paddingBottom: 10,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={35}
            tint={colorScheme === 'dark' ? 'dark' : 'light'}
            style={{ flex: 1, borderRadius: 35, borderCurve: 'continuous' }}
          />
        ),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="dashboard" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color }) => (
            <Ionicons name="analytics" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          href: null, // This hides it from the tab bar
        }}
      />
    </Tabs>
  );
}