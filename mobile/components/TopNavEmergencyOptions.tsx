import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TopNavWithBack() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        activeOpacity={0.6}
      >
        <Image
          source={require('../assets/backicon.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* Centered Logo */}
      <View style={styles.logoWrapper}>
        <Image
          source={require('../assets/alistologocolored.png')}
          style={styles.logo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: 'transparent',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 16,
    padding: 8,
    zIndex: 2,
  },
  backIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  logoWrapper: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 50,
    resizeMode: 'contain',
  },
});
