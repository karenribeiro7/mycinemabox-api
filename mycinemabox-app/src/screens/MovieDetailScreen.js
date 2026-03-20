import React, { useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function StarRating({ rating }) {
  if (!rating) return null;

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = Math.max(0, 5 - fullStars - (halfStar ? 1 : 0));

  return (
    <View style={{ flexDirection: "row", gap: 4 }}>
      {[...Array(fullStars)].map((_, i) => (
        <Ionicons key={`full-${i}`} name="star" size={24} color="#E9A825" />
      ))}
      {halfStar && <Ionicons name="star-half" size={24} color="#E9A825" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Ionicons key={`empty-${i}`} name="star-outline" size={24} color="#E9A825" />
      ))}
    </View>
  );
}

export default function MovieDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [movie, setMovie] = useState(null);
  const { token } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      async function fetchMovie() {
        const response = await api.get(`/movies/${id}`);
        setMovie(response.data);
      }
      fetchMovie();
    }, [id])
  );

  async function handleDelete() {
    Alert.alert("Confirmar", "Deseja deletar este filme?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Deletar",
        style: "destructive",
        onPress: async () => {
          await api.delete(`/movies/${id}`);
          navigation.goBack();
        },
      },
    ]);
  }

  if (!movie) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroSection}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.metaRow}>
          <View style={styles.genreBadge}>
            <Text style={styles.genreText}>{movie.genre.name}</Text>
          </View>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
        <StarRating rating={movie.rating} />
        <Text style={styles.ratingText}>{movie.rating} / 5</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sinopse</Text>
        <Text style={styles.synopsis}>{movie.synopsis}</Text>
      </View>

      {movie.comment && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comentario</Text>
          <View style={styles.commentBox}>
            <Ionicons name="chatbubble-outline" size={16} color="#E9A825" />
            <Text style={styles.comment}>{movie.comment}</Text>
          </View>
        </View>
      )}

      {token && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("MovieForm", { movie })}
          >
            <Ionicons name="pencil-outline" size={18} color="#fff" />
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={18} color="#fff" />
            <Text style={styles.deleteButtonText}>Deletar</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f1a",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0f0f1a",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
  },
  heroSection: {
    backgroundColor: "#1a1a2e",
    padding: 24,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E9A825",
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  genreBadge: {
    backgroundColor: "#E9A825",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  genreText: {
    color: "#0f0f1a",
    fontWeight: "bold",
    fontSize: 13,
  },
  year: {
    color: "#888",
    fontSize: 15,
  },
  ratingText: {
    color: "#888",
    fontSize: 13,
    marginTop: 4,
  },
  section: {
    padding: 24,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a2e",
  },
  sectionTitle: {
    color: "#E9A825",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  synopsis: {
    color: "#ccc",
    fontSize: 15,
    lineHeight: 24,
  },
  commentBox: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#1a1a2e",
    padding: 14,
    borderRadius: 10,
  },
  comment: {
    color: "#ccc",
    fontSize: 14,
    flex: 1,
    lineHeight: 22,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    padding: 24,
  },
  editButton: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    borderWidth: 1,
    borderColor: "#E9A825",
    borderRadius: 10,
    padding: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#8b0000",
    borderRadius: 10,
    padding: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});