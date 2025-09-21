import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';

type Props = {
  onMenuPress?: () => void;
};

export default function TopNav({ onMenuPress }: Props) {
  return (
    <View style={styles.topNav}>
      <Image source={require('../assets/alistologo.png')} style={styles.logo} />
      <TouchableOpacity onPress={onMenuPress}>
        <Text style={styles.hamburger}>☰</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topNav: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f2f2f2',
    elevation: 2,
  },
  logo: { width: 140, height: 40, resizeMode: 'contain' },
  hamburger: { fontSize: 22, fontWeight: 'bold' },
});
