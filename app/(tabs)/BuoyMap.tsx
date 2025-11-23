import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

export default function BuoyMap() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 8.482,
          longitude: 124.647,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >

        {/* Buoy #1 with Icon */}
        <Marker coordinate={{ latitude: 8.485, longitude: 124.650 }}>
          <Ionicons name="location-sharp" size={32} color="blue" />
        </Marker>

        {/* Buoy #2 */}
        <Marker coordinate={{ latitude: 8.490, longitude: 124.660 }}>
          <Ionicons name="location-sharp" size={32} color="orange" />
        </Marker>

        {/* Buoy #3 */}
        <Marker coordinate={{ latitude: 8.480, longitude: 124.640 }}>
          <Ionicons name="location-sharp" size={32} color="red" />
        </Marker>

      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
