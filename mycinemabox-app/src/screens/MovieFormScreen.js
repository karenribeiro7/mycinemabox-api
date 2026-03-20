import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import api from "../services/api";

const ratingOptions = [
  1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5,
];

export default function MovieFormScreen({ route, navigation }) {
  const { movie } = route.params || {};

  const [title, setTitle] = useState(movie?.title || "");
  const [synopsis, setSynopsis] = useState(movie?.synopsis || "");
  const [year, setYear] = useState(String(movie?.year || ""));
  const [rating, setRating] = useState(movie?.rating || 5);
  const [genreId, setGenreId] = useState(movie?.genreId || null);
  const [comment, setComment] = useState(movie?.comment || "");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await api.get("/genres");
        setGenres(response.data);
        if (!movie && response.data.length > 0) {
          setGenreId(response.data[0].id);
        }
      } catch (error) {
        Alert.alert("Erro", "Nao foi possivel carregar os generos");
      }
    }
    fetchGenres();
  }, []);

  async function handleSubmit() {
    try {
      const data = {
        title,
        synopsis,
        year: Number(year),
        rating: Number(rating),
        genreId: Number(genreId),
        comment,
      };

      if (movie) {
        await api.put(`/movies/${movie.id}`, data);
        navigation.goBack();
      } else {
        await api.post("/movies", data);
        navigation.navigate("Movies")
      }
    } catch (error) {
      Alert.alert("Erro", error.response?.data?.error || "Erro ao salvar filme");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Titulo</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#555"
        placeholder="Ex: The Dark Knight"
      />

      <Text style={styles.label}>Sinopse</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={synopsis}
        onChangeText={setSynopsis}
        multiline
        numberOfLines={4}
        placeholderTextColor="#555"
        placeholder="Descreva o filme..."
      />

      <Text style={styles.label}>Ano</Text>
      <TextInput
        style={styles.input}
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
        placeholderTextColor="#555"
        placeholder="Ex: 2008"
      />

      <Text style={styles.label}>Genero</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={genreId}
          onValueChange={(value) => setGenreId(value)}
          style={styles.picker}
          dropdownIconColor="#E9A825"
        >
          {genres.map((genre) => (
            <Picker.Item
              key={genre.id}
              label={genre.name}
              value={genre.id}
              color="#000000"
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Nota</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={rating}
          onValueChange={(value) => setRating(value)}
          style={styles.picker}
          dropdownIconColor="#E9A825"
        >
          {ratingOptions.map((option) => (
            <Picker.Item
              key={option}
              label={`${option} ${option === 1 ? "estrela" : "estrelas"}`}
              value={option}
              color="#000000"
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Comentario</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={comment}
        onChangeText={setComment}
        multiline
        numberOfLines={3}
        placeholderTextColor="#555"
        placeholder="O que achou do filme?"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{movie ? "Atualizar" : "Criar"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f1a",
    padding: 24,
  },
  label: {
    color: "#E9A825",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#1a1a2e",
    color: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#2a2a4a",
    fontSize: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  pickerWrapper: {
    backgroundColor: "#1a1a2e",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2a2a4a",
    marginBottom: 20,
    overflow: "hidden",
  },
  picker: {
    color: "#fff",
    height: 50,
  },
  button: {
    backgroundColor: "#E9A825",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 40,
  },
  buttonText: {
    color: "#0f0f1a",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});