import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'RoleChoose'>;
};

export default function RoleChooseScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/alistologo.png')} style={styles.logo} />

      <TouchableOpacity
        style={[styles.button, styles.userButton]}
        onPress={() => navigation.navigate('UserHome')}
      >
        <Text style={styles.userText}>User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.adminButton]}
        onPress={() => navigation.navigate('AdminHome')}
      >
        <Text style={styles.adminText}>Admin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  logo: { width: 300, height: 300, marginBottom: 40, resizeMode: 'contain' },

  button: {
    width: 320,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },

  userButton: { backgroundColor: '#3B82F6' },
  adminButton: { backgroundColor: '#D1D5DB' },

  userText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  adminText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
});
