import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

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
        {/* Example Buoy Markers in CDO */}
        <Marker
          coordinate={{ latitude: 8.485, longitude: 124.650 }}
          title="Buoy #1"
          description="Normal Operation"
        />

        <Marker
          coordinate={{ latitude: 8.480, longitude: 124.640 }}
          pinColor="red"
          title="Buoy #3"
          description="Requires Maintenance"
        />

        <Marker
          coordinate={{ latitude: 8.490, longitude: 124.660 }}
          pinColor="orange"
          title="Buoy #2"
          description="High Turbidity Detected"
        />
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

