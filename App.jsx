import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
    useFonts,
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_700Bold,
} from '@expo-google-fonts/nunito';

import { Outfit_400Regular, Outfit_700Bold, Outfit_800ExtraBold } from '@expo-google-fonts/outfit';
import TelaInicial from './src/screens/TelaInicial.jsx';
import DicasScreen from './src/screens/DicasScreen.jsx';
function TelaBiblioteca() {
    return <View style={{ flex: 1, backgroundColor: '#F6FBFF' }} />;
}
function ProjetosScreen() {
    return <View style={{ flex: 1, backgroundColor: '#F6FBFF' }} />;
}

const Tab = createBottomTabNavigator();

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
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: '#4AA1F3',
                    tabBarInactiveTintColor: '#999999',
                    tabBarStyle: {
                        backgroundColor: '#FFFFFF',
                        borderTopColor: '#E8F3FF',
                        borderTopWidth: 1,
                        height: 60,
                        paddingBottom: 8,
                    },
                }}>
                <Tab.Screen
                    name="Inicio"
                    component={TelaInicial}
                    options={{
                        tabBarLabel: 'Início',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Biblioteca"
                    component={TelaBiblioteca}
                    options={{
                        tabBarLabel: 'Biblioteca',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="book" size={size} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    containerCarregando: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fbfdff',
    }
    });