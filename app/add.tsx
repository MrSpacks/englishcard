import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useWords } from "../context/WordsContext";

const AddWordScreen = () => {
  const [nativeWord, setNativeWord] = useState("");
  const [translation, setTranslation] = useState("");
  const router = useRouter();
  const { addWord } = useWords();

  const handleAddWord = async () => {
    if (!nativeWord || !translation) {
      Alert.alert("Ошибка", "Введите слово и перевод");
      return;
    }

    await addWord(nativeWord, translation);
    setNativeWord("");
    setTranslation("");
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Слово"
        value={nativeWord}
        onChangeText={setNativeWord}
        maxLength={18}
      />
      <TextInput
        style={styles.input}
        placeholder="Перевод"
        value={translation}
        onChangeText={setTranslation}
        maxLength={18}
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
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default AddWordScreen;
