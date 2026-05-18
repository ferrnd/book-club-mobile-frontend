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

// chave da api do arthur para integração
const CHAVE_RATS =
  "Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO";

export default function TelaBiblioteca() {
  const [carregando, setCarregando] = useState(true);
  const [rats, setRats] = useState(null);

  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
    const resp4 = await fetch("https://ratsjs.onrender.com/api/livros", {
      headers: { "x-api-key": CHAVE_RATS },
    });
    const data4 = await resp4.json();
    setRats(data4[0]);
    setCarregando(false);
  }

  // tela de carregamento que o du ensinou an sexta passada
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
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/ferrnd/book-club-mobile-backend/refs/heads/main/images/bookCover/icone-olhos-da-agua-preto.png",
          }}
          style={styles.logo}
        />
        <Text style={styles.headerT}>Clube Do Livro</Text>
      </View>
      
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
       <View style={styles.secao}>
  <Text style={styles.secaoT}>Biblioteca</Text>
  
  <View style={styles.linhaLivros}>
    
    <View style={[styles.card, styles.livroCard]}>
      <Image source={{ uri: rats.capa }} style={styles.livroCapa} />
      <View style={styles.info}>
        {rats.anoPublicacao && (
          <View style={styles.contorno}> 
            <Text style={styles.anoPublicacao}>{rats.anoPublicacao}</Text>
          </View>
        )}
      </View>
    </View>

    <View style={[styles.card, styles.livroCard]}>
      <Image source={{ uri: rats.capa }} style={styles.livroCapa} />
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.livroT}>{rats.titulo}</Text>
        <Text numberOfLines={1} style={styles.livroAutor}>{rats.autor}</Text>
        {rats.anoPublicacao && (
          <View style={styles.contorno}> 
            <Text style={styles.anoPublicacao}>{rats.anoPublicacao}</Text>
          </View>
        )}
      </View>
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
    padding: 20,
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#05407A",
    textTransform: "uppercase",
  },
    linhaLivros: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    backgroundColor: "#A8D4FF",
    borderRadius: 12,
    padding: 12,
    width: "48%", 
    marginBottom: 15,
  },

  livroCard: {
    flexDirection: "column",
    alignItems: "center",
  },

  livroCapa: {
    width: "100%",
    height: 190, 
    borderRadius: 6,
    marginBottom: 10,
  },

  info: {
    width: "100%",
    backgroundColor: "transparent", 
    padding: 0,
  },

  livroT: {
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "#000000",
    marginBottom: 3,
  },

  livroAutor: {
    fontSize: 13,
    textTransform: "capitalize",
    color: "#555555",
    marginBottom: 8,
  },

  contorno: {
    alignSelf: "flex-start",
    backgroundColor: "#5EAFFF",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },

  anoPublicacao: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
  },

  logo: {
    height: 35,
    width: 35,
    tintColor: "#05407A",
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
    backgroundColor: "#A8D4FF",
    borderRadius: 12,
    padding: 15,
    margin: 8,
    flex: 1,
  },

  explicacaoP: {
    fontSize: 16,
    lineHeight: 24,
    color: "#000000",
  },

  objt: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#5EAFFF",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 7,
    marginBottom: 7,
  },

  citacaoCaixa: {
    backgroundColor: "#5EAFFF",
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
    flexDirection: "column",
    alignItems: "center",
  },

  livroCapa: {
    width: 200,
    height: 280,
    borderRadius: 4,
    marginBottom: 20,
  },

  info: {
    width: "100%",
    backgroundColor: "#A8D4FF",
    borderRadius: 12,
    padding: 20,
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
    backgroundColor: "#5EAFFF",
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