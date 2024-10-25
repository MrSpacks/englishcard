import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface Word {
  id: string;
  native: string;
  translation: string;
}

const AddWordScreen = () => {
  const [nativeWord, setNativeWord] = useState('');
  const [translation, setTranslation] = useState('');
  const router = useRouter();

  const STORAGE_KEY = '@words_list';

  // Функция генерации уникального id
  const generateId = () => Date.now().toString() + Math.floor(Math.random() * 1000).toString();

  // Функция для добавления нового слова
  const handleAddWord = async () => {
    if (!nativeWord || !translation) {
      Alert.alert('Ошибка', 'Введите слово и перевод');
      return;
    }

    const newWord: Word = {
      id: generateId(),  // Генерируем уникальный id
      native: nativeWord,
      translation: translation,
    };

    try {
      const storedWords = await AsyncStorage.getItem(STORAGE_KEY);
      const wordsList = storedWords ? JSON.parse(storedWords) : [];

      // Обновляем список слов и сохраняем в AsyncStorage
      const updatedWords = [...wordsList, newWord];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWords));

      // Очищаем поля ввода и возвращаемся на экран списка
      setNativeWord('');
      setTranslation('');
      router.push('/'); // Возвращаемся на главный экран
    } catch (error) {
      console.error('Failed to add word to storage', error);
      Alert.alert('Ошибка', 'Не удалось сохранить слово');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Слово на родном языке"
        value={nativeWord}
        onChangeText={setNativeWord}
      />
      <TextInput
        style={styles.input}
        placeholder="Перевод"
        value={translation}
        onChangeText={setTranslation}
      />
      <Button title="Добавить" onPress={handleAddWord} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
});

export default AddWordScreen;
