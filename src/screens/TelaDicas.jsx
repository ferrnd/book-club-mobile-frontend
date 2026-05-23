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

const URL_BASE = "https://olhosdagua.onrender.com/api";
const CHAVE_API =
  "6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd";

const CHAVE_RATS =
  "Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO";

export default function TelaDicas() {
  const [dicas, setDicas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [temas, setTemas] = useState([]);
  const [livro, setLivro] = useState(null);

  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
    try {
      const respLivro = await fetch(`${URL_BASE}/livro`, {
        headers: { "x-api-key": CHAVE_API },
      });
      const dataLivro = await respLivro.json();
      setLivro(dataLivro[0]);

      const response = await fetch(`${URL_BASE}/dicas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": CHAVE_API,
        },
      });
      const data = await response.json();

      console.log("O QUE VEIO DA API CORRIGIDO:", data);

      const listaBruta = Array.isArray(data) ? data : (data && Array.isArray(data.dados) ? data.dados : []);

      if (listaBruta.length > 0) {
        const apenasDicas = listaBruta.filter(
          (item) => item.tipo_pt === "Dicas de Vestibular sobre o Conteúdo"
        );
        setDicas(apenasDicas);
      } else {
        console.warn("A API autenticou, mas retornou uma lista sem dados.");
      }

      if (listaBruta.length > 0) {
        const apenasTemas = listaBruta.filter(
          (item) => item.tipo_pt === "Possíveis temas de redação sobre o livro principal"
        );
        setTemas(apenasTemas);
      } else {
        console.warn("A API autenticou, mas retornou uma lista sem dados.");
      }

    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setCarregando(false);
    }
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
          <Text style={styles.cabecalhoSbt}>Dicas de conteúdo</Text>
        </View>

        {dicas.map((item, index) => (
          <View key={item.id || index} style={styles.card}>
            <Text style={styles.curiosidadeTexto}>{item.conteudo_pt}</Text>
            <Text style={styles.numero}>
              {String(index + 1).padStart(2, "0")}
            </Text>
          </View>
        ))}

        <Text style={styles.secaoT}>Possíveis temas de redação</Text>

        {temas.map((item, index) => (
          <View key={item.id || index} style={styles.card}>
            <Text style={styles.curiosidadeTexto}>{item.conteudo_pt}</Text>
            <Text style={styles.numero}>
              {String(index + 1).padStart(2, "0")}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4faffff",
  },

  carregando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4faffff",
  },

  container: {
    padding: 25,
    paddingTop: 13,
    paddingBottom: 45,
  },

  cabecalho: {
    alignItems: "center",
    marginBottom: 28,
  },

  capaLivro: {
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
    backgroundColor: "#5eafff",
    borderRadius: 2,
    marginBottom: 16,
  },

  cabecalhoSbt: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 8,
  },

  secaoT: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 20,
    marginTop: 12,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    flexDirection: "column",
    gap: 14,
  },

  numero: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#5eafff",
  },

  curiosidadeTexto: {
    flex: 1,
    fontSize: 17,
    color: "#333",
    textTransform: "capitalize",
    padding: 1
  },
});