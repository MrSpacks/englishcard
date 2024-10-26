import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useWords } from "../context/WordsContext";

// Определяем тип для каждого слова
interface Word {
  id: string;
  native: string;
  translation: string;
}

const STORAGE_KEY = "@words_list";

const WordListScreen = () => {
  const [words, setWords] = useState<Word[]>([]); // Указываем, что words - это массив объектов типа Word
  const router = useRouter();
  const { loadWords, words: contextWords } = useWords();

  useFocusEffect(
    useCallback(() => {
      loadWords();
    }, [contextWords])
  );

  const handleDeleteWord = async (id: string) => {
    const updatedWords = words.filter((word) => word.id !== id);
    setWords(updatedWords);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWords));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contextWords}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.wordContainer}>
            <Text>
              {item.native} - {item.translation}
            </Text>
            <TouchableOpacity onPress={() => handleDeleteWord(item.id)}>
              <Text style={styles.deleteButton}>Удалить</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  wordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  deleteButton: {
    color: "red",
  },
});

export default WordListScreen;
