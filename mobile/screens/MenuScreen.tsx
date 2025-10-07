import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import TopNavWithBack from '../components/TopNavWithBack';

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      <TopNavWithBack />

      <Text style={styles.pageTitle}>Menu</Text>

      <View style={styles.menuList}>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={require('../assets/searchicon.png')} style={styles.icon} />
          <Text style={styles.menuText}>Responder Locations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Image source={require('../assets/searchicon.png')} style={styles.icon} />
          <Text style={styles.menuText}>Responder Locations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Image source={require('../assets/searchicon.png')} style={styles.icon} />
          <Text style={styles.menuText}>Emergency Info</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.menuItem, styles.settings]}>
        <Image source={require('../assets/searchicon.png')} style={styles.icon} />
        <Text style={styles.menuText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#D9D9D9' },

  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#333',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
  },

  menuList: {
    paddingHorizontal: 20,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  icon: { width: 28, height: 28, marginRight: 14, resizeMode: 'contain' },
  menuText: {
    fontSize: 20,
    fontFamily: 'Inter',
    color: '#333',
  },

  settings: {
    marginTop: 'auto',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
});
