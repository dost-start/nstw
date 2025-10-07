import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import WaveBackground from '../components/WaveBackground';
import TopNavRed from '../components/TopNavRed';
import ConfirmReport from '../components/ConfirmReport';

type LocationSelectScreenNavProp = StackNavigationProp<
  RootStackParamList,
  'LocationSelectScreen'
>;

const { height, width } = Dimensions.get('window');

export default function LocationSelectScreen() {
  const navigation = useNavigation<LocationSelectScreenNavProp>();
  const [location, setLocation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    Keyboard.dismiss();
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    navigation.navigate('FireStationSelectScreen', { location });
  };

  return (
    <View style={styles.container}>
      <WaveBackground />
      <View style={styles.overlay}>
        <TopNavRed />

        <View style={styles.content}>
          <Text style={styles.title}>
            Are you in the place{'\n'}of incident?
          </Text>

          <TouchableOpacity style={styles.blueButton} onPress={handleOpenModal}>
            <Image
              source={require('../assets/locationicon.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Send your Location</Text>
          </TouchableOpacity>

          <View style={{ height: height * 0.06 }} />

          <Text style={styles.smallText}>If you’re not in location</Text>

          <TextInput
            style={styles.textInput}
            placeholder="Exact location of incident or landmarks"
            placeholderTextColor="#999"
            value={location}
            onChangeText={setLocation}
          />

          <View style={{ height: height * 0.04 }} />

          <TouchableOpacity style={styles.blueButton} onPress={handleOpenModal}>
            <Image
              source={require('../assets/submiticon.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        <ConfirmReport
          visible={modalVisible}
          onConfirm={handleConfirm}
          onCancel={() => setModalVisible(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  overlay: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: height * 0.15,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 25,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  blueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 3,
    width: '70%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  smallText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  textInput: {
    width: width * 0.8,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
  },
});
