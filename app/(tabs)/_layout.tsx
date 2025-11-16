import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].icon,
        tabBarStyle: {
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      borderTopWidth: 0,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -3 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      height: 65,
      paddingBottom: 10,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600',
      marginBottom: 5,
    },
    headerShown: false,
    tabBarButton: HapticTab,
  }}
>
  <Tabs.Screen
    name="index"
    options={{
      title: 'Home',
      tabBarIcon: ({ color }) => (
        <IconSymbol size={28} name="house.fill" color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="dashboard"
    options={{
      title: 'Dashboard',
      tabBarIcon: ({ color }) => (
        <IconSymbol size={28} name="rectangle.portrait.and.arrow.right" color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="analytics"
    options={{
      title: 'Analytics',
      tabBarIcon: ({ color }) => (
        <IconSymbol size={28} name="chart.bar.fill" color={color} />
      ),
    }}
  />
</Tabs>
  );
}