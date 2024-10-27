import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import Card from "../components/Card";
import { useWords } from "../context/WordsContext";

const screenWidth = Dimensions.get("window").width;

const LearnScreen = () => {
  const { words } = useWords();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    // Анимация вылета текущей карточки влево
    Animated.timing(slideAnim, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Обновляем индекс для перехода к следующей карточке
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
      setFlipped(false); // Сбрасываем переворот после перехода
      // Возвращаем карточку справа
      slideAnim.setValue(screenWidth);
      // Анимация появления новой карточки слева направо
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleFlip = () => {
    setFlipped(true); // Переворачиваем карточку для отображения перевода
  };

  const currentWord = words[currentIndex];

  if (!currentWord) {
    return (
      <View style={styles.container}>
        <Text>Нет доступных слов для изучения</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
        <Card
          item={{
            word: currentWord.native,
            translation: currentWord.translation,
            imageUri: currentWord.imageUri, // если есть изображение
          }}
          flipped={flipped}
          onFlip={handleFlip}
          onNext={handleNext}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
});

export default LearnScreen;
