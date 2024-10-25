import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../components/Card'; // Импорт Card

interface Word {
  id: string;
  native: string;
  translation: string;
  imageUrl?: string;
}

const LearnScreen = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const STORAGE_KEY = '@words_list';

  useEffect(() => {
    const loadWords = async () => {
      try {
        const storedWords = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedWords) {
          setWords(JSON.parse(storedWords));
        }
      } catch (error) {
        console.error('Failed to load words from storage', error);
      }
    };
    loadWords();
  }, []);

  const handleKnow = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      Alert.alert('Уведомление', 'Вы прошли все слова!');
    }
  };

  const handleDontKnow = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      Alert.alert('Уведомление', 'Вы прошли все слова!');
    }
  };

  return (
    <View style={styles.container}>
      {words.length > 0 && currentIndex < words.length ? (
        <Card
          word={words[currentIndex].native}
          translation={words[currentIndex].translation}
          imageUrl={words[currentIndex].imageUrl}
          onKnow={handleKnow}
          onDontKnow={handleDontKnow}
        />
      ) : (
        <Text>Список слов пуст или все слова пройдены!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LearnScreen;
