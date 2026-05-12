import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";

// {fernando 15:46 } testando a conexão com a API usando fetch

const API_URL = "https://olhosdagua.onrender.com/api/livro";
const API_KEY =
  "6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd";

export default function App() {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);

  async function buscarLivros() {
    try {
      const resposta = await fetch(API_URL, {
        headers: { "x-api-key": API_KEY },
      });
      const dados = await resposta.json();
      setLivros(dados);
    } catch (error) {
      console.log(error);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarLivros();
  }, []);

  if (carregando) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={livros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.capa }} style={styles.foto} />
            <Text>--------------------------------------------</Text>
            <Text>Título: {item.titulo}</Text>
            <Text>--------------------------------------------</Text>
            <Text>Autor: {item.autor}</Text>
            <Text>--------------------------------------------</Text>
            <Text>ano de publicação: {item.anoPublicacao}</Text>
            <Text>--------------------------------------------</Text>
            <Text>Resumo: {item.resumo}</Text>
            <Text>--------------------------------------------</Text>
            <Text>resume: {item.resumo_en}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  foto: {
    width: 100,
    height: 150,
  },
});
