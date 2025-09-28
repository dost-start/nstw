import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import TopNavWithBack from '../components/TopNavWithBack';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import WaveBackground from '../components/WaveBackground';

type EmergencyOptionsNav = StackNavigationProp<RootStackParamList, 'EmergencyOptions'>;

export default function EmergencyOptionsScreen() {
  const navigation = useNavigation<EmergencyOptionsNav>();

  const options = [
    { label: 'Fire', icon: require('../assets/fireemergencyicon.png') },
    { label: 'Ambulance', icon: require('../assets/hospitalemergencyicon.png') },
    { label: 'Police', icon: require('../assets/policeemergencyicon.png') },
    { label: 'Disaster Response', icon: require('../assets/disasterresponseemergencyicon.png') },
    { label: 'Other', icon: null },
  ];

  return (
    <View style={styles.container}>
      <WaveBackground />

      <View style={styles.content}>
        <TopNavWithBack />

        <View style={styles.middle}>
          <Text style={styles.title}>What is your Emergency?</Text>

          {options.map((opt, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() =>
                navigation.navigate('LocationSelectScreen', { type: opt.label })
              }
            >
              <Text style={styles.optionText}>{opt.label}</Text>
              {opt.icon && <Image source={opt.icon} style={styles.optionIcon} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: {
    flex: 1,
  },
  middle: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 40,
    textAlign: 'center',
    marginTop: 40,
  },
  optionButton: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  optionIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});
