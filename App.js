import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { Animated, Button, Easing, StyleSheet, Text, View } from "react-native";

export default function App() {
  const animation = useRef(null);
  const position = useRef(new Animated.Value(0)).current;
  const color = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    animation.current = Animated.loop(
      Animated.sequence([
        Animated.timing(position, {
          toValue: 300,
          duration: 1000,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(position, {
            toValue: 0,
            duration: 1000,
            easing: Easing.bounce,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    animation.current.start();
  };
  const stopAnimation = () => {
    if (animation.current) {
      animation.current.stop();
    }
  };

  const resetAnimation = () => {
    if (animation.current) {
      animation.current.reset();
    }
  };

  const changeColor = () => {
    Animated.timing(color, {
      toValue: color._value === 0 ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const interpolatedColor = color.interpolate({
    inputRange: [0, 1],
    outputRange: ["blue", "red"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.ball,
          {
            transform: [{ translateY: position }, { scale }],
            opacity,
            backgroundColor: interpolatedColor,
          },
        ]}
      />
      <Button title="Start Animation" onPress={startAnimation} />
      <Button title="Stop Animation" onPress={stopAnimation} />
      <Button title="Reset Animation" onPress={resetAnimation} />
      <Button title="Change Color" onPress={changeColor} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ball: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 20,
  },
});
