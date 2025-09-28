import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import TopNavHotlines from '../components/TopNavHotlines';
import BottomNav from '../components/BottomNav';

export default function HotlinesScreen({ navigation }: any) {
  const options = [
    { label: 'Fire', icon: require('../assets/fireemergencyicon.png') },
    { label: 'Ambulance', icon: require('../assets/hospitalemergencyicon.png') },
    { label: 'Police', icon: require('../assets/policeemergencyicon.png') },
    { label: 'Disaster Response', icon: require('../assets/disasterresponseemergencyicon.png') },
    { label: 'Other', icon: null },
    { label: 'Rescue', icon: require('../assets/policeemergencyicon.png') },
  ];

  const contacts = Array.from({ length: 20 }).map((_, i) => ({
    id: i.toString(),
    name: 'Maria Clara',
    role: 'Mother',
  }));

  return (
    <View style={styles.container}>
      <TopNavHotlines />

      <ScrollView style={styles.scrollArea} contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.pillsWrapper}>
          {options.map((opt, idx) => (
            <TouchableOpacity key={idx} style={styles.pill}>
              {opt.icon && <Image source={opt.icon} style={styles.pillIcon} />}
              <Text style={styles.pillText}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Your Emergency Contacts</Text>
          <TouchableOpacity style={styles.addButton}>
            <Image
              source={require('../assets/searchicon.png')}
              style={styles.addIcon}
            />
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>

        {contacts.map((item) => (
          <View key={item.id} style={styles.contactCard}>
            <Image
              source={require('../assets/searchicon.png')}
              style={styles.contactIcon}
            />
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactRole}>{item.role}</Text>
            </View>
            <Image
              source={require('../assets/searchicon.png')}
              style={styles.contactRightIcon}
            />
          </View>
        ))}
      </ScrollView>

      <BottomNav
        onNavigate={(screen) => {
          navigation.navigate(screen);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e5e5e5' },

  scrollArea: { flex: 1, padding: 16 },

  pillsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  pill: {
    width: '48%',
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  pillIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    resizeMode: 'contain',
  },
  pillText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  // Header
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
    tintColor: '#fff',
  },
  addText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  contactIcon: {
    width: 28,
    height: 28,
    marginRight: 10,
    resizeMode: 'contain',
  },
  contactInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  contactRole: {
    fontSize: 12,
    color: '#666',
  },
  contactRightIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
