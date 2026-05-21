import React, { useState, useEffect } from "react";
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

const URL_BASE = "https://olhosdagua.onrender.com/api";
const CHAVE_API = "6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd";

export default function TelaSobre() {
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
        setProjeto(Array.isArray(dataProjeto.dados) ? dataProjeto.dados[0] : dataProjeto.dados);
      } else {
        setProjeto(dataProjeto);
      }

      // Tratamento para extrair a lista de membros
      const listaMembros = Array.isArray(dataMembros) 
        ? dataMembros 
        : (dataMembros && Array.isArray(dataMembros.dados) ? dataMembros.dados : []);
      
      setMembros(listaMembros);

    } catch (error) {
      console.error("Erro ao carregar dados da Tela Sobre:", error);
    } finally {
      setCarregando(false);
    }
  }

  const abrirLink = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) => console.error("Não foi possível abrir o link", err));
    }
  };

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" color="#05407A" />
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
        <View style={styles.secaoMembros}>
          <Text style={styles.tituloSecao}>Sobre a Equipe</Text>
          
          {membros.map((membro, index) => (
            <View key={membro.id || index} style={styles.cardMembro}>
              <Image
                source={{ 
                  uri: membro.fotoUrl 
                }}
                style={styles.fotoMembro}
              />

              <View style={styles.infoMembro}>
                <Text style={styles.nomeMembro}>{membro.nome}</Text>
                <Text style={styles.cursoMembro}>{membro.curso_pt}</Text>
                
      
                <View style={styles.containerSociais}>
                  {membro.github ? (
                    <TouchableOpacity onPress={() => abrirLink(membro.github)} style={styles.botaoSocial}>
                      <Ionicons name="logo-github" size={20} color="#333" />
                    </TouchableOpacity>
                  ) : null}

                  {membro.linkedin ? (
                    <TouchableOpacity onPress={() => abrirLink(membro.linkedin)} style={styles.botaoSocial}>
                      <Ionicons name="logo-linkedin" size={20} color="#0077B5" />
                    </TouchableOpacity>
                  ) : null}

                  {membro.email ? (
                    <TouchableOpacity onPress={() => abrirLink(`mailto:${membro.email}`)} style={styles.botaoSocial}>
                      <Ionicons name="mail" size={20} color="#D44638" />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
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
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  tituloSecao: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 16,
  },
  secaoProjeto: {
    marginBottom: 24,
    width: "100%",
  },
  cardProjeto: {
    backgroundColor: "#BCE0FD",
    borderRadius: 16,
    padding: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tituloProjeto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#05407A",
    marginBottom: 8,
  },
  textoProjeto: {
    fontSize: 13,
    color: "#333333",
    lineHeight: 18,
    textAlign: "justify",
  },
  secaoMembros: {
    width: "100%",
  },
  cardMembro: {
    backgroundColor: "#BCE0FD",
    borderRadius: 16,
    padding: 14,
    width: "100%",
    flexDirection: "row", // Alinha imagem ao lado das informações
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  fotoMembro: {
    width: 65,
    height: 65,
    borderRadius: 32.5, // Mantém a foto 100% redonda
    backgroundColor: "#80C2FF",
    marginRight: 16,
  },
  infoMembro: {
    flex: 1,
    justifyContent: "center",
  },
  nomeMembro: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 2,
  },
  cursoMembro: {
    fontSize: 12,
    color: "#444444",
    marginBottom: 6,
  },
  containerSociais: {
    flexDirection: "row",
    alignItems: "center",
  },
  botaoSocial: {
    marginRight: 12,
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Fundo branco sutil atrás do ícone
    padding: 4,
    borderRadius: 6,
  },
});