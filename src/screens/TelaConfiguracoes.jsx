import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LanguageContext } from "../contexts/LanguageContext";

export default function TelaConfiguracoes({ navigation }) {
  const { lang, toggleLanguage } = useContext(LanguageContext);
  const pt = lang === "pt-br";

  function abrirEmail() {
    Linking.openURL("mailto:evencio.tech@gmail.com");
  }

  function abrirWhatsApp() {
    Linking.openURL("https://wa.me/5519995780363");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.secaoT}>
          {pt ? "Configurações" : "Settings"}
        </Text>
        <View style={styles.card}>
          <Text style={styles.topico}>
            {pt ? "Idioma" : "Language"}
          </Text>
          <TouchableOpacity
            style={styles.botaoIdioma}
            onPress={toggleLanguage}
          >
            <Text style={styles.botaoIdiomaT}>
              {pt ? " Mudar para Inglês" : " Switch to Portuguese"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.secaoT}>
          {pt ? "Sobre o App" : "About the App"}
        </Text>
        <View style={styles.card}>
          <View>
            <Text style={styles.topico}>Clube do Livro - Olhos D'Água</Text>
            <Text style={styles.explicacaoP}>SESI / SENAI</Text>

            <Text style={styles.descricao}>
              {pt
                ? 'Este aplicativo é um guia interativo e completo dedicado à obra "Olhos D\'água", da aclamada escritora Conceição Evaristo. Desenvolvido para enriquecer a experiência de leitura e auxiliar nos estudos, o app reúne tudo o que você precisa saber sobre o livro em um só lugar.'
                : 'This application is a complete and interactive guide dedicated to the book "Olhos D\'água", by the acclaimed author Conceição Evaristo. Developed to enrich the reading experience and assist in your studies, the app gathers everything you need to know about the book in one place.'}
            </Text>
          </View>
        </View>

        <Text style={styles.secaoT}>
          {pt ? "Equipe" : "Team"}
        </Text>
        <View style={styles.cardEquipe}>
          <Text style={styles.explicacaoP}>
            {pt
              ? "Conheça mais sobre nós"
              : "Meet the developers behind this project"}
          </Text>
          <TouchableOpacity 
            style={styles.botaoAcao} 
            onPress={() => navigation.navigate("Equipe")}
          >
            <Text style={styles.botaoIdiomaT}>
              {pt ? "Ver Equipe" : "View Team"}
            </Text>
            <FontAwesome
              name="users"
              size={12}
              color="#ffffff"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.secaoT}>
          {pt ? "Contato" : "Contact"}
        </Text>
        
        <View style={styles.CaixaMarrom}>
          <FontAwesome
            name="envelope"
            size={24}
            color="#ffffff"
            style={styles.iconeCitacao}
          />
          <Text style={styles.frase}>
            {pt ? "Dúvidas ou sugestões?" : "Questions or suggestions?"}
          </Text>
          <TouchableOpacity style={styles.saibaMais} onPress={abrirEmail}>
            <Text style={styles.botaoT}>
              {pt ? "Fale Conosco" : "Contact Us"}
            </Text>
            <FontAwesome
              name="arrow-right"
              size={10}
              color="#ffffff"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.CaixaVerde}>
          <FontAwesome
            name="whatsapp"
            size={30}
            color="#ffffff"
            style={styles.iconeCitacao}
          />
          <Text style={styles.frase}>
            {pt ? "Prefere conversar pelo WhatsApp?" : "Prefer to chat on WhatsApp?"}
          </Text>
          <TouchableOpacity style={styles.saibaMais} onPress={abrirWhatsApp}>
            <Text style={styles.botaoT}>
              {pt ? "Chamar no Whats" : "Message Us"}
            </Text>
            <FontAwesome
              name="arrow-right"
              size={10}
              color="#ffffff"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4faffff",
  },

  container: {
    padding: 25,
    paddingTop: 13,
    paddingBottom: 45,
  },

  secaoT: {
    marginTop: 9,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 15,
  },

  card: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    padding: 21,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardEquipe: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    padding: 21,
    justifyContent: "center",
  },

  CaixaMarrom: {
    marginBottom: 20,
    backgroundColor: "#ff4f4f",
    borderRadius: 9,
    padding: 21,
    alignItems: "center",
  },

  CaixaVerde: {
    marginBottom: 20,
    backgroundColor: "#25D366",
    borderRadius: 9,
    padding: 21,
    alignItems: "center",
  },

  topico: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },

  explicacaoP: {
    fontSize: 14,
    color: "#444444",
    marginTop: 2,
    marginBottom: 10,
  },

  botaoIdioma: {
    backgroundColor: "#5eafffff",
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 5,
  },

  botaoAcao: {
    backgroundColor: "#5eafffff",
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },

  botaoIdiomaT: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 13,
  },

  iconeCitacao: {
    marginBottom: 9,
  },

  frase: {
    fontSize: 17,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 16,
  },

  saibaMais: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  botaoT: {
    color: "#ffffff",
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  descricao: {
    fontSize: 14,
    color: "#444444",
    marginTop: 15,
    marginBottom: 10,
    lineHeight: 20,
  },

  subtopico: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },

  lista: {
    fontSize: 14,
    color: "#444444",
    lineHeight: 22,
  },
});