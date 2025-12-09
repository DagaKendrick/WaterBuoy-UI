import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface BuoyDataType {
  name: string;
  trash: string;
}

export default function BuoyMap() {
  const [selectedBuoy, setSelectedBuoy] = useState<BuoyDataType | null>(null);

  const buoyData: Record<number, BuoyDataType> = {
    1: { name: "Buoy 1 – Opol Beach", trash: "12 kg of mixed plastics" },
    2: { name: "Buoy 2 – CDO Coastal (Iponan Bay)", trash: "7 kg of fishing nets" },
    3: { name: "Buoy 3 – Cagayan River (Mouth)", trash: "5 kg of food wrappers" },
    4: { name: "Buoy 4 – Cagayan River (Balulang)", trash: "15 kg of organic waste" },
    5: { name: "Buoy 5 – Iponan River", trash: "9 kg of plastic bottles" },
    6: { name: "Buoy 6 – Bitan-ag Creek", trash: "4 kg of styrofoam" },
    7: { name: "Buoy 7 – Umalag River", trash: "3 kg of aluminum cans" },
  };

  const openPopup = (id: number) => setSelectedBuoy(buoyData[id]);
  const closePopup = () => setSelectedBuoy(null);

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

        {/* MARKERS */}
        <Marker
          coordinate={{ latitude: 8.5185, longitude: 124.5829 }}
          onPress={() => openPopup(1)}
        >
          <Ionicons name="location-sharp" size={32} color="blue" />
        </Marker>

        <Marker
          coordinate={{ latitude: 8.4400, longitude: 124.6370 }}
          onPress={() => openPopup(2)}
        >
          <Ionicons name="location-sharp" size={32} color="cyan" />
        </Marker>

        <Marker
          coordinate={{ latitude: 8.4800, longitude: 124.6400 }}
          onPress={() => openPopup(3)}
        >
          <Ionicons name="location-sharp" size={32} color="green" />
        </Marker>

        <Marker
          coordinate={{ latitude: 8.5060, longitude: 124.6500 }}
          onPress={() => openPopup(4)}
        >
          <Ionicons name="location-sharp" size={32} color="orange" />
        </Marker>

        <Marker
          coordinate={{ latitude: 8.4500, longitude: 124.5950 }}
          onPress={() => openPopup(5)}
        >
          <Ionicons name="location-sharp" size={32} color="purple" />
        </Marker>

        <Marker
          coordinate={{ latitude: 8.4600, longitude: 124.6550 }}
          onPress={() => openPopup(6)}
        >
          <Ionicons name="location-sharp" size={32} color="brown" />
        </Marker>

        <Marker
          coordinate={{ latitude: 8.4300, longitude: 124.6800 }}
          onPress={() => openPopup(7)}
        >
          <Ionicons name="location-sharp" size={32} color="red" />
        </Marker>

      </MapView>

      {/* POPUP MODAL */}
      <Modal visible={!!selectedBuoy} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.title}>{selectedBuoy?.name}</Text>
            <Text style={styles.subText}>
              Trash collected: {selectedBuoy?.trash}
            </Text>

            <TouchableOpacity onPress={closePopup} style={styles.closeBtn}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  subText: { fontSize: 16, marginBottom: 20 },
  closeBtn: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeText: { color: 'white', fontWeight: 'bold' },
});
