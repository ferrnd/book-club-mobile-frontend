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

const CHAVE_MURILO = 'livr0';

export default function TelaInicial({ navigation }) {
  const { lang } = useContext(LanguageContext);
  const pt = lang === "pt-br";

  const [carregando, setCarregando] = useState(true);
  const [caminho, setCaminho] = useState(null);
  const [personagens, setPersonagens] = useState([]);

  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
    try {

      const resp5 = await fetch('https://devstones-backend.onrender.com/api/livro', {
        headers: { 'x-api-key': CHAVE_MURILO },
      });
      const data5 = await resp5.json();
      setCaminho(data5[0]);

      const respPersonagens = await fetch('https://devstones-backend.onrender.com/api/personagem', {
        headers: { 'x-api-key': CHAVE_MURILO },
      });
      const dataPersonagens = await respPersonagens.json();
      setPersonagens(dataPersonagens);
      
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
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
        <View style={styles.secao}>
          <Text style={styles.secaoT}>
            {pt ? "Sobre a Obra" : "About the Work"}
          </Text>
          <View style={[styles.card, styles.livroCard]}>
            <View>
              <Image source={{ uri: caminho.capa }} style={styles.livroCapa} />
            </View>

            <View style={styles.info}>
              <Text style={styles.livroT}>{caminho.titulo}</Text>
              <Text style={styles.livroAutor}>{caminho.autor}</Text>
              <View style={styles.contorno}>
                <Text style={styles.anoPublicacao}>{caminho.anoPublicacao}</Text>
              </View>
              <Text style={styles.livroGenero}>
                {pt ? caminho.genero : caminho.genero_en}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.secao}>
          <View style={styles.card}>
            <Text style={styles.subt}>{pt ? "Resumo" : "Summary"}</Text>
            <View style={styles.divisor} />
            <Text style={styles.explicacaoP}>
              {pt ? caminho.resumo : caminho.resumo_en}
            </Text>
          </View>
        </View>

        <View style={styles.secao}>
          <View style={styles.card}>
            <Text style={styles.subt}>
              {pt ? "Contexto da Obra" : "Work Context"}
            </Text>
            <View style={styles.divisor} />
            <Text style={styles.explicacaoP}>
              {pt ? caminho.contexto : caminho.contexto_en}
            </Text>
          </View>
        </View>

        <View style={styles.secao}>
          <View style={styles.card}>
            <Text style={styles.subt}>{pt ? "Enredo" : "Plot"}</Text>
            <View style={styles.divisor} />
            <Text style={styles.explicacaoP}>
              {pt ? caminho.enredo : caminho.enredo_en}
            </Text>
          </View>
        </View>

        <View style={styles.secao}>
          <View style={styles.card}>
            <Text style={styles.subt1}>{pt ? "Personagens" : "Characters"}</Text>
            <View style={styles.tagsContainer}>
              {personagens.map((personagem, index) => (
                <View key={index} style={styles.chip}>
                  <FontAwesome
                    name="user"
                    size={12}
                    color="#cd0000ff"
                    style={{ marginRight: 7 }}
                  />
                  <Text style={styles.chipT}>{personagem.nome}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.secao}>
          <View style={styles.card}>
            <Text style={styles.subt}>
              {pt ? "Características Literárias" : "Literary Characteristics"}
            </Text>
            <View style={styles.divisor} />
            <Text style={styles.explicacaoP}>
              {pt
                ? caminho.caracteristicasLiterarias
                : caminho.caracteristicasLiterarias_en}
            </Text>
          </View>
        </View>

        <View style={styles.secao}>
          <View style={styles.card}>
            <Text style={styles.subt}>{pt ? "Conclusão" : "Conclusion"}
            </Text>
              <View style={styles.divisor} />
            <Text style={styles.explicacaoP}>
              {pt ? caminho.conclusao : caminho.conclusao_en}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f4faffff',
    },

    container: {
        padding: 25,
        paddingTop: 13,
        paddingBottom: 45,
    },

    carregando: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fffbfb',
    },

    secao: {
        marginBottom: 25,
    },

    secaoT: {
        marginTop: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 15,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 9,
        padding: 21,
    },

    subt: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#cd0000ff',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: 7,
    },
    subt1: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#cd0000ff',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: 7,
        marginBottom: 12,
    },

    explicacaoP: {
        fontSize: 16,
        lineHeight: 24,
        color: '#000000',
        textAlign: 'justify',
    },

    livroCard: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    livroCapa: {
        width: 150,
        height: 200,
        borderRadius: 5,
    },

    info: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },

    livroT: {
        fontSize: 19,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#000000',
        marginBottom: 5,
    },

    livroAutor: {
        padding: 1,
        fontSize: 15.5,
        textTransform: 'capitalize',
        color: '#6b6b6b',
        marginBottom: 12,
    },

    livroGenero: {
        marginTop: 12,
        padding: 1,
        fontSize: 10,
        textTransform: 'uppercase',
        color: '#6b6b6b',
        flexShrink: 1,
    },

    contorno: {
        alignSelf: 'flex-start',
        backgroundColor: '#cd0000ff',
        paddingVertical: 7,
        paddingHorizontal: 14,
        borderRadius: 5,
    },

    anoPublicacao: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
    },

    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 10,
        marginBottom: 20,
    },

    chip: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(205, 0, 0, 0.11)"',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
    },

    chipT: {
        fontSize: 14,
        color: '#cd0000ff',
        fontWeight: '500',
    },

    saibaMais1: {
        marginTop: 5,
        marginBottom: 20,
        backgroundColor: 'rgba(0, 140, 255, 0.64)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    botaoT: {
        color: '#ffffff',
        fontSize: 9,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },

    divisor: {
        width: 355,
        height: 2,
        backgroundColor: '#cd0000ff',
        marginVertical: 15,
    },
});