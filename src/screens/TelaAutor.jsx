import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LanguageContext } from "../contexts/LanguageContext";
import MapView, { Marker } from "react-native-maps";
import YoutubePlayer from "react-native-youtube-iframe";

const URL_BASE = "https://olhosdagua.onrender.com/api";
const CHAVE_API =
  "6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd";

export default function TelaAutor({ navigation }) {
  const { lang } = useContext(LanguageContext);
  const pt = lang === "pt-br";

  const [carregando, setCarregando] = useState(true);
  const [autor, setAutor] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
    const resp = await fetch(URL_BASE + "/autor", {
      headers: { "x-api-key": CHAVE_API },
    });
    const data3 = await resp.json();
    setAutor(data3[0]);

    const resp4 = await fetch(URL_BASE + "/videoaula", {
      headers: { "x-api-key": CHAVE_API },
    });
    const data4 = await resp4.json();
    setVideo(data4[0]);

    setCarregando(false);
  }

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  if (!autor || !video) {
  return (
    <View style={styles.carregando}>
    </View>
  );
}

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.secao}>
          <Text style={styles.secaoT}>
            {pt ? "Sobre a Autora" : "About the Author"}
          </Text>
          <View style={[styles.card, styles.autorCard]}>
            <View>
              <Image source={{ uri: autor.fotoUrl }} style={styles.autorCapa} />
            </View>

            <View style={styles.info}>
              <Text style={styles.autorT}>{autor.nome}</Text>
              <Text style={styles.autorAutor}>{autor.autor}</Text>
              <View style={styles.contorno}>
                <Text style={styles.anoPublicacao}>
                  {pt ? autor.nacionalidade_pt : autor.nacionalidade_en}
                </Text>
              </View>
              <Text style={styles.autorGenero}>{autor.nascimento}</Text>
            </View>
          </View>
        </View>

        <View style={styles.secao}>
          <View style={styles.cardV}>
            <Text style={styles.tituloV}>
              {pt ? video.titulo_pt : video.titulo_en}
            </Text>

            <View style={styles.video}>
              <YoutubePlayer height={200} videoId={video.url} />
            </View>

            <Text style={styles.descricao}>
              {pt ? video.descricao_pt : video.descricao_en}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.saibaMais10}
          onPress={() => navigation.navigate("VideoAulas")}
        >
          <Text style={styles.botaoT1} numberOfLines={1}>
            {pt
              ? "Todas os Vídeos sobre Ela e a Obra"
              : "All Videos about Her and the Book"}
          </Text>
          <FontAwesome
            name="arrow-right"
            size={10}
            color="#ffffff"
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>

        <View style={styles.secao}>
          <View style={styles.card1}>
            <FontAwesome name="pencil" size={23} color="#FFFFFF" />
            <Text style={styles.explicacaoP1}>
              {pt
                ? '"O que a história não nos oferece, a literatura pode oferecer. Esse vazio histórico é preenchido pela ficção."'
                : '"What history doesn\'t offer us, literature can offer. This historical void is filled by fiction."'}
            </Text>
          </View>
        </View>

        <View style={styles.secao}>
          <View style={styles.card}>
            <View style={styles.titulo}>
              <Text style={styles.subt}>
                {pt ? "Biografia da Autora" : "Author Biography"}
              </Text>
              <FontAwesome name="book" size={15} style={styles.icone} />
            </View>
            <View style={styles.divisor} />
            <Text style={styles.explicacaoP}>
              {pt ? autor.biografia_pt : autor.biografia_en}
            </Text>
          </View>
        </View>

        <View style={styles.secao}>
          <View style={styles.card}>
            <View style={styles.titulo}>
              <Text style={styles.subt}>
                {pt ? "Estilo de Escrita da Autora" : "Author's Writing Style"}
              </Text>
              <FontAwesome name="paint-brush" size={15} style={styles.icone} />
            </View>
            <View style={styles.divisor} />
            <Text style={styles.explicacaoP}>
              {pt ? autor.estilo_escrita_pt : autor.estilo_escrita_en}
            </Text>
          </View>
        </View>

        <View style={styles.secao}>
          <View style={styles.card1}>
            <FontAwesome name="pencil" size={23} color="#FFFFFF" />
            <Text style={styles.subt1}>
              {pt ? "Por que Escrever?" : "Why Write?"}
            </Text>
            <Text style={styles.explicacaoP1}>
              {pt ? autor.porqueEscrever_pt : autor.porqueEscrever_en}
            </Text>
          </View>
        </View>

        <View style={styles.secao}>
          <View style={styles.card}>
            <View style={styles.titulo}>
              <Text style={styles.subt}>
                {pt ? "Conquistas e Prêmios" : "Achievements and Awards"}
              </Text>
              <FontAwesome name="trophy" size={15} style={styles.icone} />
            </View>
            <View style={styles.divisor} />
            <Text style={styles.explicacaoP}>
              {pt ? autor.conquistas_pt : autor.conquistas_en}
            </Text>
          </View>
        </View>

        <View style={styles.secao}>
          <View style={styles.card}>
            <View style={styles.titulo}>
              <Text style={styles.subt}>
                {pt
                  ? "Formação e Bagagem de Vida"
                  : "Education and Life Experience"}
              </Text>
              <FontAwesome
                name="graduation-cap"
                size={15}
                style={styles.icone}
              />
            </View>
            <View style={styles.divisor} />
            <Text style={styles.explicacaoP}>
              {pt ? autor.formacao_pt : autor.formacao_en}
            </Text>
          </View>
        </View>

        <View style={styles.secao}>
          <View style={styles.card}>
            <View style={styles.titulo}>
              <Text style={styles.subt}>
                {pt
                  ? "Marcos da Carreira Literária"
                  : "Literary Career Milestones"}
              </Text>
              <FontAwesome name="star" size={15} style={styles.icone} />
            </View>
            <View style={styles.divisor} />
            <Text style={styles.explicacaoP}>
              {pt ? autor.marcos_pt : autor.marcos_en}
            </Text>
          </View>
        </View>

        <View style={styles.secao}>
          <View style={styles.card}>
            <View style={styles.titulo}>
              <Text style={styles.subt}>
                {pt ? "Principais Inspirações" : "Main Inspirations"}
              </Text>
              <FontAwesome name="heart" size={15} style={styles.icone} />
            </View>
            <View style={styles.divisor} />
            <Text style={styles.explicacaoP}>
              {pt ? autor.inspiracao_pt : autor.inspiracao_en}
            </Text>
          </View>
        </View>

        <View style={styles.secao}>
          <View style={styles.card}>
            <View style={styles.titulo}>
              <Text style={styles.subt}>
                {pt ? "A Casa Escrevivência" : "The Writing House"}
              </Text>
              <FontAwesome name="home" size={16} style={styles.icone} />
            </View>
            <View style={styles.divisor} />
            <Text style={styles.explicacaoP}>
              {pt ? autor.curioso_pt : autor.curioso_en}
            </Text>
          </View>
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

  carregando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4faffff",
  },

  secao: {
    marginBottom: 25,
  },

  secaoT: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    padding: 21,
    alignItems: "center",
    justifyContent: "center",
  },

  card1: {
    backgroundColor: "#DC7D05",
    borderRadius: 9,
    padding: 21,
    alignItems: "center",
    justifyContent: "center",
  },

  titulo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  icone: {
    color: "#8a4c00",
    marginLeft: 10,
  },

  subt: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8a4c00",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 7,
    marginBottom: 7,
  },

  subt1: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffffffff",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 7,
    marginBottom: 7,
  },

  explicacaoP: {
    fontSize: 16,
    lineHeight: 24,
    color: "#000000",
    textAlign: "justify",
  },

  explicacaoP1: {
    marginTop: 7,
    marginBottom: 7,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#ffffffff",
    textAlign: "center",
  },

  autorCard: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DC7D05",
  },

  autorCapa: {
    width: 350,
    height: 300,
    borderRadius: 5,
  },

  info: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  autorT: {
    fontSize: 19,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "#663800",
  },

  autorAutor: {
    padding: 1,
    fontSize: 15,
    textTransform: "capitalize",
    color: "#663800",
  },

  autorDetalhe: {
    fontSize: 14,
    color: "#663800",
  },

  autorGenero: {
    marginTop: 20,
    padding: 1,
    fontSize: 15,
    textTransform: "uppercase",
    textAlign: "center",
    color: "#663800",
    flexShrink: 1,
  },

  contorno: {
    backgroundColor: "#8a4c00",
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 5,
    marginBottom: 7,
  },

  anoPublicacao: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },

  divisor: {
    alignSelf: "center",
    width: 355,
    height: 2,
    backgroundColor: "#8a4c00",
    marginVertical: 13,
  },

  tituloM: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: "bold",
    color: "#8a4c00",
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
  },

  mapa: {
    width: 360,
    height: 200,
  },

  cardV: {
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    padding: 21,
  },

  tituloV: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#8a4c00",
  },

  video: {
    borderRadius: 9,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 15,
  },

  descricao: {
    fontSize: 16,
    lineHeight: 24,
    color: "#000000",
    textAlign: "justify",
  },

  saibaMais10: {
    marginBottom: 25,
    backgroundColor: "#8a4c00",
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: 400,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

  botaoT1: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
