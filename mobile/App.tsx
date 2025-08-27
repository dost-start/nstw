import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
        TagaBantay
      </Text>
      <Text style={[styles.subtitle, { color: isDarkMode ? '#ccc' : '#555' }]}>
        Digital Tanod for Unified Emergency Reporting and Response
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
  },
});

export default App;
