import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TopNavWithBack() {
  const navigation = useNavigation();

  return (
    <View style={styles.topNav}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/backicon.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <Image
        source={require('../assets/smallalistologogray.png')}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topNav: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f2f2f2',
    elevation: 2,
  },
  backIcon: { width: 24, height: 24, resizeMode: 'contain', marginRight: 12 },
  logo: { width: 120, height: 34, resizeMode: 'contain' },
});
