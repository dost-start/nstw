import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TopNavWithBack() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.sideButton}
        activeOpacity={0.6}
      >
        <Image
          source={require('../assets/backicon.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Reporting Fire Incident</Text>

      {/* Right placeholder for visual balance */}
      <View style={styles.sideButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  sideButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 22,
    height: 22,
    tintColor: '#E63C3C',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#E63C3C',
    textAlign: 'center',
  },
});
