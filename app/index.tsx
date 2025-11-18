import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { Redirect } from "expo-router";

export default function HomeScreen() {
  const isLoggedIn = false; // later replace with state from storage/auth
  return <Redirect href={isLoggedIn ? "/(tabs)/home" : "/(auth)/login"} />;
}

    
