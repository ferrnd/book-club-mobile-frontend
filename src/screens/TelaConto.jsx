import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { LanguageContext } from "../contexts/LanguageContext";

const URL_BASE = "https://olhosdagua.onrender.com/api";
const CHAVE_API =
  "6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd";

export default function TelaContos({ navigation }) {
  const { lang } = useContext(LanguageContext);
  const pt = lang === "pt-br";

  const [carregando, setCarregando] = useState(true);
  const [contos, setContos] = useState([]);
  const [indiceConto, setIndiceConto] = useState(0);
  const [livro, setLivro] = useState(null);

  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
    const resp2 = await fetch(URL_BASE + "/contos", {
      headers: { "x-api-key": CHAVE_API },
    });
    const data2 = await resp2.json();
    setContos(data2);

    const resp3 = await fetch(URL_BASE + "/livro", {
      headers: { "x-api-key": CHAVE_API },
    });
    const data3 = await resp3.json();
    setLivro(data3[0]);

    setCarregando(false);
  }

  function proximoConto() {
    setIndiceConto((prev) => (prev + 1) % contos.length);
  }

  function contoAnterior() {
    setIndiceConto(
      (prev) => (prev - 1 + contos.length) % contos.length,
    );
  }

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cabecalho}>
          <Image source={{ uri: livro.capa }} style={styles.capaLivro} />
          <Text style={styles.cabecalhoT}>{livro.titulo}</Text>
          <Text style={styles.cabecalhoAutor}>{livro.autor}</Text>
          <View style={styles.cabecalhoDivisor} />
          <Text style={styles.cabecalhoSbt}>
            {pt ? "Contos e Análises" : "Short Stories and Analyses"}
          </Text>
        </View>

        <View style={styles.contoCard}>
          <Text style={styles.nome}>
            {pt ? contos[indiceConto].titulo_pt : contos[indiceConto].titulo_en}
          </Text>

          <View style={styles.contoCaixa}>
            <Entypo
              name="pencil"
              size={24}
              color="#ffffffff"
              style={styles.iconeconto}
            />
            <View style={styles.divisorLinha1} />
            <Text style={styles.divisorTexto1}>
              {pt ? "Resumo" : "Summary"}
            </Text>
            <View style={styles.divisorLinha1} />
            <Text style={styles.frase}>
              {pt
                ? contos[indiceConto].resumo_pt
                : contos[indiceConto].resumo_en}
            </Text>
          </View>

          <View style={styles.divisor}>
            <View style={styles.divisorLinha} />
            <Text style={styles.divisorTexto}>
              {pt ? "Análise" : "Analysis"}
            </Text>
            <View style={styles.divisorLinha} />
          </View>

          <Text style={styles.explicacaoTexto}>
            {pt
              ? contos[indiceConto].analise_pt
              : contos[indiceConto].analise_en}
          </Text>

          <View style={styles.navegacao}>
            <TouchableOpacity onPress={contoAnterior} style={styles.seta}>
              <FontAwesome name="chevron-left" size={15} color="#A48B73" />
            </TouchableOpacity>

            <Text style={styles.navegacaoIndicador}>
              {indiceConto + 1} / {contos.length}
            </Text>

            <TouchableOpacity onPress={proximoConto} style={styles.seta}>
              <FontAwesome name="chevron-right" size={15} color="#A48B73" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    paddingBottom: 45,
  },

  carregando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffbfb",
  },

  contoCaixa: {
    marginBottom: 10,
    backgroundColor: "#A48B73",
    borderRadius: 9,
    padding: 21,
    alignItems: "center",
  },

  iconeconto: {
    marginBottom: 9,
  },

  frase: {
    fontSize: 17,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 16,
  },
  
  nome: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontSize: 13,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#000000ff",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  contoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 18,
  },

  divisor: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    marginVertical: 15,
  },

  divisorLinha: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },

  divisorLinha1: {
    flex: 1,
    height: 1,
    backgroundColor: "#ffffffff",
  },

  divisorTexto: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#adadad",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  divisorTexto1: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#ffffffff",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 15,
  },

  explicacaoTexto: {
    paddingHorizontal: 18,
    paddingBottom: 18,
    fontSize: 18,
    color: "#444444",
    lineHeight: 21,
    fontStyle: "italic",
    textAlign: "justify",
  },

  navegacao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderTopColor: "#f0f0f0",
  },

  seta: {
    padding: 8,
  },

  navegacaoIndicador: {
    fontSize: 12,
    color: "#a8a8a8",
    fontWeight: "bold",
    letterSpacing: 1,
  },

  cabecalho: {
    alignItems: "center",
    marginBottom: 24,
  },

  capaLivro: {
    alignItems: "center",
    justifyContent: "center",
    width: 210,
    height: 320,
    borderRadius: 8,
    marginBottom: 14,
  },

  cabecalhoT: {
    padding: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
    textAlign: "center",
    marginBottom: 4,
    textTransform: "capitalize",
  },

  cabecalhoAutor: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
    marginBottom: 16,
  },

  cabecalhoDivisor: {
    width: 400,
    height: 3,
    backgroundColor: "#A48B73",
    borderRadius: 2,
    marginBottom: 16,
  },

  cabecalhoSbt: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginTop: 7,
    marginBottom: 5,
  },
});