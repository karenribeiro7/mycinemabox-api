import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f1a" />

      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo.jpeg")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>MyCinemaBox</Text>
        <Text style={styles.subtitle}>Seu catalogo de filmes pessoal</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.registerButtonText}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#11111c",
    justifyContent: "space-between",
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 500,
    height: 500,
    marginBottom: 16,
  },
  title: {
    color: "#E9A825",
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  subtitle: {
    color: "#888",
    fontSize: 16,
  },
  buttons: {
    gap: 12,
  },
  loginButton: {
    backgroundColor: "#E9A825",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#0f0f1a",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
  registerButton: {
    borderWidth: 1,
    borderColor: "#E9A825",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#E9A825",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});