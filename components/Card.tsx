import React from "react";
import { View, Text, Button, StyleSheet, Animated, Image } from "react-native";

interface CardProps {
  item: {
    word: string;
    translation: string;
    imageUri?: string;
  };
  flipped: boolean;
  onFlip: () => void;
  onNext: () => void;
}

const Card: React.FC<CardProps> = ({ item, flipped, onFlip, onNext }) => {
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
    zIndex: flipped ? 0 : 1,
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
    zIndex: flipped ? 1 : 0,
  };

  return (
    <View style={styles.cardContainer}>
      {/* Передняя сторона */}
      <Animated.View
        style={[styles.card, frontStyle, { backfaceVisibility: "hidden" }]}
      >
        <View style={styles.cardContent}>
          <Text style={styles.wordText}>{item.word}</Text>
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
          { backfaceVisibility: "hidden" },
        ]}
      >
        <View style={styles.cardContent}>
          <Text style={styles.wordText}>{item.translation}</Text>
          {item.imageUri ? (
            <Image
              source={{ uri: item.imageUri }}
              style={styles.cardImage}
              onError={() =>
                console.log("Ошибка загрузки изображения:", item.imageUri)
              }
            />
          ) : (
            <Text style={styles.noImageText}>Изображение отсутствует</Text>
          )}
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
    textAlign: "center",
  },
  cardImage: {
    width: 200,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
    resizeMode: "contain",
    backgroundColor: "#f0f0f0",
  },
  noImageText: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
});

export default Card;
