import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { useWords } from "../context/WordsContext";
import * as ImagePicker from "expo-image-picker";

const AddWordScreen = () => {
  const [nativeWord, setNativeWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const router = useRouter();
  const { addWord } = useWords();

  const handleAddWord = async () => {
    if (!nativeWord || !translation) {
      Alert.alert("Ошибка", "Введите слово и перевод");
      return;
    }

    await addWord(nativeWord, translation, imageUri);
    setNativeWord("");
    setTranslation("");
    setImageUri(undefined);
    router.back();
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Ошибка", "Разрешение на доступ к медиатеке отклонено");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
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
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Выбрать изображение</Text>
      </TouchableOpacity>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}
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
  imagePicker: {
    backgroundColor: "#ddd",
    padding: 10,
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 5,
  },
  imagePickerText: {
    color: "#000",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
});

export default AddWordScreen;
