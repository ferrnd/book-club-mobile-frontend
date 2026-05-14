import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function TelaInicial() {
  const [carregando, setCarregando] = useState(true);
  const [projeto, setProjeto] = useState(null);
  const [citacao, setCitacao] = useState(null);
  const [livro, setLivro] = useState(null);
  const [livroTheRats, setLivroTheRats] = useState(null);

  useEffect(() => {
    buscarDados()
  }, [])

  async function buscarDados() {
    setCarregando(false);
  }

  // tela de carregamento que o du ensinou na sexta passada
  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" color={'#fffffeff'} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0E6BA8" />

      <View style={styles.header}>
        <Text style={styles.clube}>Clube do Livro</Text>
        <Image
          source={{ uri: 'https://raw.githubusercontent.com/ferrnd/book-club-mobile-backend/refs/heads/main/images/bookCover/icone-olhos-da-agua-creme.png' }}
          style={styles.iconeOlho}
        />
      </View>

      <ScrollView contentContainerStyle={styles.tela}>
        <View style={{ height: 40 }} />
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E6BA8',
  },
  carregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0E6BA8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  clube: {
    marginTop: 30,
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 28,
    color: '#fffffeff',
  },
  iconeOlho: {
    width: 42,
    height: 42,
  },
  tela: {
    paddingHorizontal: 20,
    paddingBottom: 22,
  },
});