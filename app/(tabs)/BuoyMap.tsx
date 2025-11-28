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
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      >

        {/* BEACH MARKERS */}

        {/* Opol Beach (Macajalar Bay coast) */}
        <Marker
          coordinate={{ latitude: 8.5185, longitude: 124.5829 }}
          title="Buoy 1 – Opol Beach"
          description="Coastal buoy"
        >
          <Ionicons name="location-sharp" size={32} color="blue" />
        </Marker>

        {/* Macajalar Bay / coastal near Iponan (city) */}
        <Marker
          coordinate={{ latitude: 8.4400, longitude: 124.6370 }}
          title="Buoy 2 – CDO Coastal (Iponan Bay)"
          description="Coastal / bay buoy"
        >
          <Ionicons name="location-sharp" size={32} color="cyan" />
        </Marker>


        {/* RIVER / WATERWAY MARKERS */}

        {/* Cagayan River – downtown mouth (near Nazareth / city mouth) */}
        <Marker
          coordinate={{ latitude: 8.4800, longitude: 124.6400 }}
          title="Buoy 3 – Cagayan River (Mouth / City)"
          description="River outlet buoy"
        >
          <Ionicons name="location-sharp" size={32} color="green" />
        </Marker>

        {/* Cagayan River – Balulang / Carmen Bridge area (upstream) */}
        <Marker
          coordinate={{ latitude: 8.5060, longitude: 124.6500 }}
          title="Buoy 4 – Cagayan River (Balulang Bridge area)"
          description="Up-river monitoring buoy"
        >
          <Ionicons name="location-sharp" size={32} color="orange" />
        </Marker>

        {/* Iponan River (west of city) – near Iponan / Bugo area */}
        <Marker
          coordinate={{ latitude: 8.4500, longitude: 124.5950 }}
          title="Buoy 5 – Iponan River"
          description="River / large canal outflow"
        >
          <Ionicons name="location-sharp" size={32} color="purple" />
        </Marker>

        {/* Major drainage / creek: Bitan-ag Creek (runs through Cogon → Lapasan to bay) */}
        <Marker
          coordinate={{ latitude: 8.4600, longitude: 124.6550 }}
          title="Buoy 6 – Bitan-ag Creek / Canal"
          description="Drainage canal buoy"
        >
          <Ionicons name="location-sharp" size={32} color="brown" />
        </Marker>

        {/* Umalag River (or Umalag waterway in city east side) */}
        <Marker
          coordinate={{ latitude: 8.4300, longitude: 124.6800 }}
          title="Buoy 7 – Umalag River / Creek"
          description="Waterway monitoring buoy"
        >
          <Ionicons name="location-sharp" size={32} color="red" />
        </Marker>

      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
});
