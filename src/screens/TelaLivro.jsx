import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LanguageContext } from "../contexts/LanguageContext";

const URL_BASE = "https://olhosdagua.onrender.com/api";
const CHAVE_API =
  "6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd";

const CHAVE_RATS =
  "Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO";

export default function TelaInicial() {
  const { lang } = useContext(LanguageContext);
  const pt = lang === "pt-br";

  const [carregando, setCarregando] = useState(true);
  const [projeto, setProjeto] = useState(null);
  const [citacao, setCitacao] = useState(null);
  const [livro, setLivro] = useState(null);
  const [rats, setRats] = useState(null);

  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
    const resp = await fetch(URL_BASE + "/projeto", {
      headers: { "x-api-key": CHAVE_API },
    });
    const data = await resp.json();
    setProjeto(data[0]);

    const resp2 = await fetch(URL_BASE + "/citacao", {
      headers: { "x-api-key": CHAVE_API },
    });
    const data2 = await resp2.json();
    setCitacao(data2[7]);

    const resp3 = await fetch(URL_BASE + "/livro", {
      headers: { "x-api-key": CHAVE_API },
    });
    const data3 = await resp3.json();
    setLivro(data3[0]);

    const resp4 = await fetch("https://ratsjs.onrender.com/api/livros", {
      headers: { "x-api-key": CHAVE_RATS },
    });
    const data4 = await resp4.json();
    setRats(data4[0]);

    setCarregando(false);
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
        <View style={styles.secao}>
          <Text style={styles.secaoT}>
            {pt ? "Sobre a Obra" : "About the Work"}
          </Text>
          <View style={[styles.card, styles.livroCard]}>
            <View>
              <Image source={{ uri: livro.capa }} style={styles.livroCapa} />
            </View>

            <View style={styles.info}>
              <Text style={styles.livroT}>{livro.titulo}</Text>
              <Text style={styles.livroAutor}>{livro.autor}</Text>
              <View style={styles.contorno}>
                <Text style={styles.anoPublicacao}>{livro.anoPublicacao}</Text>
              </View>
              <Text style={styles.livroGenero}>
                {pt ? livro.genero : livro.genero_en}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.secao}>
          <ScrollView style={styles.card} nestedScrollEnabled={true}>
            <Text style={styles.subt}>{pt ? "Resumo" : "Summary"}</Text>
            <Text style={styles.explicacaoP}>
              {pt ? livro.resumo : livro.resumo_en}
            </Text>
          </ScrollView>
        </View>

        <View style={styles.secao}>
          <ScrollView style={styles.card} nestedScrollEnabled={true}>
            <Text style={styles.subt}>
              {pt ? "Contexto da Obra" : "Work Context"}
            </Text>
            <Text style={styles.explicacaoP}>
              {pt ? livro.contexto : livro.contexto_en}
            </Text>
          </ScrollView>
        </View>

        <View style={styles.secao}>
          <ScrollView style={styles.card} nestedScrollEnabled={true}>
            <Text style={styles.subt}>{pt ? "Enredo" : "Plot"}</Text>
            <Text style={styles.explicacaoP}>
              {pt ? livro.enredo : livro.enredo_en}
            </Text>
          </ScrollView>
        </View>

        <View style={styles.secao}>
          <View style={styles.card1}>
            <Text style={styles.subt}>{pt ? "Personagens" : "Characters"}</Text>
            {livro.personagens.map((personagem, index) => (
              <Text key={index} style={styles.perso}>
                • {personagem}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.secao}>
          <ScrollView style={styles.card} nestedScrollEnabled={true}>
            <Text style={styles.subt}>
              {pt ? "Características Literárias" : "Literary Characteristics"}
            </Text>
            <Text style={styles.explicacaoP}>
              {pt
                ? livro.caracteristicasLiterarias
                : livro.caracteristicasLiterarias_en}
            </Text>
          </ScrollView>
        </View>

        <View style={styles.secao}>
          <ScrollView style={styles.card} nestedScrollEnabled={true}>
            <Text style={styles.subt}>{pt ? "Conclusão" : "Conclusion"}</Text>
            <Text style={styles.explicacaoP}>
              {pt ? livro.conclusao : livro.conclusao_en}
            </Text>
          </ScrollView>
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

  secao: {
    marginBottom: 25,
  },

  secaoT: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    padding: 21,
    maxHeight: 350,
    paddingHorizontal: 30,
  },

  card1: {
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    padding: 21,
  },

  subt: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#5eafffff",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 7,
    marginBottom: 7,
  },

  explicacaoP: {
    fontSize: 16,
    lineHeight: 24,
    color: "#000000",
    textAlign: "justify",
    marginBottom: 50,
  },
  perso: {
    fontSize: 16,
    lineHeight: 24,
    color: "#000000",
    textAlign: "justify",
  },

  livroCard: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },

  livroCapa: {
    width: 150,
    height: 200,
    borderRadius: 5,
  },

  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },

  livroT: {
    fontSize: 19,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "#000000",
    marginBottom: 5,
  },

  livroAutor: {
    padding: 1,
    fontSize: 15.5,
    textTransform: "capitalize",
    color: "#6b6b6b",
    marginBottom: 12,
  },

  autorDetalhe: {
    fontSize: 14,
    color: "#4a4a4a",
    marginBottom: 4,
  },

  livroGenero: {
    marginTop: 12,
    padding: 1,
    fontSize: 10,
    textTransform: "uppercase",
    color: "#6b6b6b",
    flexShrink: 1,
  },

  contorno: {
    alignSelf: "flex-start",
    backgroundColor: "#5eafffff",
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 5,
  },

  anoPublicacao: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
