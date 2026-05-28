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
import { LanguageContext } from "../contexts/LanguageContext";

const URL_BASE = "https://olhosdagua.onrender.com/api";
const CHAVE_API =
  "6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd";

export default function TelaDicas() {
  const { lang } = useContext(LanguageContext);
  const pt = lang === "pt-br";

  const [dicas, setDicas] = useState([]);
  const [temas, setTemas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [livro, setLivro] = useState(null);
  const [indiceDica, setIndiceDica] = useState(0);

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

      const listaBruta = Array.isArray(data)
        ? data
        : data && Array.isArray(data.dados)
          ? data.dados
          : [];

      if (listaBruta.length > 0) {
        const apenasDicas = listaBruta.filter(
          (item) => item.tipo_pt === "Dicas de Vestibular sobre o Conteúdo",
        );
        setDicas(apenasDicas);

        const apenasTemas = listaBruta.filter(
          (item) =>
            item.tipo_pt ===
            "Possíveis temas de redação sobre o livro principal",
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

  function proximaDica() {
    setIndiceDica((prev) => (prev + 1) % dicas.length);
  }

  function dicaAnterior() {
    setIndiceDica((prev) => (prev - 1 + dicas.length) % dicas.length);
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
            {pt ? "Dicas de Vestibular" : "College Entrance Tips"}
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.caixaAzul}>
            <FontAwesome
              name="lightbulb-o"
              size={24}
              color="#ffffff"
              style={styles.icone}
            />
            <Text style={styles.caixaT}>
              {pt
                ? dicas[indiceDica].conteudo_pt
                : dicas[indiceDica].conteudo_en}
            </Text>
          </View>

          <View style={styles.divisor}>
            <View style={styles.divisorLinha} />
            <Text style={styles.divisorTexto}>
              {pt ? "Explicação" : "Explanation"}
            </Text>
            <View style={styles.divisorLinha} />
          </View>

          <Text style={styles.explicacaoT}>
            {pt
              ? dicas[indiceDica].explicacao_pt
              : dicas[indiceDica].explicacao_en}
          </Text>

          <View style={styles.navegacao}>
            <TouchableOpacity onPress={dicaAnterior} style={styles.seta}>
              <FontAwesome name="chevron-left" size={15} color="#5eafff" />
            </TouchableOpacity>

            <Text style={styles.indicador}>
              {indiceDica + 1} / {dicas.length}
            </Text>

            <TouchableOpacity onPress={proximaDica} style={styles.seta}>
              <FontAwesome name="chevron-right" size={15} color="#5eafff" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.secaoT}>
          {pt ? "Possíveis temas de redação" : "Possible essay topics"}
        </Text>

        {temas.map((item, index) => (
          <View key={item.id || index} style={styles.card}>
            <View style={styles.caixaMarrom}>
              <FontAwesome
                name="pencil"
                size={24}
                color="#ffffff"
                style={styles.icone}
              />
              <Text style={styles.caixaT}>
                {pt ? item.conteudo_pt : item.conteudo_en}
              </Text>
            </View>

            <View style={styles.divisor}>
              <View style={styles.divisorLinha} />
              <Text style={styles.divisorTexto}>
                {pt ? "Explicação" : "Explanation"}
              </Text>
              <View style={styles.divisorLinha} />
            </View>

            <Text style={styles.explicacaoT}>
              {pt ? item.explicacao_pt : item.explicacao_en}
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
    marginBottom: 21,
    marginTop: 4,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 20,
  },

  caixaAzul: {
    backgroundColor: "#5eafffff",
    borderRadius: 9,
    padding: 21,
    alignItems: "center",
    marginBottom: 10,
  },

  caixaMarrom: {
    backgroundColor: "#A48B73",
    borderRadius: 9,
    padding: 21,
    alignItems: "center",
    marginBottom: 10,
  },

  icone: {
    marginBottom: 9,
  },

  caixaT: {
    fontSize: 17,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
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

  divisorTexto: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#adadad",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  explicacaoT: {
    paddingHorizontal: 21,
    paddingBottom: 21,
    fontSize: 17,
    color: "#444444",
    lineHeight: 22,
    fontStyle: "italic",
    textAlign: "justify",
  },

  navegacao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 21,
    paddingVertical: 10,
    borderTopColor: "#f0f0f0",
  },

  seta: {
    padding: 11,
  },

  indicador: {
    fontSize: 12,
    color: "#a8a8a8",
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
