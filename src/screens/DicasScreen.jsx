import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// Minha api
const URL_BASE = "https://olhosdagua.onrender.com/api";
const CHAVE_API =
  "6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd";

const CHAVE_RATS =
  "Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO";

export default function DicasScreen() {
  const [dicas, setDicas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarDicas();
  }, []);

  async function buscarDicas() {
    const resp = await fetch(URL_BASE + "/dicas", {
      headers: { "x-api-key": CHAVE_API },
    });
    const data = await resp.json();
    setDicas(data[0]);

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
      <View style={styles.header}>
        <Text style={styles.headerT}>Clube Do Livro</Text>
      </View>
      {/*Dicas*/}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >

         {carregando && <ActivityIndicator size="large" color="#1e225f" style={{ marginTop: 24 }} />}

         {dicas && (
            <View style={styles.card}>
                <Text style={styles.tipo}> {dicas.tipo_pt} </Text>
                 <Text style={styles.conteudo}>{dicas.conteudo_pt}</Text>
            </View>
         )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f4faffff",
  },

  container: {
    padding: 25,
    paddingTop: 45,
    paddingBottom: 45,
  },

  carregando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffbfb",
  },

  header: {
    paddingVertical: 22,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffffff",
    marginTop: 8,
  },

  headerT: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },

  logo: {
    height: 45,
    width: 45,
  },
  scroll: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#DDF1FF",
    borderRadius: 25,
    padding: 22,
    marginBottom: 25,
    minHeight: 180,
    justifyContent: "center",
  },
  tipo: {
    fontSize: 20,
    color: "#3D5A80",
    marginBottom: 18,
  },
  conteudo: {
    fontSize: 18,
    color: "#5B6B7A",
    lineHeight: 28,
  },
});
