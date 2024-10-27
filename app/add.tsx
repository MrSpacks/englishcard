import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { useWords } from "../context/WordsContext";
import * as ImagePicker from "expo-image-picker";
import Entypo from "@expo/vector-icons/Entypo";

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

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Ошибка", "Разрешение на использование камеры отклонено");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
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
      <TouchableOpacity style={styles.imagePicker} onPress={takePhoto}>
        <Text style={styles.imagePickerText}>Сделать фото</Text>
      </TouchableOpacity>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}
      <TouchableOpacity style={styles.button} onPress={handleAddWord}>
        <Entypo name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#2C2C2C",
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
  },
  imagePicker: {
    backgroundColor: "#2C2C2C",
    padding: 12,
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 8,
  },
  imagePickerText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    backgroundColor: "#333",
    borderRadius: 8,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#325AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#325AFF", // Насыщенный синий цвет для кнопок
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
});

export default AddWordScreen;
