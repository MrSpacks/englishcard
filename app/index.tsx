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
import AntDesign from "@expo/vector-icons/AntDesign";

// Определяем тип для каждого слова
interface Word {
  id: string;
  native: string;
  translation: string;
}

const STORAGE_KEY = "@words_list";

const WordListScreen = () => {
  const router = useRouter();
  const { loadWords, words: contextWords } = useWords();

  useFocusEffect(
    useCallback(() => {
      loadWords();
    }, [])
  );

  const handleDeleteWord = async (id: string) => {
    const updatedWords = contextWords.filter((word) => word.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWords));
    loadWords();
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
              <Text style={styles.deleteButton}>
                <AntDesign name="delete" size={24} color="black" />
              </Text>
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
