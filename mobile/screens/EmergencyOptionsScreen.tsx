import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import TopNavEmergencyOptions from '../components/TopNavEmergencyOptions';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import WaveBackground from '../components/WaveBackground';

type EmergencyOptionsNav = StackNavigationProp<RootStackParamList, 'EmergencyOptions'>;

const { height } = Dimensions.get('window');

export default function EmergencyOptionsScreen() {
  const navigation = useNavigation<EmergencyOptionsNav>();

  const options = [
    { label: 'Fire', icon: require('../assets/fireemergencyicon.png') },
    { label: 'Ambulance', icon: require('../assets/hospitalemergencyicon.png') },
    { label: 'Police', icon: require('../assets/policeemergencyicon.png') },
    { label: 'Disaster', icon: require('../assets/disasterresponseemergencyicon.png') },
  ];

  return (
    <View style={styles.container}>
      <WaveBackground />
      <View style={styles.content}>
        <TopNavEmergencyOptions />
        <View style={[styles.middle, { marginTop: height * 0.15 }]}>
          <Text style={styles.title}>
            What is your{'\n'}
            Emergency?
          </Text>
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
  content: { flex: 1 },
  middle: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  optionButton: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: 18,
    marginBottom: 14,
    borderRadius: 12,
    elevation: 2,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  optionIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
