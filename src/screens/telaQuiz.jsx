import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Minha api
const URL_BASE = 'https://olhosdagua.onrender.com/api';
const CHAVE_API =
    '6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd';

export default function TelaQuiz() {
    const [quiz, setQuiz] = useState(null);
    const [carregando, setCarregando] = useState(true);


    useEffect(() => {
        buscarDados();
    }, []);
    async function buscarDados() {
        // puxando a tabela onde fica a explicacao do projeto
        const resp = await fetch(URL_BASE + '/quiz', {
            headers: { 'x-api-key': CHAVE_API },
        });
        const data = await resp.json();
        setQuiz(data[0]);
        setCarregando(false);



        // tela de carregamento que o du ensinou an sexta passada
        if (carregando) {
            return (
                <View style={styles.carregando}>
                    <ActivityIndicator size="large" color="#000000" />
                </View>
            );
        }
    }


    return (
        <SafeAreaView style={styles.safeArea}>
            <statusBar style="dark" />
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.secao}>
                    <Text style={styles.secaoTitulo}>quiz</Text>

                    <View style={styles.quiz}>
                        <Text style={styles.pergunta}>{quiz.pergunta_pt}</Text>

                        <View style={styles.containerOpcoes}>
                            <View style={styles.opcaoBotao}>
                                <Text style={styles.opcaoTexto}>A) {quiz.opcaoA_pt}</Text>
                            </View>

                            <View style={styles.opcaoBotao}>
                                <Text style={styles.opcaoTexto}>B) {quiz.opcaoB_pt}</Text>
                            </View>

                            <View style={styles.opcaoBotao}>
                                <Text style={styles.opcaoTexto}>C) {quiz.opcaoC_pt}</Text>
                            </View>

                            <View style={styles.opcaoBotao}>
                                <Text style={styles.opcaoTexto}>D) {quiz.opcaoD_pt}</Text>
                            </View>

                            <View style={styles.opcaoBotao}>
                                <Text style={styles.opcaoTexto}>E) {quiz.opcaoE_pt}</Text>
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
    padding: 25,
    paddingTop: 13,
    paddingBottom: 45,
  },

  carregando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffbfb",
  },

  secao: {
    marginBottom: 25,
  },

  secaoTitulo: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 15,
  }
});
