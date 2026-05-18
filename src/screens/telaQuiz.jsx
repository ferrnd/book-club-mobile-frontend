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
    const [carregando, setCarregando] = useState(true);
    const [quiz, setQuiz] = useState(null);

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

        const resp2 = await fetch('https://ratsjs.onrender.com/api/quiz', {
            headers: { 'x-api-key': CHAVE_RATS },
        });
    }


    // tela de carregamento que o du ensinou an sexta passada
    if (carregando) {
        return (
            <View style={styles.carregando}>
                <ActivityIndicator size="large" color="#000000" />
            </View>
        );
    }
}