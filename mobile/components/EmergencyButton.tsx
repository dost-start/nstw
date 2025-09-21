import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type EmergencyButtonNavProp = StackNavigationProp<RootStackParamList, 'UserHome'>;

export default function EmergencyButton() {
  const navigation = useNavigation<EmergencyButtonNavProp>();

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.shadowCircle,
          { width: 260, height: 260, backgroundColor: '#F3D8D8' },
        ]}
      />
      <View
        style={[
          styles.shadowCircle,
          { width: 220, height: 220, backgroundColor: '#F9BEBE' },
        ]}
      />
      <TouchableOpacity
        style={styles.circle}
        onPress={() => navigation.navigate('EmergencyOptions')}
      >
        <Text style={styles.text}>SOS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#E63C3C',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    zIndex: 3,
  },
  text: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
  shadowCircle: {
    position: 'absolute',
    borderRadius: 200,
    zIndex: 1,
  },
});
