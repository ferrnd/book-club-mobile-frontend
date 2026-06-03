import { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
    useFonts,
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_700Bold,
} from '@expo-google-fonts/nunito';

import { Outfit_400Regular, Outfit_700Bold, Outfit_800ExtraBold } from '@expo-google-fonts/outfit';

import { LanguageProvider } from './src/contexts/LanguageProvider';
import { LanguageContext } from './src/contexts/LanguageContext';

import TelaInicial from './src/screens/TelaInicial.jsx';
import TelaBoasVindas from './src/screens/TelaBoasVindas.jsx';
import TelaBiblioteca from './src/screens/TelaBiblioteca.jsx';
import TelaDicas from './src/screens/TelaDicas.jsx';
import TelaSobre from './src/screens/TelaSobre.jsx';
import TelaLivro from './src/screens/TelaLivro.jsx';
import TelaVideoaula from './src/screens/TelaVideoaula.jsx';
import TelaAutor from './src/screens/TelaAutor.jsx';
import TelaCuriosidades from './src/screens/TelaCuriosidades.jsx';
import TelaCitacoes from './src/screens/TelaCitacoes.jsx';
import telaQuiz from './src/screens/telaQuiz.jsx';
import TelaPersonagem from './src/screens/TelaPersonagens.jsx';
import TelaConfiguracoes from './src/screens/TelaConfiguracoes.jsx';
import TelaContos from './src/screens/TelaConto.jsx';
import TelaRats from './src/screens/TelaRats.jsx';
import TelaMoreninha from './src/screens/TelaMoreninha.jsx';
import TelaNinar from './src/screens/TelaNinar.jsx';
import TelaCaminho from './src/screens/TelaCaminho.jsx';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator({ pt }) {
    return (
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
                    tabBarLabel: pt ? 'Início' : 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="TelaLivro"
                component={TelaLivro}
                options={{
                    tabBarLabel: pt ? 'Livro' : 'Book',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="book" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="TelaCitacoes"
                component={TelaCitacoes}
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: 'none' },
                }}
            />
            <Tab.Screen
                name="Autor"
                component={TelaAutor}
                options={{
                    tabBarLabel: pt ? 'Autor' : 'Author',
                    tabBarIcon: ({ color, size }) => (
                        <Fontisto name="female" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="TelaBiblioteca"
                component={TelaBiblioteca}
                options={{
                    tabBarLabel: pt ? 'Biblioteca' : 'Library',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Configuracoes"
                component={TelaConfiguracoes}
                options={{
                    tabBarLabel: pt ? 'Configurações' : 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

function AppNavigator() {
    const { lang } = useContext(LanguageContext);
    const pt = lang === 'pt-br';

    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={({ navigation }) => ({
                    headerShown: true,
                    title: 'Clube do Livro',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.openDrawer()}
                            style={{ marginLeft: 16 }}>
                            <Image
                                source={{
                                    uri: 'https://raw.githubusercontent.com/ferrnd/book-club-mobile-frontend/refs/heads/main/assets/agua-icone.png',
                                }}
                                style={{ width: 50, height: 50, resizeMode: 'contain' }}
                            />
                        </TouchableOpacity>
                    ),
                    drawerStyle: {
                        backgroundColor: '#4AA1F3',
                        width: '80%',
                    },
                    drawerActiveTintColor: '#ffffff',
                    drawerInactiveTintColor: '#ccc',
                    drawerLabelStyle: { color: '#ffffff' },
                    drawerContentStyle: {
                        backgroundColor: '#94a5b6',
                    },
                })}>
                <Drawer.Screen
                    name="BoasVindas"
                    component={TelaBoasVindas}
                    options={{
                        headerShown: false,
                        swipeEnabled: false,
                        drawerItemStyle: { display: 'none' },
                    }}
                />

                <Drawer.Screen
                    name="Home"
                    options={{
                        drawerLabel: pt ? 'Início' : 'Home',
                        drawerIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
                    }}>
                    {() => <TabNavigator pt={pt} />}
                </Drawer.Screen>

                <Drawer.Screen
                    name="Livro"
                    component={TelaLivro}
                    options={{
                        drawerLabel: pt ? 'Livro' : 'Book',
                        drawerIcon: ({ color }) => <Entypo name="book" size={24} color={color} />,
                    }}
                />
                <Drawer.Screen
                    name="Autor"
                    component={TelaAutor}
                    options={{
                        drawerLabel: pt ? 'Autor' : 'Author',
                        drawerIcon: ({ color }) => (
                            <Fontisto name="female" size={24} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Biblioteca"
                    component={TelaBiblioteca}
                    options={{
                        drawerLabel: pt ? 'Biblioteca' : 'Library',
                        drawerIcon: ({ color }) => <Ionicons name="book" size={24} color={color} />,
                    }}
                />
                <Drawer.Screen
                    name="TelaContos"
                    component={TelaContos}
                    options={{
                        drawerLabel: pt ? 'Contos' : 'Short Stories',
                        drawerIcon: ({ color }) => (
                            <MaterialIcons name="book" size={24} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Citações"
                    component={TelaCitacoes}
                    options={{
                        drawerLabel: pt ? 'Citações' : 'Quotes',
                        drawerIcon: ({ color }) => (
                            <MaterialCommunityIcons name="comment-quote" size={24} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="TelaPersonagens"
                    component={TelaPersonagem}
                    options={{
                        drawerLabel: pt ? 'Personagens' : 'Characters',
                        drawerIcon: ({ color }) => (
                            <FontAwesome6 name="person" size={24} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Telaquiz"
                    component={telaQuiz}
                    options={{
                        drawerLabel: pt ? 'Quiz' : 'Quiz',
                        drawerIcon: ({ color }) => (
                            <MaterialIcons name="question-answer" size={24} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Video Aulas"
                    component={TelaVideoaula}
                    options={{
                        drawerLabel: pt ? 'Vídeo Aulas' : 'Video Lessons',
                        drawerIcon: ({ color }) => (
                            <FontAwesome name="video-camera" size={24} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Dicas"
                    component={TelaDicas}
                    options={{
                        drawerLabel: pt ? 'Dicas' : 'Tips',
                        drawerIcon: ({ color }) => (
                            <Ionicons name="information-circle" size={24} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Curiosidades"
                    component={TelaCuriosidades}
                    options={{
                        drawerLabel: pt ? 'Curiosidades' : 'Fun Facts',
                        drawerIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="comment-question"
                                size={24}
                                color={color}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="TelaRats"
                    component={TelaRats}
                    options={{
                        drawerLabel: pt ? 'Os Ratos' : 'The Rats',
                        drawerIcon: ({ color }) => (
                            <FontAwesome6 name="book-bookmark" size={24} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="TelaMoreninha"
                    component={TelaMoreninha}
                    options={{
                        drawerLabel: pt ? 'A Moreninha' : 'The Little Brown Girl',
                        drawerIcon: ({ color }) => (
                            <FontAwesome6 name="book-bookmark" size={24} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="TelaNinar"
                    component={TelaNinar}
                    options={{
                        drawerLabel: pt
                            ? 'Canção Para Ninar Menino Grande'
                            : 'Lullaby for a Big Boy',
                        drawerIcon: ({ color }) => (
                            <FontAwesome6 name="book-bookmark" size={24} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="TelaCaminho"
                    component={TelaCaminho}
                    options={{
                        drawerLabel: pt ? 'O Caminho Das Pedras' : 'The Path of Stones',
                        drawerIcon: ({ color }) => (
                            <FontAwesome6 name="book-bookmark" size={24} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Equipe"
                    component={TelaSobre}
                    options={{
                        drawerLabel: pt ? 'Sobre' : 'About',
                        drawerIcon: ({ color }) => (
                            <FontAwesome5 name="users" size={24} color={color} />
                        ),
                    }}
                />

                <Drawer.Screen
                    name="Configurações"
                    component={TelaConfiguracoes}
                    options={{
                        drawerLabel: pt ? 'Configurações' : 'Settings',
                        drawerIcon: ({ color }) => (
                            <Ionicons name="settings" size={24} color={color} />
                        ),
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

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
        <LanguageProvider>
            <AppNavigator />
        </LanguageProvider>
    );
}

const styles = StyleSheet.create({
    containerCarregando: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fbfdff',
    },
});
