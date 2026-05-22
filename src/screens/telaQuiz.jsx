import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Minha api
const URL_BASE = 'https://olhosdagua.onrender.com/api';
const CHAVE_API =
    '6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd';

export default function TelaQuiz() {
    const [listaPerguntas, setListaPerguntas] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        buscarDados();
    }, []);

    async function buscarDados() {
        try {
            const resp = await fetch(URL_BASE + '/quiz', {
                headers: { 'x-api-key': CHAVE_API },
            });
            const data = await resp.json();
            
            if (data.dados) {
                setListaPerguntas(data.dados);
            } else {
                setListaPerguntas(data);
            }
        } catch (error) {
            console.log("Erro ao buscar dados:", error);
        } finally {
            setCarregando(false);
        }
    }

    // tela de carregamento que o du ensinou na sexta passada
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
                    <Text style={styles.secaoTitulo}>quiz</Text>
                    
                    {listaPerguntas.map((quiz, index) => (
                        <View key={index} style={styles.quizCard}>
                            
                            <Text style={styles.perguntas}>
                                Questão {index + 1}: {"\n"}
                                {quiz.pergunta_pt}
                            </Text>
                    
                            <View style={styles.opcaoBloco}>
                                <Text style={styles.opcaoTexto}><Text style={styles.letraDestaque}>A)</Text> {quiz.opcaoA_pt}</Text>
                            </View>

                            <View style={styles.opcaoBloco}>
                                <Text style={styles.opcaoTexto}><Text style={styles.letraDestaque}>B)</Text> {quiz.opcaoB_pt}</Text>
                            </View>

                            <View style={styles.opcaoBloco}>
                                <Text style={styles.opcaoTexto}><Text style={styles.letraDestaque}>C)</Text> {quiz.opcaoC_pt}</Text>
                            </View>

                            <View style={styles.opcaoBloco}>
                                <Text style={styles.opcaoTexto}><Text style={styles.letraDestaque}>D)</Text> {quiz.opcaoD_pt}</Text>
                            </View>

                            <View style={styles.opcaoBloco}>
                                <Text style={styles.opcaoTexto}><Text style={styles.letraDestaque}>E)</Text> {quiz.opcaoE_pt}</Text>
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
        textTransform: "uppercase",
    },
    quizCard: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e8f0',
        marginBottom: 20,
        elevation: 2,
    },
    perguntas: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 15,
        lineHeight: 22,
    },
    opcaoBloco: {
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    opcaoTexto: {
        fontSize: 14,
        color: '#334155',
    },
    letraDestaque: {
        fontWeight: "bold",
        color: "#05407A",
    },
});