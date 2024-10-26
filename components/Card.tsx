import React from "react";
import { View, Text, Button, StyleSheet, Animated } from "react-native";

interface CardProps {
  word: string;
  translation: string;
  flipped: boolean;
  onFlip: () => void;
  onNext: () => void;
}

const Card: React.FC<CardProps> = ({
  word,
  translation,
  flipped,
  onFlip,
  onNext,
}) => {
  const flipAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(flipAnim, {
      toValue: flipped ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [flipped]);

  const frontStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };

  const backStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };

  return (
    <View style={styles.cardContainer}>
      {/* Передняя сторона */}
      <Animated.View
        style={[styles.card, frontStyle, { zIndex: flipped ? 0 : 1 }]}
      >
        <View style={styles.cardContent}>
          <Text style={styles.wordText}>{word}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Не знаю" onPress={onFlip} />
            <Button title="Знаю" onPress={onNext} />
          </View>
        </View>
      </Animated.View>

      {/* Задняя сторона */}
      <Animated.View
        style={[
          styles.card,
          styles.back,
          backStyle,
          { zIndex: flipped ? 1 : 0 },
        ]}
      >
        <View style={styles.cardContent}>
          <Text style={styles.wordText}>{translation}</Text>
          <Button title="Запомнил" onPress={onNext} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 300,
    height: 400,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    backfaceVisibility: "hidden",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  back: {
    backgroundColor: "#e0e0e0",
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  wordText: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
});

export default Card;
