import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const windowHeight = Dimensions.get('window').height;

const buoyLocations = [
  {
    id: '1',
    title: 'Buoy 1',
    description: 'Active buoy near coast',
    coordinate: { latitude: 37.78825, longitude: -122.4324 },
  },
  {
    id: '2',
    title: 'Buoy 2',
    description: 'Active buoy offshore',
    coordinate: { latitude: 37.785, longitude: -122.435 },
  },
  // Add more buoy coordinates as you have
];

export default function BuoyMapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {buoyLocations.map((buoy) => (
          <Marker
            key={buoy.id}
            coordinate={buoy.coordinate}
            title={buoy.title}
            description={buoy.description}
            pinColor="#2563EB" // blue pin
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: windowHeight,
    width: '100%',
  },
});

