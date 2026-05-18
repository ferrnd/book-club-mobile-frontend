import { View, ActivityIndicator, StyleSheet } from 'react-native';

import {
    useFonts,
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_700Bold,
} from '@expo-google-fonts/nunito';

import { Outfit_400Regular, Outfit_700Bold, Outfit_800ExtraBold } from '@expo-google-fonts/outfit';

import TelaInicial from './src/screens/TelaInicial.jsx';
import DicasScreen from './src/screens/DicasScreen.jsx';

export default function App() {
    const [carregado] = useFonts({
        Nunito_400Regular,
        Nunito_400Regular_Italic,
        Nunito_700Bold,
        Outfit_400Regular,
        Outfit_700Bold,
        Outfit_800ExtraBold,
    });

    if (!carregado) {
        return (
            <View style={styles.containerCarregando}>
                <ActivityIndicator size="large" color="#111" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TelaInicial />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffbfb',
    },
    containerCarregando: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fffbfb',
    }
});
