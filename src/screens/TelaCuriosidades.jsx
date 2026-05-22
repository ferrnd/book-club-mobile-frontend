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

const URL_BASE = "https://olhosdagua.onrender.com/api";
const CHAVE_API = "6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd";

export default function TelaCuriosidades() {
    const [carregando, setCarregando] = useState(true);
    const [curiosidades, setCuriosidades] = useState([]);

    useEffect(() => {
        buscarDados();
    }, []);

    async function buscarDados() {
        try {
            const response = await fetch(`${ URL_BASE }/dicas`, {
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
                const apenasCuriosidades = listaBruta.filter(
                    (item) => item.tipo_pt === "Curiosidades"
                );
                setCuriosidades(apenasCuriosidades);
            } else {
                console.warn("A API autenticou, mas retornou uma lista sem dados.");
            }

        } catch (error) {
            console.error("Erro na requisição:", error);
        } finally {
            setCarregando(false);
        }
    }

    if (carregando) {
        return (
            <View style={styles.carregando}>
                <ActivityIndicator size="large" color="#05407A" />
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
                    <Text style={styles.secaoT}>Curiosidades</Text>

                    <View style={styles.gridLivros}>
                        {curiosidades.map((item, index) => (
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