import { useContext } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import {
  useFonts,
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import {
  Outfit_400Regular,
  Outfit_700Bold,
  Outfit_800ExtraBold,
} from "@expo-google-fonts/outfit";

import { LanguageProvider } from "./src/contexts/LanguageProvider";
import { LanguageContext } from "./src/contexts/LanguageContext";

import TelaInicial from "./src/screens/TelaInicial.jsx";
import TelaBoasVindas from "./src/screens/TelaBoasVindas.jsx";
import TelaBiblioteca from "./src/screens/TelaBiblioteca.jsx";
import TelaDicas from "./src/screens/TelaDicas.jsx";
import TelaSobre from "./src/screens/TelaSobre.jsx";
import TelaLivro from "./src/screens/TelaLivro.jsx";
import TelaVideoaula from "./src/screens/TelaVideoaula.jsx";
import TelaAutor from "./src/screens/TelaAutor.jsx";
import TelaCuriosidades from "./src/screens/TelaCuriosidades.jsx";
import TelaCitacoes from "./src/screens/TelaCitacoes.jsx";
import telaQuiz from "./src/screens/telaQuiz.jsx";
import TelaPersonagem from "./src/screens/TelaPersonagens.jsx";
import TelaConfiguracoes from "./src/screens/TelaConfiguracoes.jsx";
import TelaContos from "./src/screens/TelaConto.jsx";
import TelaRats from "./src/screens/TelaRats.jsx";
import TelaCaminho from "./src/screens/TelaCaminho.jsx";
import TelaMoreninha from "./src/screens/TelaMoreninha.jsx";
import TelaNinar from "./src/screens/TelaNinar.jsx";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator({ pt }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4AA1F3",
        tabBarInactiveTintColor: "#000000ff",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E8F3FF",
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={TelaInicial}
        options={{
          tabBarLabel: pt ? "Início" : "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TelaLivro"
        component={TelaLivro}
        options={{
          tabBarLabel: pt ? "Livro" : "Book",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="book" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Autor"
        component={TelaAutor}
        options={{
          tabBarLabel: pt ? "Autor" : "Author",
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="female" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TelaBiblioteca"
        component={TelaBiblioteca}
        options={{
          tabBarLabel: pt ? "Biblioteca" : "Library",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Configuracoes"
        component={TelaConfiguracoes}
        options={{
          tabBarLabel: pt ? "Configurações" : "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="TelaCitacoes"
        component={TelaCitacoes}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="TelaContos"
        component={TelaContos}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="TelaCaminho"
        component={TelaCaminho}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="TelaRats"
        component={TelaRats}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="TelaNinar"
        component={TelaNinar}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="TelaMoreninha"
        component={TelaMoreninha}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="TelaPersonagens"
        component={TelaPersonagem}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Telaquiz"
        component={telaQuiz}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="VideoAulas"
        component={TelaVideoaula}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Dicas"
        component={TelaDicas}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Curiosidades"
        component={TelaCuriosidades}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Equipe"
        component={TelaSobre}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { lang } = useContext(LanguageContext);
  const pt = lang === "pt-br";

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 25 }}
            >
              <FontAwesome6 name="bars" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Text
              style={{
                marginRight: 25,
                fontSize: 20,
                fontWeight: "bold",
                color: "#000000",
              }}
            >
              Clube do Livro
            </Text>
          ),
          drawerStyle: { backgroundColor: "#4AA1F3", width: "80%" },
          drawerActiveTintColor: "#8fc9ffff",
          drawerInactiveTintColor: "#ffffffff",
          drawerLabelStyle: { color: "#ffffff" },
          drawerContentStyle: { backgroundColor: "#67a2d8ff" },
        })}
      >
        <Drawer.Screen
          name="BoasVindas"
          component={TelaBoasVindas}
          options={{
            headerShown: false,
            swipeEnabled: false,
            drawerItemStyle: { display: "none" },
          }}
        />

        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: pt ? "Início" : "Home",
            drawerIcon: () => (
              <Ionicons name="home" size={24} color="#ffffff" />
            ),
          }}
        >
          {() => <TabNavigator pt={pt} />}
        </Drawer.Screen>

        <Drawer.Screen
          name="Autor"
          getComponent={() => () => null}
          options={{
            drawerLabel: pt ? "Autor" : "Author",
            drawerIcon: () => (
              <Fontisto name="female" size={24} color="#ffffff" />
            ),
          }}
          listeners={({ navigation }) => ({
            drawerItemPress: (e) => {
              e.preventDefault();
              navigation.navigate("Home", { screen: "Autor" });
            },
          })}
        />

        <Drawer.Screen
          name="Livro"
          getComponent={() => () => null}
          options={{
            drawerLabel: pt ? "Livro" : "Book",
            drawerIcon: () => <Entypo name="book" size={24} color="#ffffff" />,
          }}
          listeners={({ navigation }) => ({
            drawerItemPress: (e) => {
              e.preventDefault();
              navigation.navigate("Home", { screen: "TelaLivro" });
            },
          })}
        />

        <Drawer.Screen
          name="Biblioteca"
          getComponent={() => () => null}
          options={{
            drawerLabel: pt ? "Biblioteca" : "Library",
            drawerIcon: () => (
              <Ionicons name="book" size={24} color="#ffffff" />
            ),
          }}
          listeners={({ navigation }) => ({
            drawerItemPress: (e) => {
              e.preventDefault();
              navigation.navigate("Home", { screen: "TelaBiblioteca" });
            },
          })}
        />

        <Drawer.Screen
          name="Contos"
          getComponent={() => () => null}
          options={{
            drawerLabel: pt ? "Contos" : "Short Stories",
            drawerIcon: () => (
              <MaterialIcons name="book" size={24} color="#ffffff" />
            ),
          }}
          listeners={({ navigation }) => ({
            drawerItemPress: (e) => {
              e.preventDefault();
              navigation.navigate("Home", { screen: "TelaContos" });
            },
          })}
        />

        <Drawer.Screen
          name="Citações"
          getComponent={() => () => null}
          options={{
            drawerLabel: pt ? "Citações" : "Quotes",
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="comment-quote"
                size={24}
                color="#ffffff"
              />
            ),
          }}
          listeners={({ navigation }) => ({
            drawerItemPress: (e) => {
              e.preventDefault();
              navigation.navigate("Home", { screen: "TelaCitacoes" });
            },
          })}
        />

        <Drawer.Screen
          name="Personagens"
          getComponent={() => () => null}
          options={{
            drawerLabel: pt ? "Personagens" : "Characters",
            drawerIcon: () => (
              <FontAwesome6 name="person" size={24} color="#ffffff" />
            ),
          }}
          listeners={({ navigation }) => ({
            drawerItemPress: (e) => {
              e.preventDefault();
              navigation.navigate("Home", { screen: "TelaPersonagens" });
            },
          })}
        />

        <Drawer.Screen
          name="Quiz"
          getComponent={() => () => null}
          options={{
            drawerLabel: pt ? "Quiz" : "Quiz",
            drawerIcon: () => (
              <MaterialIcons name="question-answer" size={24} color="#ffffff" />
            ),
          }}
          listeners={({ navigation }) => ({
            drawerItemPress: (e) => {
              e.preventDefault();
              navigation.navigate("Home", { screen: "Telaquiz" });
            },
          })}
        />

        <Drawer.Screen
          name="VideoAulas"
          getComponent={() => () => null}
          options={{
            drawerLabel: pt ? "Vídeo Aulas" : "Video Lessons",
            drawerIcon: () => (
              <FontAwesome name="video-camera" size={24} color="#ffffff" />
            ),
          }}
          listeners={({ navigation }) => ({
            drawerItemPress: (e) => {
              e.preventDefault();
              navigation.navigate("Home", { screen: "VideoAulas" });
            },
          })}
        />

        <Drawer.Screen
          name="Dicas"
          getComponent={() => () => null}
          options={{
            drawerLabel: pt ? "Dicas" : "Tips",
            drawerIcon: () => (
              <Ionicons name="information-circle" size={24} color="#ffffff" />
            ),
          }}
          listeners={({ navigation }) => ({
            drawerItemPress: (e) => {
              e.preventDefault();
              navigation.navigate("Home", { screen: "Dicas" });
            },
          })}
        />

        <Drawer.Screen
          name="Curiosidades"
          getComponent={() => () => null}
          options={{
            drawerLabel: pt ? "Curiosidades" : "Fun Facts",
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="comment-question"
                size={24}
                color="#ffffff"
              />
            ),
          }}
          listeners={({ navigation }) => ({
            drawerItemPress: (e) => {
              e.preventDefault();
              navigation.navigate("Home", { screen: "Curiosidades" });
            },
          })}
        />

        <Drawer.Screen
          name="Sobre"
          getComponent={() => () => null}
          options={{
            drawerLabel: pt ? "Sobre" : "About",
            drawerIcon: () => (
              <FontAwesome5 name="users" size={24} color="#ffffff" />
            ),
          }}
          listeners={({ navigation }) => ({
            drawerItemPress: (e) => {
              e.preventDefault();
              navigation.navigate("Home", { screen: "Equipe" });
            },
          })}
        />

        <Drawer.Screen
          name="Configurações"
          getComponent={() => () => null}
          options={{
            drawerLabel: pt ? "Configurações" : "Settings",
            drawerIcon: () => (
              <Ionicons name="settings" size={24} color="#ffffff" />
            ),
          }}
          listeners={({ navigation }) => ({
            drawerItemPress: (e) => {
              e.preventDefault();
              navigation.navigate("Home", { screen: "Configuracoes" });
            },
          })}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbfdff",
  },
});
