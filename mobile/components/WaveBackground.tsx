import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function RedBackground() {
  const mainRedHeight = height * 0.6;
  const middleRedHeight = height * 0.63;
  const topRedHeight = height * 0.66;
  const circleDiameter = width;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View
        style={[
          styles.redSection,
          {
            height: mainRedHeight,
            backgroundColor: '#E63C3C',
            zIndex: 3,
          },
        ]}
      />
      <View
        style={[
          styles.halfCircle,
          {
            width: circleDiameter,
            height: circleDiameter,
            borderRadius: circleDiameter / 2,
            bottom: mainRedHeight - circleDiameter / 2,
            backgroundColor: '#E63C3C',
            zIndex: 3,
          },
        ]}
      />

      {/* Middle red shade */}
      <View
        style={[
          styles.redSection,
          {
            height: middleRedHeight,
            backgroundColor: '#EB5A5A',
            zIndex: 2,
          },
        ]}
      />
      <View
        style={[
          styles.halfCircle,
          {
            width: circleDiameter,
            height: circleDiameter,
            borderRadius: circleDiameter / 2,
            bottom: middleRedHeight - circleDiameter / 2,
            backgroundColor: '#EB5A5A',
            zIndex: 2,
          },
        ]}
      />

      {/* Top red shade */}
      <View
        style={[
          styles.redSection,
          {
            height: topRedHeight,
            backgroundColor: '#F28C8C',
            zIndex: 1,
          },
        ]}
      />
      <View
        style={[
          styles.halfCircle,
          {
            width: circleDiameter,
            height: circleDiameter,
            borderRadius: circleDiameter / 2,
            bottom: topRedHeight - circleDiameter / 2,
            backgroundColor: '#F28C8C',
            zIndex: 1,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  redSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  halfCircle: {
    position: 'absolute',
    left: 0,
  },
});
