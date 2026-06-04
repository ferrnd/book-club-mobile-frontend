import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    SafeAreaView
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { LanguageContext } from '../contexts/LanguageContext';
import YoutubePlayer from 'react-native-youtube-iframe';

const URL_BASE = "https://olhosdagua.onrender.com/api";
const CHAVE_API = "6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd";

export default function TelaVideoAula() {
    const { lang } = useContext(LanguageContext);
    const pt = lang === "pt-br";

    const [carregando, setCarregando] = useState(true);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        buscarDados();
    }, []);

    async function buscarDados() {
        const resp = await fetch(URL_BASE + "/videoaula", {
            headers: { "x-api-key": CHAVE_API },
        });
        const data = await resp.json();
        setVideos(data);
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
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {videos.map((video, index) => (
                    <View key={index} style={styles.secao}>
                        <View style={styles.card}>
                            <Text style={styles.titulo}>
                                {pt ? video.titulo_pt : video.titulo_en}
                            </Text>
                            
                            <View style={styles.video}>
                                <YoutubePlayer
                                    height={200}
                                    videoId={video.url}
                                />
                            </View>

                            <Text style={styles.descricao}>
                                {pt ? video.descricao_pt : video.descricao_en}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f4faff',
    },
    
    container: {
        padding: 25,
        paddingTop: 25,
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

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 9,
        padding: 21,
        justifyContent: 'center',
    },

    titulo: {
        fontSize: 18,
        alignItems: 'center',
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#8a4c00',
        textAlign: 'center',
    },

    video: {
        borderRadius: 9,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 15,
    },

    descricao: {
        fontSize: 15,
        lineHeight: 22,
        color: '#333333',
        textAlign: 'justify',
    }
});