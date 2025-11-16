import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: theme.tint,
        tabBarInactiveTintColor: theme.icon,
        // Floating Tab Bar
        tabBarStyle: {
          position: 'absolute',
          bottom: 22,
          left: 24,
          right: 24,
          height: 65,
          borderRadius: 35,
          borderCurve: 'continuous',

          // remove default styling
          borderTopWidth: 0,
          backgroundColor: 'transparent', // required for BlurView
          elevation: 0,
        },
        // blur container wrapper
        tabBarBackground: () => (
          <BlurView
            intensity={35}
            tint={colorScheme === 'dark' ? 'dark' : 'light'}
            style={{
              flex: 1,
              borderRadius: 35,
              borderCurve: 'continuous',
            }}
          />
        ),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
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
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
