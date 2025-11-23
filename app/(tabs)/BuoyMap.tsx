import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function BuoyMap() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 1.290270,
          longitude: 103.851959,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {/* Example Buoy Markers */}
        <Marker
          coordinate={{ latitude: 1.300, longitude: 103.860 }}
          title="Buoy #1"
          description="Normal Operation"
        />

        <Marker
          coordinate={{ latitude: 1.280, longitude: 103.840 }}
          pinColor="red"
          title="Buoy #3"
          description="Requires Maintenance"
        />

        <Marker
          coordinate={{ latitude: 1.310, longitude: 103.830 }}
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
