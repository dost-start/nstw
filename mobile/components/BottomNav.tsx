import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

type Props = {
  onNavigate?: (screen: string) => void;
};

export default function BottomNav({ onNavigate }: Props) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.bottomButton} onPress={() => onNavigate?.('Home')}>
        <Image source={require('../assets/homeicon.png')} style={styles.icon} />
        <Text style={styles.bottomText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomButton} onPress={() => onNavigate?.('Hotlines')}>
        <Image source={require('../assets/hotlinesicon.png')} style={styles.icon} />
        <Text style={styles.bottomText}>Hotlines</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomButton} onPress={() => onNavigate?.('Profile')}>
        <Image source={require('../assets/profileicon.png')} style={styles.icon} />
        <Text style={styles.bottomText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    height: 70,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  bottomButton: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  bottomText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E83737',
    fontFamily: 'Inter',
  },
});
