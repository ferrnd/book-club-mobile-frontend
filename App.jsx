import { View } from 'react-native';

import {
    useFonts,
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_700Bold,
} from '@expo-google-fonts/nunito';

import { Outfit_400Regular, Outfit_700Bold, Outfit_800ExtraBold } from '@expo-google-fonts/outfit';

import TelaInicial from './src/screens/TelaInicial.jsx';
import TelaAutor from './src/screens/TelaAutor.jsx';
import TelaMembro from './src/screens/TelaMembro.jsx';
import TelaPersonagens from './src/screens/TelaPersonagens.jsx';

export default function App() {
    const [carregado] = useFonts({
        Nunito_400Regular,
        Nunito_400Regular_Italic,
        Nunito_700Bold,
        Outfit_400Regular,
        Outfit_700Bold,
        Outfit_800ExtraBold,
    });

    // se a fonte ainda n carregou n mostra nd
    if (!carregado) return null;

    return (
        <View style={{ flex: 1 }}>
            <TelaInicial />
        </View>
    );
}
