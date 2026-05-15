import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

// minha api
const URL_BASE = 'https://olhosdagua.onrender.com/api';
const CHAVE_API =
    '6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd';

export default function TelaMembro() {
    const [carregando] = useState(true);
    const [membro, setMembro] = useState(null);

    useEffect(() => {
        buscarDados();
    }, []);

    async function buscarDados() {
        // membro
        const resp = await fetch(URL_BASE + '/membro', {
            headers: { 'x-api-key': CHAVE_API },
        });
        const data = await resp.json();
        setMembro(data[0]);

        // tela de carregamento que o du ensinou na sexta passada
        if (carregando) {
            return (
                <View style={styles.carregando}>
                    <ActivityIndicator size="large" color={'#fffffeff'} />
                </View>
            );
        }
    }
}
