import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from './DashboardScreen';
import BuoyMapScreen from './BuoyMapScreen';

type RootStackParamList = {
  Dashboard: undefined;
  BuoyMap: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BuoyMap" component={BuoyMapScreen} options={{ title: 'Active Buoys Map' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
