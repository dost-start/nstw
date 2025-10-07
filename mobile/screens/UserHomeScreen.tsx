import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import EmergencyButton from '../components/EmergencyButton';
import BottomNav from '../components/BottomNav';
import TopNav from '../components/TopNav';

export default function UserHomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <TopNav />

      <View style={styles.middle}>
        <EmergencyButton />

        <View style={styles.announcementSection}>
          <Text style={styles.announcementTitle}>Announcements</Text>
          <View style={styles.announcementBox}>
            <Text style={styles.announcementText}></Text>
          </View>
        </View>
      </View>

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

  topNav: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f2f2f2',
    elevation: 2,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: { width: 100, height: 35, resizeMode: 'contain' },
  cityText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
    color: '#333',
  },
  hamburger: { fontSize: 22, fontWeight: 'bold' },

  middle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  announcementSection: {
    width: '95%',
    marginTop: 60,
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#333',
    marginBottom: 6,
  },
  announcementBox: {
    backgroundColor: '#d1d1d1',
    borderRadius: 8,
    padding: 16,
    height: 200,
  },
  announcementText: {
    fontSize: 14,
    fontFamily: 'Inter',
    color: '#333',
  },
});
