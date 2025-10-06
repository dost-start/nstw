import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const COLORS = {
  redMain: "#E63C3C",
  redShade: "#F9BEBE",
  redHighlight: "#F3D8D8",
};

const RedBackground: React.FC = () => {
  const rectHeight = height * 0.70;
  const circleHeight = height * 0.22;
  const rem = 16;
  const offset = 2 * rem * 0.4;

  const createArcPath = (y: number, arcHeight: number) => {
    const cp1x = width * 0.25;
    const cp2x = width * 0.75;
    const cpY = y - arcHeight;

    return `
      M 0 ${y}
      C ${cp1x} ${cpY}, ${cp2x} ${cpY}, ${width} ${y}
      L ${width} ${y + rectHeight}
      L 0 ${y + rectHeight}
      Z
    `;
  };

  const arcControl = circleHeight * 0.8;

  return (
    <View style={styles.container}>
      {/* BACK (lightest) */}
      <Svg
        width={width}
        height={rectHeight + circleHeight + offset * 2}
        style={[styles.svg, { bottom: offset * 2 }]}
      >
        <Path
          d={createArcPath(circleHeight, arcControl)}
          fill={COLORS.redHighlight}
        />
      </Svg>

      {/* MIDDLE */}
      <Svg
        width={width}
        height={rectHeight + circleHeight + offset}
        style={[styles.svg, { bottom: offset }]}
      >
        <Path
          d={createArcPath(circleHeight, arcControl)}
          fill={COLORS.redShade}
        />
      </Svg>

      {/* FRONT */}
      <Svg width={width} height={rectHeight + circleHeight} style={styles.svg}>
        <Path
          d={createArcPath(circleHeight, arcControl)}
          fill={COLORS.redMain}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  svg: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
});

export default RedBackground;
