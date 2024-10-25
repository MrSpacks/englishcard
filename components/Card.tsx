import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Animated } from 'react-native';

interface CardProps {
  word: string;
  translation: string;
  imageUrl?: string;
  onKnow: () => void;
  onDontKnow: () => void;
}

const Card: React.FC<CardProps> = ({ word, translation, imageUrl, onKnow, onDontKnow }) => {
  const [flipped, setFlipped] = useState(false);
  const flipAnim = new Animated.Value(0);

  const flipCard = () => {
    Animated.timing(flipAnim, {
      toValue: flipped ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setFlipped(!flipped)); // Устанавливаем состояние flipped после анимации
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <View style={styles.cardContainer}>
      {!flipped ? (
        // Передняя сторона карточки
        <Animated.View style={[styles.card, { transform: [{ rotateY: frontInterpolate }] }]}>
          <Text style={styles.wordText}>{word}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Не знаю" onPress={flipCard} />
            <Button title="Знаю" onPress={onKnow} />
          </View>
        </Animated.View>
      ) : (
        // Задняя сторона карточки
        <Animated.View style={[styles.card, { transform: [{ rotateY: backInterpolate }] }]}>
          <Text style={styles.wordText}>{translation}</Text>
          {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
          <Button title="Запомнил" onPress={() => {
            setFlipped(false);  // Сбрасываем состояние переворота
            onDontKnow();       // Переход к следующей карточке
          }} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  card: {
    width: 300,
    height: 400,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backfaceVisibility: 'hidden',
  },
  wordText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default Card;
