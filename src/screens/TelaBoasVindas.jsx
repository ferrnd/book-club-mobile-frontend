import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LanguageContext } from "../contexts/LanguageContext";

export default function TelaBoasVindas({ navigation }) {
  const { lang } = useContext(LanguageContext);
  const pt = lang === "pt-br";

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/ferrnd/book-club-mobile-frontend/refs/heads/main/assets/agua-icone.png",
          }}
          style={styles.logo}
        />

        <Text style={styles.boasVindasT}>
          {pt ? "Seja Bem-vindo!" : "Welcome!"}
        </Text>

        <Text style={styles.boasVindasSbt}>
          {pt
            ? "Explore o universo literário de Olhos D'Água e outros contos incríveis."
            : "Explore the literary universe of Olhos D'Água and other amazing short stories."}
        </Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.botaoT}>
            {pt ? "Começar" : "Start"}
          </Text>
          <FontAwesome
            name="arrow-right"
            size={12}
            color="#ffffff"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4faffff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 35,
  },
  boasVindasT: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 12,
  },
  boasVindasSbt: {
    fontSize: 16,
    color: "#6b6b6b",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  botao: {
    backgroundColor: "#5eafffff",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  botaoT: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
