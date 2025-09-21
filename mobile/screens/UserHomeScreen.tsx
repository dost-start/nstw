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

export default function UserHomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <Image
          source={require('../assets/smallalistologogray.png')}
          style={styles.logo}
        />
        <TouchableOpacity>
          <Text style={styles.hamburger}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Middle Content */}
      <View style={styles.middle}>
        <Text style={styles.helpText}>Emergency help needed?</Text>
        <Text style={styles.helpSubText}>Press the button to ask help</Text>
        <EmergencyButton />

        <View style={styles.announcementSection}>
          <Text style={styles.announcementTitle}>Announcements</Text>
          <View style={styles.announcementBox}>
            <Text style={styles.announcementText}></Text>
          </View>
        </View>
      </View>

      {/* Bottom Navigation */}
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
  logo: { width: 100, height: 35, resizeMode: 'contain' },
  hamburger: { fontSize: 22, fontWeight: 'bold' },

  middle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  helpText: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#FE3838',
    marginBottom: 5,
  },
  helpSubText: {
    fontSize: 16,
    fontFamily: 'Inter',
    marginBottom: 70,
    color: '#707070',
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
