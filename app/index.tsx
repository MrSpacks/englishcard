import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface Word {
  id: string;
  native: string;
  translation: string;
}

const WordListScreen = () => {
  const [words, setWords] = useState<Word[]>([]);
  const router = useRouter();

  // Ключ для хранения данных в AsyncStorage
  const STORAGE_KEY = '@words_list';

  // Функция для загрузки слов из AsyncStorage при монтировании компонента
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

  // Функция для сохранения слов в AsyncStorage
  const saveWords = async (newWords: Word[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newWords));
      setWords(newWords);
    } catch (error) {
      console.error('Failed to save words to storage', error);
    }
  };

  // Функция для удаления слова
  const handleDeleteWord = (id: string) => {
    const updatedWords = words.filter(word => word.id !== id);
    saveWords(updatedWords); // Сохраняем обновленный список
  };

  return (
    <View style={styles.container}>
      {/* <Button title="Добавить" onPress={() => router.push('/add')} /> */}
      <FlatList
        data={words}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.wordContainer}>
            <Text>{item.native} - {item.translation}</Text>
            <TouchableOpacity onPress={() => handleDeleteWord(item.id)}>
              <Text style={styles.deleteButton}>Удалить</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {/* <Button title="Учить слова" onPress={() => router.push('/learn')} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  wordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deleteButton: {
    color: 'red',
  },
});

export default WordListScreen;
