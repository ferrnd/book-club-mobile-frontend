import { useState } from 'react';

export default function conto() {
    const [nome_pt, setNomeconto] = useState('');
    const [conto, setconto] = useState(null);
    const [loading, setLoading] = useState(false);

    async function buscarconto() {
        if (!nome_pt.trim()) {
            Alert.alert('Aviso', 'Digite o nome do conto');
            return;
        }

        setLoading(true);
        try {
            const resposta = await fetch(`https://olhosdagua.onrender.com/api/${conto}`);

            if (!resposta.ok) {
                Alert.alert('Erro');
                setconto(null);
                return;
            }

            const dados = await resposta.json();
            setconto(dados);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível conectar. Verifique sua internet.');
            setconto(null);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>📍Busca Pokemon</Text>

            <TextInput
                style={styles.input}
                placeholder="Digite o Nome do Pokemon"
                value={nome_pt}
                onChangeText={setNomeconto}
                keyboardType="text"></TextInput>

            <TouchableOpacity style={styles.botao} onPress={buscarconto}>
                <Text style={styles.botaoTexto}>Buscar</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#1565C0" style={styles.loader} />}

            {pokemon && (
                <View style={styles.resultado}>
                    <Text style={styles.item}>🔹 Nome: {conto.nome_pt}</Text>
                    <Text style={styles.item}>🔹 Nome em ingles: {conto.titulo_en}</Text>
                    <Text style={styles.item}>🔹 resulmo : {conto.resumo_pt}</Text>
                    <Text style={styles.item}>🔹 resulmo em ingles: {conto.resumo_en}</Text>
                    <Text style={styles.item}>🔹 analise: {conto.analise_pt}</Text>
                    <Text style={styles.item}>🔹 analise em ingles: {conto.analise_en}</Text>
                </View>
            )}
        </View>
    );
}
