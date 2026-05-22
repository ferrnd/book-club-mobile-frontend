import { View, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
    useFonts,
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_700Bold,
} from '@expo-google-fonts/nunito';

import { Outfit_400Regular, Outfit_700Bold, Outfit_800ExtraBold } from '@expo-google-fonts/outfit';

import TelaInicial from './src/screens/TelaInicial.jsx';
import TelaBiblioteca from './src/screens/TelaBiblioteca.jsx';
import TelaDicas from './src/screens/TelaDicas.jsx';
import TelaSobre from './src/screens/TelaSobre.jsx';
import TelaLivro from './src/screens/TelaLivro.jsx';


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
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
                    tabBarLabel: 'Início',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Book"
                component={TelaLivro}
                options={{
                    tabBarLabel: 'Livro',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="book" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Sobre"
                component={TelaSobre}
                options={{
                    tabBarLabel: 'Sobre',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="users" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="TelaBiblioteca"
                component={TelaBiblioteca}
                options={{
                    tabBarLabel: 'Biblioteca',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book" size={size} color={color} />
                    ),
                }}
            />
               
        </Tab.Navigator>
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
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={({ navigation }) => ({
                    headerShown: true, 
                    title: "Clube do Livro",
                    headerLeft: () => (
                        <TouchableOpacity 
                            onPress={() => navigation.openDrawer()}
                            style={{ marginLeft: 16 }}
                        >
                            <Image 
                                source={{ uri: "https://raw.githubusercontent.com/ferrnd/book-club-mobile-backend/refs/heads/main/images/bookCover/icone-olhos-da-agua-preto.png" }} 
                                style={{ width: 32, height: 32, resizeMode: 'contain' }} 
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
                    name="Home" 
                    component={TabNavigator}
                    options={{
                        drawerLabel: 'Início',
                        drawerIcon: ({ color }) => (
                            <Ionicons name="home" size={24} color={color} />
                        ),
                    }}
                />

                <Drawer.Screen
                    name="Dicas"
                    component={TelaDicas}
                    options={{
                        drawerLabel: 'Dicas',
                        drawerIcon: ({ color }) => (
                            <Ionicons name="information-circle" size={24} color={color} />
                        ),
                    }}
                />

                <Drawer.Screen
                    name="Sobre"
                    component={TelaSobre}
                    options={{
                        drawerLabel: 'Sobre',
                        drawerIcon: ({ color }) => (
                            <Ionicons name="information-circle" size={24} color={color} />
                        ),
                    }}
                />

            </Drawer.Navigator>
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