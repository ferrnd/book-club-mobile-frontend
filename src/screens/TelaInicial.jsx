import React, { useState, useEffect } from "react";
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

const URL_BASE = "https://olhosdagua.onrender.com/api";
const CHAVE_API =
  "6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd";

const CHAVE_RATS =
  "Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO";

const CHAVE_MURILO = 
  "livr0"

const CHAVE_MORENINHA = 
"entreLinhas123";

export default function TelaInicial() {
  const [carregando, setCarregando] = useState(true);
  const [projeto, setProjeto] = useState(null);
  const [citacao, setCitacao] = useState(null);
  const [livro, setLivro] = useState(null);
  const [rats, setRats] = useState(null);
  const [murilo, setMurilo] = useState(null);
  const [moreninha, setMoreninha] = useState(null);

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

    const resp5 = await fetch("https://clubelivro-backend-zui4.onrender.com/api/livro", {
      headers: { "x-api-key": CHAVE_MURILO },
    });
    const data5 = await resp5.json();
    setMurilo(data5[0]);

    const resp6 = await fetch("https://clubelivro-backend.onrender.com/api/livros", {
      headers: { "x-api-key": CHAVE_MORENINHA},
    });
    const data6 = await resp6.json();
    setMoreninha(data6[0]);

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
              <Text style={styles.livroGenero}>{livro.genero}</Text>
            </View>
          </View>
        </View>

        <View style={styles.secao}>
          <Text style={styles.secaoT}>Sobre o Projeto</Text>
          <View style={styles.card}>
            <Text style={styles.explicacaoP}>{projeto.apresentacao_pt}</Text>
          </View>
        </View>

        <View style={styles.secao}>
          <View style={styles.citacaoCaixa}>
            <FontAwesome
              name="quote-left"
              size={24}
              color="#ffffff"
              style={styles.iconeCitacao}
            />
            <Text style={styles.frase}>"{citacao.texto_pt}"</Text>
            <Text style={styles.dito}>— {citacao.personagem}</Text>
          </View>
        </View>

        <View style={styles.secao}>
          <View style={styles.card}>
            <Text style={styles.objt}>Objetivo</Text>
            <Text style={styles.explicacaoP}>{projeto.objetivo_pt}</Text>
          </View>
        </View>

        <View style={styles.secao}>
          <Text style={styles.secaoT}>Outras Obras Literárias</Text>
          <View style={[styles.card, styles.livroCard]}>
            <View>
              <Image source={{ uri: rats.capa }} style={styles.livroCapa} />
            </View>

<View style={styles.info}>
              <Text style={styles.livroT}>{rats.titulo}</Text>
              <Text style={styles.livroAutor}>{rats.autor}</Text>
              
              <View style={styles.contornoIntegracao}>
                <Text style={styles.anoPublicacao}>{rats.anoPublicacao}</Text>
              </View>
                <Text style={styles.livroGenero}>{rats.genero}</Text>

            </View>
          </View>

          <View style={[styles.card, styles.livroCard]}>
            <View>
              <Image source={{ uri: murilo.capa }} style={styles.livroCapa} />
            </View>

<View style={styles.info}>
              <Text style={styles.livroT}>{murilo.titulo}</Text>
              <Text style={styles.livroAutor}>{murilo.autor}</Text>
              
              <View style={styles.contornoIntegracao}>
                <Text style={styles.anoPublicacao}>{murilo.anoPublicacao}</Text>
              </View>
                <Text style={styles.livroGenero}>{murilo.genero}</Text>

            </View>
          </View>

          <View style={[styles.card, styles.livroCard]}>
            <View>
              <Image source={{ uri: moreninha.capa }} style={styles.livroCapa} />
            </View>

<View style={styles.info}>
              <Text style={styles.livroT}>{moreninha.titulo}</Text>
              <Text style={styles.livroAutor}>{moreninha.autor}</Text>
              
              <View style={styles.contornoIntegracao}>
                <Text style={styles.anoPublicacao}>{moreninha.anoPublicacao}</Text>
              </View>
                <Text style={styles.livroGenero}>{moreninha.genero}</Text>

            </View>
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

  header: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f4faffff",
  },

  headerT: {
    marginTop: 23,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },

  logo: {
    marginTop: 23,
    height: 35,
    width: 35,
  },

  secao: {
    marginBottom: 30,
  },

  secaoT: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 27,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    padding: 21,
  },

  explicacaoP: {
    fontSize: 16,
    lineHeight: 24,
    color: "#000000",
    textAlign: "justify",
  },

  objt: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#5eafffff",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 7,
    marginBottom: 7,
  },

  citacaoCaixa: {
    backgroundColor: "#5eafffff",
    borderRadius: 9,
    padding: 21,
    alignItems: "center",
  },

  iconeCitacao: {
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

  dito: {
    padding: 1,
    textTransform: "uppercase",
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: "bold",
    color: "#ffffff",
  },

  livroCard: {
    marginBottom: 20,
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

  contornoIntegracao: {
    alignSelf: "flex-start",
    backgroundColor: "rgb(0, 0, 0)",
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
