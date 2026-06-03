import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LanguageContext } from "../contexts/LanguageContext";

export default function TelaBoasVindas({ navigation }) {
  const { lang } = useContext(LanguageContext);
  const pt = lang === "pt-br";

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Image
        source={{
          uri: "https://raw.githubusercontent.com/ferrnd/book-club-mobile-backend/refs/heads/main/images/bookCover/boas-vindas-sub.png",
        }}
        style={styles.background}
      />

      <View style={styles.card}>
        <Text style={styles.bemVindo}>
          {pt ? "Seja Bem-vindo!" : "Welcome!"}
        </Text>

        <Text style={styles.sbt}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-end",
  },

  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 30,
    paddingVertical: 55,
    alignItems: "center",
    shadowColor: "#000000ff",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 15,
    elevation: 25,
  },

  bemVindo: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 15,
  },

  sbt: {
    fontSize: 17,
    color: "#6b6b6b",
    textAlign: "center",
    marginBottom: 30,
  },

  botao: {
    backgroundColor: "#5eafffff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  
  botaoT: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
