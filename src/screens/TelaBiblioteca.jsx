import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    ActivityIndicator,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LanguageContext } from '../contexts/LanguageContext';

const CHAVE_RATS = 'Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO';
const CHAVE_MORENINHA = 'entreLinhas123';
const CHAVE_MURILO = 'livr0';
const CHAVE_PEDRO = 'chaveSecreta';

export default function TelaBiblioteca({ navigation }) {
    const { lang } = useContext(LanguageContext);
    const pt = lang === 'pt-br';

    const [carregando, setCarregando] = useState(true);
    const [rats, setRats] = useState(null);
    const [moreninha, setMoreninha] = useState(null);
    const [pedro, setPedro] = useState(null);
    const [murilo, setMurilo] = useState(null);

    useEffect(() => {
        buscarDados();
    }, []);

    async function buscarDados() {
        try {
            const respRats = await fetch('https://ratsjs.onrender.com/api/livros', {
                headers: { 'x-api-key': CHAVE_RATS },
            });
            const dataRats = await respRats.json();
            setRats(dataRats[0]);

            const respMoreninha = await fetch(
                'https://clubelivro-backend.onrender.com/api/livros',
                { headers: { 'x-api-key': CHAVE_MORENINHA } },
            );
            const dataMoreninha = await respMoreninha.json();
            setMoreninha(dataMoreninha[0]);


            const respMurilo = await fetch('https://devstones-backend.onrender.com/api/livro', {
                headers: { 'x-api-key': CHAVE_MURILO },
            });
            const dataMurilo = await respMurilo.json();
            setMurilo(dataMurilo[0]);

            const respPedro = await fetch(
                'https://atividade-portugues-backend.onrender.com/api/livro',
                { headers: { 'x-api-key': CHAVE_PEDRO } },
            );
            const dataPedro = await respPedro.json();
            setPedro(dataPedro[0]);

        } catch (error) {
            console.error('Erro ao buscar dados das APIs: ', error);
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
                showsVerticalScrollIndicator={false}>
                <View style={styles.secao}>
                    <Text style={styles.secaoT}>{pt ? 'Biblioteca' : 'Library'}</Text>

                    <View style={styles.gridLivros}>
                        
                        {rats && (
                            <TouchableOpacity 
                                style={styles.card} 
                                onPress={() => navigation.navigate('TelaRats')}>
                                <View style={styles.infoTextos}>
                                    <Text style={styles.livroT} numberOfLines={2}>
                                        {rats?.titulo}
                                    </Text>
                                    <Text style={styles.livroAutor} numberOfLines={1}>
                                        {rats?.autor}
                                    </Text>
                                    {rats?.anoPublicacao && (
                                        <View style={styles.contorno}>
                                            <Text style={styles.anoPublicacao}>
                                                {rats.anoPublicacao}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <View style={styles.containerCapaMini}>
                                    <Image
                                        source={{ uri: rats?.capa }}
                                        style={styles.livroCapaMini}
                                    />
                                </View>
                            </TouchableOpacity>
                        )}

                        {murilo && (
                            <TouchableOpacity 
                                style={styles.card} 
                                onPress={() => navigation.navigate('TelaCaminho')}>
                                <View style={styles.infoTextos}>
                                    <Text style={styles.livroT} numberOfLines={3}>
                                        {murilo?.titulo}
                                    </Text>
                                    <Text style={styles.livroAutor} numberOfLines={1}>
                                        {murilo?.autor}
                                    </Text>
                                    {murilo?.anoPublicacao && (
                                        <View style={styles.contorno}>
                                            <Text style={styles.anoPublicacao}>
                                                {murilo.anoPublicacao}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <View style={styles.containerCapaMini}>
                                    <Image
                                        source={{ uri: murilo?.capa }}
                                        style={styles.livroCapaMini}
                                    />
                                </View>
                            </TouchableOpacity>
                        )}

                        {moreninha && (
                            <TouchableOpacity 
                                style={styles.card} 
                                onPress={() => navigation.navigate('TelaMoreninha')}>
                                <View style={styles.infoTextos}>
                                    <Text style={styles.livroT} numberOfLines={2}>
                                        {moreninha?.titulo}
                                    </Text>
                                    <Text style={styles.livroAutor} numberOfLines={2}>
                                        {moreninha?.autor}
                                    </Text>
                                    {moreninha?.anoPublicacao && (
                                        <View style={styles.contorno}>
                                            <Text style={styles.anoPublicacao}>
                                                {moreninha.anoPublicacao}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <View style={styles.containerCapaMini}>
                                    <Image
                                        source={{ uri: moreninha?.capa }}
                                        style={styles.livroCapaMini}
                                    />
                                </View>
                            </TouchableOpacity>
                        )}

                        {pedro && (
                            <TouchableOpacity 
                                style={styles.card} 
                                onPress={() => navigation.navigate('TelaNinar')}>
                                <View style={styles.infoTextos}>
                                    <Text style={styles.livroT} numberOfLines={3}>
                                        {pedro?.titulo}
                                    </Text>
                                    <Text style={styles.livroAutor} numberOfLines={1}>
                                        {pedro?.autor}
                                    </Text>
                                    {pedro?.anoPublicacao && (
                                        <View style={styles.contorno}>
                                            <Text style={styles.anoPublicacao}>
                                                {pedro.anoPublicacao}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <View style={styles.containerCapaMini}>
                                    <Image
                                        source={{ uri: pedro?.capa }}
                                        style={styles.livroCapaMini}
                                    />
                                </View>
                            </TouchableOpacity>
                        )}

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
        flexDirection: 'column',
    },
    card: {
        backgroundColor: '#BCE0FD',
        borderRadius: 16,
        padding: 16,
        width: '100%',
        height: 180,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    infoTextos: {
        flex: 1,
        height: '100%',
        justifyContent: 'space-between',
        paddingRight: 16,
    },
    livroT: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 4,
    },
    livroAutor: {
        fontSize: 16,
        color: '#555555',
    },
    contorno: {
        alignSelf: 'flex-start',
        backgroundColor: '#6CB7FF',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    anoPublicacao: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    containerCapaMini: {
        width: 100,
        height: '100%',
        backgroundColor: '#80C2FF',
        borderRadius: 10,
        overflow: 'hidden',
    },
    livroCapaMini: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});