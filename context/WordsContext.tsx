import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

interface Word {
  id: string;
  native: string;
  translation: string;
  imageUri?: string; // Добавлено свойство imageUri
}

interface WordsContextProps {
  words: Word[];
  addWord: (
    native: string,
    translation: string,
    imageUri?: string // Добавлено imageUri
  ) => Promise<void>;
  deleteWord: (id: string) => Promise<void>;
  loadWords: () => Promise<void>;
}

const WordsContext = createContext<WordsContextProps | undefined>(undefined);

export const WordsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [words, setWords] = useState<Word[]>([]);

  const loadWords = async () => {
    const storedWords = await AsyncStorage.getItem("@words_list");
    if (storedWords) {
      const parsedWords = JSON.parse(storedWords);
      setWords(parsedWords);
    }
  };

  const addWord = async (
    native: string,
    translation: string,
    imageUri?: string // Добавлено imageUri
  ) => {
    const newWord: Word = {
      id: uuid.v4().toString(),
      native,
      translation,
      imageUri, // Сохраняем imageUri
    };
    const updatedWords = [...words, newWord];
    setWords(updatedWords);
    await AsyncStorage.setItem("@words_list", JSON.stringify(updatedWords));
  };

  const deleteWord = async (id: string) => {
    const updatedWords = words.filter((word) => word.id !== id);
    setWords(updatedWords);
    await AsyncStorage.setItem("@words_list", JSON.stringify(updatedWords));
  };

  useEffect(() => {
    loadWords();
  }, []);

  return (
    <WordsContext.Provider value={{ words, addWord, deleteWord, loadWords }}>
      {children}
    </WordsContext.Provider>
  );
};

export const useWords = () => {
  const context = useContext(WordsContext);
  if (!context) {
    throw new Error("useWords must be used within a WordsProvider");
  }
  return context;
};
