import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavProp = StackNavigationProp<RootStackParamList, 'Menu'>;

export default function TopNav() {
  const navigation = useNavigation<NavProp>();

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/alistologoquezoncity.png')}
            style={styles.logo}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Menu')}
          style={styles.menuButton}
          activeOpacity={0.6}
        >
          <Text style={styles.hamburger}>☰</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  inner: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -24,
  },
  logo: {
    width: 140,
    height: 40,
    resizeMode: 'contain',
  },
  menuButton: {
    padding: 8,
  },
  hamburger: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});
