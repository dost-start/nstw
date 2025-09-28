import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FireStationSelectScreen() {
  const navigation = useNavigation();

  const stations = [
    {
      id: '1',
      name: 'Bureau of Fire Marikina City',
      contact: '09123456789',
      distance: '5km',
    },
    {
      id: '2',
      name: 'Bureau of Fire Marikina District',
      contact: '09987654321',
      distance: '8km',
    },
    {
      id: '3',
      name: 'Bureau of Fire Concepcion',
      contact: '09112223344',
      distance: '12km',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/backicon.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Choose Fire Station</Text>
      </View>

      <FlatList
        data={stations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.iconWrapper}>
              <Image
                source={require('../assets/firetruckicon.png')}
                style={styles.icon}
              />
            </View>

            <View style={styles.detailsWrapper}>
              <Text style={styles.stationName}>{item.name}</Text>
              <Text style={styles.stationContact}>Contact {item.contact}</Text>
            </View>

            <View style={styles.distanceWrapper}>
              <Text style={styles.distanceLabel}>Distance</Text>
              <View style={styles.distancePill}>
                <Text style={styles.distanceText}>{item.distance}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e5e5e5', padding: 16, paddingTop: 40 },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: { width: 24, height: 24, resizeMode: 'contain', marginRight: 10 },
  headerText: { fontSize: 20, fontWeight: '700', color: '#000' },

  list: { marginTop: 10 },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },

  iconWrapper: { width: '10%', alignItems: 'center' },
  icon: { width: 28, height: 28, resizeMode: 'contain' },

  detailsWrapper: { width: '70%', paddingHorizontal: 8 },
  stationName: { fontSize: 16, fontWeight: '600', color: '#000' },
  stationContact: { fontSize: 14, color: '#555', marginTop: 4 },

  distanceWrapper: { width: '20%', alignItems: 'center' },
  distanceLabel: { fontSize: 14, color: '#444', marginBottom: 4 },
  distancePill: {
    backgroundColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  distanceText: { fontSize: 14, color: '#000', fontWeight: '500' },
});
