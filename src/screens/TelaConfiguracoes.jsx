import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LanguageContext } from "../contexts/LanguageContext";

export default function TelaConfiguracoes() {
  const { lang, toggleLanguage } = useContext(LanguageContext);
  const pt = lang === "pt-br";

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>

        <View>
          <Text style={styles.secaoT}>
            {pt ? "Configurações" : "Settings"}
          </Text>

          <View style={styles.card}>
            <Text style={styles.topico}>
              {pt ? "Idioma" : "Language"}
            </Text>
            <TouchableOpacity
              style={styles.botaoIdioma}
              onPress={toggleLanguage}
            >
              <Text style={styles.botaoIdiomaT}>
                {pt ? " Mudar para Inglês" : " Switch to Portuguese"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

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
    padding: 25,
    paddingTop: 13,
  },

  secaoT: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 27,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    padding: 21,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  topico: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000000",
  },

  botaoIdioma: {
    backgroundColor: "#5eafffff",
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 5,
  },

  botaoIdiomaT: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 13,
  },
});