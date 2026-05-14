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

// minha api
const URL_BASE = "https://olhosdagua.onrender.com/api";
const CHAVE_API = "6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd";

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

    // projeto
    const resp = await fetch(URL_BASE + "/projeto", { headers: { "x-api-key": CHAVE_API } });
    const data = await resp.json();
    setProjeto(data[0]);

    // citacao - peguei a de indice 7 pq é a minha frase favorita da obra
    const resp2 = await fetch(URL_BASE + "/citacao", { headers: { "x-api-key": CHAVE_API } });
    const data2 = await resp2.json();
    setCitacao(data2[7]);

    // dados do livro, normal, esse que vai usar para integração
    const resp3 = await fetch(URL_BASE + "/livro", { headers: { "x-api-key": CHAVE_API } });
    const data3 = await resp3.json();
    setLivro(data3[0]);

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

        {projeto && (
          <View style={styles.projeto}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 12}}>
              <Feather name="info" size={24} color="#0E6BA8" />
              <Text style={styles.projetoT}>Sobre o Projeto</Text>
            </View>
            <Text style={styles.pApresentacao} numberOfLines={4}>
              {projeto.apresentacao_pt}
            </Text>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.lerMais}>Ler mais</Text>
              <Feather name="chevron-right" size={15} color="#0E6BA8" />
            </TouchableOpacity>
          </View>
        )}

        {citacao && (
          <View style={styles.secao}>
            <Text style={styles.liSecao}>Citação do Dia</Text>
            <ImageBackground
              source={{ uri: 'https://raw.githubusercontent.com/ferrnd/book-club-mobile-backend/refs/heads/main/images/bookCover/parte-tras.png' }}
              style={styles.frase}
              imageStyle={{borderRadius: 11}}
            >
              <View style={styles.corCima}>
                <Feather name="message-circle" size={28} color={'#fffffeff'} style={{marginBottom: 10}} />
                <Text style={styles.textopt}>"{citacao.texto_pt}"</Text>
                <View style={{marginTop: 20}}>
                  <View style={styles.traco} />
                  <Text style={styles.menci}>{citacao.personagem}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        )}

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
  projeto: {
    backgroundColor: '#fffffeff',
    borderRadius: 9,
    padding: 20,
    marginTop: 16,
    marginBottom: 24,
  },
  projetoT: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 18,
    color: '#0E6BA8',
    marginLeft: 8,
  },
  pApresentacao: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 15,
    color: '#123247',
    lineHeight: 22,
    marginBottom: 16,
  },
  lerMais: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 14,
    color: '#0E6BA8',
    marginRight: 4,
  },
  secao: {
    marginBottom: 32,
  },
  liSecao: {
    marginBottom: 22,
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 20,
    color: '#fffffeff',
  },
  frase: {
    width: '100%',
    minHeight: 220,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  corCima: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.79)',
    borderRadius: 11,
    padding: 24
  },
  textopt: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 20,
    color: '#0E6BA8',
    lineHeight: 30,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  traco: {
    width: 30,
    height: 3,
    backgroundColor: '#0E6BA8',
    marginBottom: 8,
  },
  menci: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    color: '#0E6BA8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: 'bold',
  },
});