import React, { useState, useEffect, useContext } from 'react';
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
import { LanguageContext } from '../contexts/LanguageContext';

const CHAVE_RATS = 'Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO';
const CHAVE_MORENINHA = 'entreLinhas123';
const CHAVE_MURILO = 'livr0';
const CHAVE_PEDRO = 'chaveSecreta';

export default function TelaBiblioteca() {
    const { lang } = useContext(LanguageContext);
    const pt = lang === "pt-br";

    const [carregando, setCarregando] = useState(true);
    const [rats, setRats] = useState(null);
    const [moreninha, setMoreninha] = useState(null);
    const [murilo, setMurilo] = useState(null);
    const [pedro, setPedro] = useState(null);

    useEffect(() => {
        buscarDados();
    }, []);

    async function buscarDados() {
        try {
            const respRats = await fetch('https://ratsjs.onrender.com/api/livros', {
                headers: { 'x-api-key': CHAVE_RATS },
            });
            const dataRats = await respRats.json();
            setRats(dataRats);
            const respMoreninha = await fetch(
                'https://clubelivro-backend.onrender.com/api/livros',
                { headers: { 'x-api-key': CHAVE_MORENINHA } }
            );
            const dataMoreninha = await respMoreninha.json();
            setMoreninha(Array.isArray(dataMoreninha) ? dataMoreninha[0] : dataMoreninha);
        } catch (error) {
            console.error('Erro ao buscar dados da Moreninha: ', error);
        }

        try {
            const respMurilo = await fetch(
                'https://clubelivro-backend-zui4.onrender.com/api/livro',
                { headers: { 'x-api-key': CHAVE_MURILO } }
            );
            const dataMurilo = await respMurilo.json();
            setMurilo(Array.isArray(dataMurilo) ? dataMurilo[0] : dataMurilo);
        } catch (error) {
            console.error('Erro ao buscar dados do Murilo: ', error);
        }

        try {
            const respPedro = await fetch(
                'https://atividade-portugues-backend.onrender.com/api/livro',
                { headers: { 'x-api-key': CHAVE_PEDRO } },
            );
            const dataPedro = await respPedro.json();
            setPedro(Array.isArray(dataPedro) ? dataPedro[0] : dataPedro);
        } catch (error) {
            console.error('Erro ao buscar dados da API do Pedro: ', error);
        } finally {
            setCarregando(false);
        }
    }

    if (carregando) {
        return (
            <View style={styles.carregando}>
                <ActivityIndicator size='large' color='#05407A' />
            </View>
        );
    }

    const listaRats = Array.isArray(rats) ? rats : rats ? [rats] : [];
    const listaMoreninha = Array.isArray(moreninha) ? moreninha : moreninha ? [moreninha] : [];
    const listaMurilo = Array.isArray(murilo) ? murilo : murilo ? [murilo] : [];
    const listaPedro = Array.isArray(pedro) ? pedro : pedro ? [pedro] : [];

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark" />
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}>
                <View style={styles.secao}>
                    <Text style={styles.secaoT}>
                        {pt ? "Biblioteca" : "Library"}
                    </Text>

                    <View style={styles.gridLivros}>
                        {listaRats.map((livro, index) => (
                            <View key={'rats-' + index} style={styles.card}>
                                <View style={styles.infoTextos}>
                                    <Text style={styles.livroT} numberOfLines={2}>
                                        {livro?.titulo}
                                    </Text>
                                    <Text style={styles.livroAutor} numberOfLines={1}>
                                        {livro?.autor}
                                    </Text>
                                    {livro?.anoPublicacao && (
                                        <View style={styles.contorno}>
                                            <Text style={styles.anoPublicacao}>
                                                {livro.anoPublicacao}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <View style={styles.containerCapaMini}>
                                    <Image
                                        source={{ uri: livro?.capa }}
                                        style={styles.livroCapaMini}
                                    />
                                </View>
                            </View>
                        ))}

                        {listaMoreninha.map((livro, index) => (
                            <View key={'moreninha-' + index} style={styles.card}>
                                <View style={styles.infoTextos}>
                                    <Text style={styles.livroT} numberOfLines={2}>
                                        {livro?.titulo}
                                    </Text>
                                    <Text style={styles.livroAutor} numberOfLines={1}>
                                        {livro?.autor}
                                    </Text>
                                    {livro?.anoPublicacao && (
                                        <View style={styles.contorno}>
                                            <Text style={styles.anoPublicacao}>
                                                {livro.anoPublicacao}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <View style={styles.containerCapaMini}>
                                    <Image
                                        source={{ uri: livro?.capa }}
                                        style={styles.livroCapaMini}
                                    />
                                </View>
                            </View>
                        ))}

                        {listaMurilo.map((livro, index) => (
                            <View key={'murilo-' + index} style={styles.card}>
                                <View style={styles.infoTextos}>
                                    <Text style={styles.livroT} numberOfLines={2}>
                                        {livro?.titulo}
                                    </Text>
                                    <Text style={styles.livroAutor} numberOfLines={1}>
                                        {livro?.autor}
                                    </Text>
                                    {livro?.anoPublicacao && (
                                        <View style={styles.contorno}>
                                            <Text style={styles.anoPublicacao}>
                                                {livro.anoPublicacao}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <View style={styles.containerCapaMini}>
                                    <Image
                                        source={{ uri: livro?.capa }}
                                        style={styles.livroCapaMini}
                                    />
                                </View>
                            </View>
                        ))}

                        {listaPedro.map((livro, index) => (
                            <View key={'pedro-' + index} style={styles.card}>
                                <View style={styles.infoTextos}>
                                    <Text style={styles.livroT} numberOfLines={2}>
                                        {livro?.titulo}
                                    </Text>
                                    <Text style={styles.livroAutor} numberOfLines={1}>
                                        {livro?.autor}
                                    </Text>
                                    {livro?.anoPublicacao && (
                                        <View style={styles.contorno}>
                                            <Text style={styles.anoPublicacao}>
                                                {livro.anoPublicacao}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <View style={styles.containerCapaMini}>
                                    <Image
                                        source={{ uri: livro?.capa }}
                                        style={styles.livroCapaMini}
                                    />
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
        backgroundColor: '#f4faffff',
    },
    carregando: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fffbfb',
    },
    container: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 40,
    },
    secao: {
        width: '100%',
    },
    secaoT: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 20,
    },
    gridLivros: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#BCE0FD',
        borderRadius: 16,
        padding: 12,
        width: '48%',
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    infoTextos: {
        flex: 1,
        height: '100%',
        justifyContent: 'space-between',
        paddingRight: 6,
    },
    livroT: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
    },
    livroAutor: {
        fontSize: 11,
        color: '#555555',
        marginTop: -2,
    },
    contorno: {
        alignSelf: 'flex-start',
        backgroundColor: '#6CB7FF',
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
    anoPublicacao: {
        color: '#ffffff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    containerCapaMini: {
        width: 45,
        height: '100%',
        backgroundColor: '#80C2FF',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    livroCapaMini: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});