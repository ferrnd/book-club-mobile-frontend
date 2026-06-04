import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LanguageContext } from "../contexts/LanguageContext";

const URL_BASE = "https://olhosdagua.onrender.com/api";
const CHAVE_API =
  "6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd";

export default function TelaSobre() {
  const { lang } = useContext(LanguageContext);
  const pt = lang === "pt-br";

  function t(obj, campo) {
    if (!obj) return "";
    if (pt) {
      return obj[`${campo}_pt`] ?? obj[campo];
    } else {
      return obj[`${campo}_en`];
    }
  }

  const [carregando, setCarregando] = useState(true);
  const [projeto, setProjeto] = useState(null);
  const [membros, setMembros] = useState([]);

  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
    try {
      const headersConfig = {
        "Content-Type": "application/json",
        "x-api-key": CHAVE_API,
      };

      const [resProjeto, resMembros] = await Promise.all([
        fetch(`${URL_BASE}/projeto`, { method: "GET", headers: headersConfig }),
        fetch(`${URL_BASE}/membros`, { method: "GET", headers: headersConfig }),
      ]);

      const dataProjeto = await resProjeto.json();
      const dataMembros = await resMembros.json();

      if (Array.isArray(dataProjeto)) {
        setProjeto(dataProjeto[0]);
      } else if (dataProjeto && dataProjeto.dados) {
        setProjeto(
          Array.isArray(dataProjeto.dados)
            ? dataProjeto.dados[0]
            : dataProjeto.dados,
        );
      } else {
        setProjeto(dataProjeto);
      }

      const listaMembros = Array.isArray(dataMembros)
        ? dataMembros
        : dataMembros && Array.isArray(dataMembros.dados)
          ? dataMembros.dados
          : [];

      setMembros(listaMembros);
    } catch (error) {
      console.error("Erro ao carregar dados da Tela Sobre:", error);
    } finally {
      setCarregando(false);
    }
  }

  const abrirLink = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) =>
        console.error("Não foi possível abrir o link", err),
      );
    }
  };

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
          <View style={styles.card}>
            <Text style={styles.objt}>{pt ? "Objetivo" : "Objective"}</Text>
            <Text style={styles.explicacaoP}>{t(projeto, "objetivo")}</Text>
          </View>
        </View>
        <View style={styles.secaoMembros}>
          <Text style={styles.tituloSecao}>
            {pt ? "Sobre a Equipe" : "About the Team"}
          </Text>

          {membros.map((membro, index) => (
            <View key={membro.id || index} style={styles.cardMembro}>
              <Image
                source={{ uri: membro.fotoUrl }}
                style={styles.fotoMembro}
              />

              <View style={styles.infoMembro}>
                <Text style={styles.nomeMembro}>{membro.nome}</Text>
                <Text style={styles.cursoMembro}>
                  {pt ? membro.curso_pt : membro.curso_en}
                </Text>

                <View style={styles.containerSociais}>
                  {membro.github ? (
                    <TouchableOpacity
                      onPress={() => abrirLink(membro.github)}
                      style={styles.botaoSocial}
                    >
                      <Ionicons name="logo-github" size={20} color="#333" />
                    </TouchableOpacity>
                  ) : null}

                  {membro.linkedin ? (
                    <TouchableOpacity
                      onPress={() => abrirLink(membro.linkedin)}
                      style={styles.botaoSocial}
                    >
                      <Ionicons
                        name="logo-linkedin"
                        size={20}
                        color="#0077B5"
                      />
                    </TouchableOpacity>
                  ) : null}

                  {membro.email ? (
                    <TouchableOpacity
                      onPress={() => abrirLink(`mailto:${membro.email}`)}
                      style={styles.botaoSocial}
                    >
                      <Ionicons name="mail" size={20} color="#D44638" />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>

              <Text style={styles.numero}>
                {String(index + 1).padStart(2, "0")}
              </Text>
            </View>
          ))}
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
  card: {
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    padding: 21,
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
  explicacaoP: {
    fontSize: 16,
    lineHeight: 24,
    color: "#000000",
    textAlign: "justify",
  },
  tituloSecao: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  secaoMembros: {
    width: "100%",
  },
  cardMembro: {
    backgroundColor: "#ffffff",
    borderRadius: 7,
    padding: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  fotoMembro: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#f4faffff",
    marginRight: 20,
  },
  infoMembro: {
    flex: 1,
    justifyContent: "center",
  },
  nomeMembro: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 4,
  },
  cursoMembro: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  containerSociais: {
    flexDirection: "row",
    alignItems: "center",
  },
  botaoSocial: {
    marginRight: 12,
    backgroundColor: "#f4faffff",
    padding: 6,
    borderRadius: 8,
  },
  numero: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#5eafff",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
