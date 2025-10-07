import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavProp = StackNavigationProp<RootStackParamList, 'Menu'>;

export default function TopNavHotlines() {
  const navigation = useNavigation<NavProp>();

  return (
    <View style={styles.topNav}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/hotlineslogo.png')}
          style={styles.logo}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: { width: 140, height: 40, resizeMode: 'contain' },
  hamburger: { fontSize: 22, fontWeight: 'bold' },
});
