import React, { useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
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
    <View style={{ flexDirection: "row" }}>
      {[...Array(fullStars)].map((_, i) => (
        <Ionicons key={`full-${i}`} name="star" size={14} color="#E9A825" />
      ))}
      {halfStar && <Ionicons name="star-half" size={14} color="#E9A825" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Ionicons key={`empty-${i}`} name="star-outline" size={14} color="#E9A825" />
      ))}
    </View>
  );
}

export default function MovieListScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const { user, logout } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      async function fetchMovies() {
        const response = await api.get("/movies");
        setMovies(response.data);
      }
      fetchMovies();
    }, [])
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>MyCinemaBox</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("MovieForm")}
          >
            <Ionicons name="add" size={22} color="#fff" />
          </TouchableOpacity>

          <View style={styles.userInfo}>
            <Ionicons name="person-circle-outline" size={22} color="#E9A825" />
            <Text style={styles.userName}>{user?.name || "Usuario"}</Text>
            <TouchableOpacity onPress={logout}>
              <Ionicons name="log-out-outline" size={18} color="#888" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("MovieDetail", { id: item.id })}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={styles.cardMeta}>
                <Text style={styles.cardYear}>{item.year}</Text>
                <Text style={styles.cardGenre}>{item.genre.name}</Text>
              </View>
              <StarRating rating={item.rating} />
            </View>
            <Ionicons name="chevron-forward" size={20} color="#555" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f1a",
  },
  header: {
    backgroundColor: "#1a1a2e",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E9A825",
  },
  headerTitle: {
    color: "#E9A825",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  addButton: {
    backgroundColor: "#E9A825",
    borderRadius: 20,
    padding: 6,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#0f0f1a",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  userName: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  list: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderLeftWidth: 3,
    borderLeftColor: "#E9A825",
  },
  cardContent: {
    flex: 1,
    gap: 6,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardMeta: {
    flexDirection: "row",
    gap: 8,
  },
  cardYear: {
    color: "#888",
    fontSize: 13,
  },
  cardGenre: {
    color: "#E9A825",
    fontSize: 13,
  },
});