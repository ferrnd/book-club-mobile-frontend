import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// Minha api
const URL_BASE = "https://olhosdagua.onrender.com/api";
const CHAVE_API =
  "6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd";

const CHAVE_RATS =
  "Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO";

export default function TelaDicas() {
  const [dicas, setDicas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
     try {
    const response = await fetch(`${URL_BASE}/dicas`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "x-api-key": CHAVE_API 
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

    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setCarregando(false);
    }
  }


    return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
    
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.secao}>
          <Text style={styles.secaoT}>Dicas de temas de redação</Text>
          
          <View style={styles.gridLivros}>
            {dicas.map((item, index) => (
              <View key={item.id || index} style={styles.card}>
                <View style={styles.infoTextos}>
                  <Text style={styles.livroT}>
                    {item.conteudo_pt}
                  </Text>
                </View>
              </View>
            ))}
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
  secao: {
    width: "100%",
  },
  secaoT: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 20,
  },
  gridLivros: {
    flexDirection: "column", 
    width: "100%",
  },
  card: {
    backgroundColor: "#BCE0FD", 
    borderRadius: 16,
    padding: 16, 
    width: "100%",
    minHeight: 90, 
    justifyContent: "center",
    marginBottom: 16,
    

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2, 
  },
  infoTextos: {
    width: "100%",
  },
  livroT: {
    fontSize: 14, 
    fontWeight: "600",
    color: "#000000",
    lineHeight: 20, 
  },
});
