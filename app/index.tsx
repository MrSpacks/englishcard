import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useWords } from "../context/WordsContext";
import AntDesign from "@expo/vector-icons/AntDesign";

interface Word {
  id: string;
  native: string;
  translation: string;
  imageUri?: string;
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
            {item.imageUri && (
              <Image source={{ uri: item.imageUri }} style={styles.wordImage} />
            )}
            <View style={styles.wordTextContainer}>
              <Text style={styles.wordText}>
                {item.native} - {item.translation}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteWord(item.id)}>
              <AntDesign name="delete" size={24} color="red" />
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
    backgroundColor: "#141414",
    padding: 20,
  },
  wordContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  wordImage: {
    width: 50,
    height: 50,
    marginRight: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(200, 200, 200, 0.2)",
  },
  wordTextContainer: {
    flex: 1,
  },
  wordText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default WordListScreen;
