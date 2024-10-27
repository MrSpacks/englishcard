import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

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
            <TouchableOpacity style={styles.button} onPress={onFlip}>
              <Text>
                <FontAwesome6 name="arrows-rotate" size={24} color="white" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onNext}>
              <Text>
                <FontAwesome6
                  name="arrow-alt-circle-right"
                  size={24}
                  color="white"
                />
              </Text>
            </TouchableOpacity>
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
          <TouchableOpacity style={styles.button} onPress={onNext}>
            <Text>
              <FontAwesome6
                name="arrow-alt-circle-right"
                size={24}
                color="white"
              />
            </Text>
          </TouchableOpacity>
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
    backgroundColor: "#141414", // Темный фон для области карточки
    borderRadius: 15,
    padding: 10,
  },
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#1E1E1E", // Темный фон карточки
    borderRadius: 12,
    backfaceVisibility: "hidden",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  back: {
    backgroundColor: "#2C2C2C", // Темный фон задней стороны карточки
    borderRadius: 12,
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  wordText: {
    fontSize: 30,
    color: "#FFFFFF", // Белый цвет для текста, чтобы выделяться на темном фоне
    marginBottom: 20,
    textAlign: "center",
  },
  cardImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#333", // Темный фон для картинки
  },
  noImageText: {
    fontSize: 16,
    color: "#888", // Светло-серый цвет для текста, если нет изображения
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: -125,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#325AFF", // Насыщенный синий цвет для кнопок
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
});

export default Card;
