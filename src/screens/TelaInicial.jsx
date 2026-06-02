import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import Fontisto from "@expo/vector-icons/Fontisto";

import { LanguageContext } from "../contexts/LanguageContext";

const URL_BASE = "https://olhosdagua.onrender.com/api";
const CHAVE_API =
  "6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd";

const CHAVE_RATS =
  "Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO";

const CHAVE_MURILO = "livr0";
const CHAVE_MORENINHA = "entreLinhas123";
const CHAVE_PEDRO = "chaveSecreta";

export default function TelaInicial({ navigation }) {
  const { lang } = useContext(LanguageContext);
  const pt = lang === "pt-br";

  const [carregando, setCarregando] = useState(true);
  const [projeto, setProjeto] = useState(null);
  const [citacao, setCitacao] = useState(null);
  const [livro, setLivro] = useState(null);
  const [conto, setConto] = useState(null);
  const [rats, setRats] = useState(null);
  const [murilo, setMurilo] = useState(null);
  const [moreninha, setMoreninha] = useState(null);
  const [pedro, setPedro] = useState(null);
  const [tema, setTema] = useState(null);
  const [autor, setAutor] = useState(null);
  const [personagem, setPersonagem] = useState(null);

  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
    const resp = await fetch(URL_BASE + "/projeto", {
      headers: { "x-api-key": CHAVE_API },
    });
    const data = await resp.json();
    setProjeto(data[0]);

    const resp2 = await fetch(URL_BASE + "/citacao", {
      headers: { "x-api-key": CHAVE_API },
    });
    const data2 = await resp2.json();
    setCitacao(data2[7]);

    const resp3 = await fetch(URL_BASE + "/livro", {
      headers: { "x-api-key": CHAVE_API },
    });
    const data3 = await resp3.json();
    setLivro(data3[0]);

    const resp10 = await fetch(URL_BASE + "/personagens", {
      headers: { "x-api-key": CHAVE_API },
    });
    const data10 = await resp10.json();
    setPersonagem(data10[4]);

    const resp4 = await fetch("https://ratsjs.onrender.com/api/livros", {
      headers: { "x-api-key": CHAVE_RATS },
    });
    const data4 = await resp4.json();
    setRats(data4[0]);

    const resp5 = await fetch('https://devstones-backend.onrender.com/api/livro', {
        headers: { 'x-api-key': CHAVE_MURILO },
    });
    const data5 = await resp5.json();
    setMurilo(data5[0]);

    const resp6 = await fetch(
      "https://clubelivro-backend.onrender.com/api/livros",
      { headers: { "x-api-key": CHAVE_MORENINHA } },
    );
    const data6 = await resp6.json();
    setMoreninha(data6[0]);

    const resp7 = await fetch(
      "https://atividade-portugues-backend.onrender.com/api/livro",
      { headers: { "x-api-key": CHAVE_PEDRO } },
    );
    const data7 = await resp7.json();
    setPedro(data7[0]);

    const resp8 = await fetch(`${URL_BASE}/dicas`, {
      headers: { "x-api-key": CHAVE_API },
    });
    const data8 = await resp8.json();
    const especifico = Array.isArray(data8) ? data8 : (data8?.dados ?? []);
    const temas = especifico.filter(
      (item) =>
        item.tipo_pt === "Possíveis temas de redação sobre o livro principal",
    );
    setTema(temas[0]);

    const respAutor = await fetch(URL_BASE + "/autor", {
      headers: { "x-api-key": CHAVE_API },
    });
    const dataAutor = await respAutor.json();
    setAutor(dataAutor[0]);

    const respContos = await fetch(URL_BASE + "/contos", {
      headers: { "x-api-key": CHAVE_API },
    });
    const dataContos = await respContos.json();
    setConto(dataContos[2]);

    setCarregando(false);
  }

  function t(obj, campo) {
    if (pt) {
      return obj[`${campo}_pt`] ?? obj[campo];
    } else {
      return obj[`${campo}_en`];
    }
  }

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
      <SafeAreaView style={styles.safeArea}>
          <StatusBar style="dark" />
          <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
              <View style={styles.secao}>
                  <View style={[styles.card, styles.livroCard]}>
                      <View>
                          <Image source={{ uri: livro.capa }} style={styles.livroCapa} />
                      </View>

                      <View style={styles.info}>
                          <Text style={styles.livroT}>{livro.titulo}</Text>
                          <Text style={styles.livroAutor}>{livro.autor}</Text>
                          <View style={styles.contorno}>
                              <Text style={styles.anoPublicacao}>{livro.anoPublicacao}</Text>
                          </View>
                          <Text style={styles.livroGenero}>{t(livro, 'genero')}</Text>
                          <TouchableOpacity
                              style={styles.saibaMais2}
                              onPress={() => navigation.navigate('TelaLivro')}>
                              <Text style={styles.botaoT}>
                                  {pt ? 'Saiba Mais Sobre O livro' : 'Learn More About The Book'}
                              </Text>
                              <FontAwesome
                                  name="arrow-right"
                                  size={10}
                                  color="#ffffff"
                                  style={{ marginLeft: 5 }}
                              />
                          </TouchableOpacity>
                      </View>
                  </View>

                  <View style={styles.card}>
                      <Text style={styles.objt}>{pt ? 'Sinopse' : 'Synopsis'}</Text>
                      <Text style={styles.explicacaoP}>{t(livro, 'resumo')}</Text>
                  </View>
              </View>

              <View style={styles.secao}>
                  <Text style={styles.secaoT}>{pt ? 'Sobre o Projeto' : 'About the Project'}</Text>
                  <View style={styles.card}>
                      <Text style={styles.explicacaoP}>{t(projeto, 'apresentacao')}</Text>
                  </View>
              </View>

              <View style={styles.secao}>
                  <View style={styles.citacaoCaixa}>
                      <FontAwesome
                          name="quote-left"
                          size={24}
                          color="#ffffff"
                          style={styles.iconeCitacao}
                      />
                      <Text style={styles.contoTag}>
                          {pt ? 'Conto: ' : 'Short story: '}
                          {pt ? citacao.conto.titulo_pt : citacao.conto.titulo_en}
                      </Text>
                      <Text style={styles.frase}>"{t(citacao, 'texto')}"</Text>
                      <Text style={styles.dito}>— {citacao.personagem} —</Text>
                      <TouchableOpacity
                          style={styles.saibaMais}
                          onPress={() => navigation.navigate('TelaCitacoes')}>
                          <Text style={styles.botaoT}>
                              {pt ? 'Mais citações da obra' : 'More quotes from the work'}
                          </Text>
                          <FontAwesome
                              name="arrow-right"
                              size={10}
                              color="#ffffff"
                              style={{ marginLeft: 5 }}
                          />
                      </TouchableOpacity>
                  </View>
              </View>

              <View style={styles.secao}>
                  <View style={styles.card}>
                      <Text style={styles.objt}>{pt ? 'Objetivo' : 'Objective'}</Text>
                      <Text style={styles.explicacaoP}>{t(projeto, 'objetivo')}</Text>
                  </View>
              </View>

              <Text style={styles.secaoT1}>{pt ? 'Autora' : 'Author'}</Text>
              <View style={styles.secao}>
                  <View style={styles.card1}>
                      <Fontisto
                          name="female"
                          size={24}
                          color="#ffffff"
                          style={styles.iconeCitacao}
                      />
                      <Image source={{ uri: autor.fotoUrl }} style={styles.autorF} />
                      <Text style={styles.autorN}>{autor.nome}</Text>
                      <Text style={styles.autorSbt}>{t(autor, 'nacionalidade')}</Text>
                      <TouchableOpacity
                          style={styles.saibaMais}
                          onPress={() => navigation.navigate('Autor')}>
                          <Text style={styles.botaoT}>{pt ? 'Saiba Mais' : 'Learn More'}</Text>
                          <FontAwesome
                              name="arrow-right"
                              size={10}
                              color="#8a4c00"
                              style={{ marginLeft: 5 }}
                          />
                      </TouchableOpacity>
                  </View>
              </View>

              <View style={styles.secao}>
                <Text style={styles.secaoT}>{pt ? 'Contos' : 'Short Story'}</Text>
                  <View style={styles.citacaoCaixa}>
                      <FontAwesome
                          name="book"
                          size={24}
                          color="#ffffff"
                          style={styles.iconeCitacao}
                      />
                      <Text style={styles.contoTag}>
                          {pt ? 'Conto: ' : 'Short story: '}
                          {pt ? conto?.titulo_pt : conto?.titulo_en}
                      </Text>
                      <Text style={styles.frase}>
                          {pt ? conto?.resumo_pt : conto?.resumo_en}
                      </Text>
                      <TouchableOpacity
                          style={styles.saibaMais}
                          onPress={() => navigation.navigate('TelaContos')}>
                          <Text style={styles.botaoT}>
                              {pt ? 'Saiba Mais Sobre Os Contos' : 'Learn More About The Stories'}
                          </Text>
                          <FontAwesome
                              name="arrow-right"
                              size={10}
                              color="#ffffff"
                              style={{ marginLeft: 5 }}
                          />
                      </TouchableOpacity>
                  </View>
              </View>
              <View style={styles.secao}>
                  <Text style={styles.secaoT1}>
                      {pt ? 'Outras Obras Literárias' : 'Other Literary Works'}
                  </Text>
                  <View style={[styles.card, styles.livroCard]}>
                      <View>
                          <Image source={{ uri: rats.capa }} style={styles.livroCapa} />
                      </View>
                      <View style={styles.info}>
                          <Text style={styles.livroT}>{rats.titulo}</Text>
                          <Text style={styles.livroAutor}>{rats.autor}</Text>
                          <View style={styles.contornoIntegracao}>
                              <Text style={styles.anoPublicacao}>{rats.anoPublicacao}</Text>
                          </View>
                          <Text style={styles.livroGenero}>{t(rats, 'genero')}</Text>
                          <TouchableOpacity
                              style={styles.saibaMais3}
                              onPress={() => navigation.navigate('TelaRats')}>
                              <Text style={styles.botaoT}>
                                  {pt ? 'Saiba Mais Sobre O livro' : 'Learn More About The Book'}
                              </Text>
                              <FontAwesome
                                  name="arrow-right"
                                  size={10}
                                  color="#ffffff"
                                  style={{ marginLeft: 5 }}
                              />
                          </TouchableOpacity>
                      </View>
                  </View>

                  <View style={[styles.card, styles.livroCard]}>
                      <View>
                          <Image source={{ uri: murilo?.capa }} style={styles.livroCapa} />
                      </View>
                      <View style={styles.info}>
                          <Text style={styles.livroT}>{murilo?.titulo}</Text>
                          <Text style={styles.livroAutor}>{murilo?.autor}</Text>
                          <View style={styles.contornoIntegracao}>
                              <Text style={styles?.anoPublicacao}>{murilo.anoPublicacao}</Text>
                          </View>
                          <Text style={styles.livroGenero}>{t(murilo, 'genero')}</Text>
                          <TouchableOpacity
                              style={styles.saibaMais6}
                              onPress={() => navigation.navigate('TelaCaminho')}>
                              <Text style={styles.botaoT}>
                                  {pt ? 'Saiba Mais Sobre O livro' : 'Learn More About The Book'}
                              </Text>
                              <FontAwesome
                                  name="arrow-right"
                                  size={10}
                                  color="#ffffff"
                                  style={{ marginLeft: 5 }}
                              />
                          </TouchableOpacity>
                      </View>
                  </View>

                  <View style={[styles.card, styles.livroCard]}>
                      <View>
                          <Image source={{ uri: moreninha.capa }} style={styles.livroCapa} />
                      </View>
                      <View style={styles.info}>
                          <Text style={styles.livroT}>{moreninha.titulo}</Text>
                          <Text style={styles.livroAutor}>{moreninha.autor}</Text>
                          <View style={styles.contornoIntegracao}>
                              <Text style={styles.anoPublicacao}>{moreninha.anoPublicacao}</Text>
                          </View>
                          <Text style={styles.livroGenero}>{t(moreninha, 'genero')}</Text>
                          <TouchableOpacity
                              style={styles.saibaMais5}
                              onPress={() => navigation.navigate('TelaMoreninha')}>
                              <Text style={styles.botaoT}>
                                  {pt ? 'Saiba Mais Sobre O livro' : 'Learn More About The Book'}
                              </Text>
                              <FontAwesome
                                  name="arrow-right"
                                  size={10}
                                  color="#ffffff"
                                  style={{ marginLeft: 5 }}
                              />
                          </TouchableOpacity>
                      </View>
                  </View>

                  <View style={[styles.card, styles.livroCard]}>
                      <View>
                          <Image source={{ uri: pedro.capa }} style={styles.livroCapa} />
                      </View>
                      <View style={styles.info}>
                          <Text style={styles.livroT}>{pedro.titulo}</Text>
                          <Text style={styles.livroAutor}>{pedro.autor}</Text>
                          <View style={styles.contornoIntegracao}>
                              <Text style={styles.anoPublicacao}>{pedro.anoPublicacao}</Text>
                          </View>
                          <Text style={styles.livroGenero}>{t(pedro, 'genero')}</Text>
                          <TouchableOpacity
                              style={styles.saibaMais4}
                              onPress={() => navigation.navigate('TelaNinar')}>
                              <Text style={styles.botaoT}>
                                  {pt ? 'Saiba Mais Sobre O livro' : 'Learn More About The Book'}
                              </Text>
                              <FontAwesome
                                  name="arrow-right"
                                  size={10}
                                  color="#ffffff"
                                  style={{ marginLeft: 5 }}
                              />
                          </TouchableOpacity>
                      </View>
                  </View>
                  <TouchableOpacity
                      style={styles.saibaMais10}
                      onPress={() => navigation.navigate('TelaBiblioteca')}>
                      <Text 
                          style={styles.botaoT1}
                          numberOfLines={1}>
                          {pt ? 'Todas as Obras Literárias' : 'All Literary Works'}
                      </Text>
                      <FontAwesome
                          name="arrow-right"
                          size={10}
                          color="#ffffff"
                          style={{ marginLeft: 5 }}
                      />
                  </TouchableOpacity>

                  <View style={styles.secao}>
                      <Text style={styles.secaoT1}>{pt ? 'Temas de Redação' : 'Essay Topics'}</Text>
                      <View style={styles.CaixaMarrom}>
                          <FontAwesome
                              name="pencil"
                              size={24}
                              color="#ffffff"
                              style={styles.iconeCitacao}
                          />
                          <Text style={styles.frase}>{t(tema, 'conteudo')}</Text>
                          <Text style={styles.frase}>{t(tema, 'explicacao')}</Text>
                          <TouchableOpacity
                              style={styles.saibaMais}
                              onPress={() => navigation.navigate('Dicas')}>
                              <Text style={styles.botaoT}>
                                  {pt ? 'Mais temas de redação' : 'More essay topics'}
                              </Text>
                              <FontAwesome
                                  name="arrow-right"
                                  size={10}
                                  color="#ffffff"
                                  style={{ marginLeft: 5 }}
                              />
                          </TouchableOpacity>
                      </View>
                  </View>

                  <Text style={styles.secaoT1}>{pt ? 'Personagens' : 'Characters'}</Text>
                  <View style={styles.personagemCard}>
                      <Text style={styles.nome}>{personagem.nome}</Text>
                      <Image source={{ uri: personagem.fotoUrl }} style={styles.fotoPersonagem} />
                      <View style={styles.cabecalho1}>
                          <Text style={styles.cabecalhoSbt1}>
                              {pt
                                  ? 'Nota: A Imagem presente do personagem é especulada e não foi feita originalmente pela autora'
                                  : "Note: The character's image is speculative and was not originally made by the author"}
                          </Text>
                      </View>
                      <View style={styles.personagemCaixa}>
                          <Entypo
                              name="pencil"
                              size={24}
                              color="#ffffffff"
                              style={styles.iconepersonagem}
                          />
                          <View style={styles.divisorLinha1} />
                          <Text style={styles.divisorTexto1}>
                              {pt ? 'Características' : 'Characteristics'}
                          </Text>
                          <View style={styles.divisorLinha1} />
                          <Text style={styles.frase}>{t(personagem, 'caracteristicas')}</Text>
                      </View>

                      <View style={styles.divisor}>
                          <View style={styles.divisorLinha} />
                          <Text style={styles.divisorTexto}>
                              {pt ? 'Descrição' : 'Description'}
                          </Text>
                          <View style={styles.divisorLinha} />
                      </View>

                      <Text style={styles.explicacaoTexto}>{t(personagem, 'descricao')}</Text>
                      <TouchableOpacity
                          style={styles.saibaMais1}
                          onPress={() => navigation.navigate('TelaPersonagens')}>
                          <Text style={styles.botaoT}>
                              {pt ? 'Saiba Mais Sobre Personagens' : 'Learn More About Characters'}
                          </Text>
                          <FontAwesome
                              name="arrow-right"
                              size={10}
                              color="#ffffff"
                              style={{ marginLeft: 5 }}
                          />
                      </TouchableOpacity>
                  </View>
              </View>

              <View style={styles.secao}>
                  <Text style={styles.secaoT1}>{pt ? 'Quiz' : 'Quiz'}</Text>
                  <View style={styles.quizC}>
                      <FontAwesome
                          name="check-circle"
                          size={32}
                          color="#ffffff"
                          style={styles.iconeCitacao}
                      />
                      <Text style={styles.autorN}>{pt ? 'Se sinta preparado!' : 'Feel prepared!'}</Text>
                      <Text style={styles.autorSbt1}>{pt ? 'Faça um Quiz' : 'Take a Quiz'}</Text>
                      <TouchableOpacity
                          style={styles.saibaMais}
                          onPress={() => navigation.navigate('Telaquiz')}>
                          <Text style={styles.botaoT}>
                              {pt ? 'Começar' : 'Start'}
                          </Text>
                          <FontAwesome
                              name="arrow-right"
                              size={10}
                              color="#ffffff"
                              style={{ marginLeft: 5 }}
                          />
                      </TouchableOpacity>
                  </View>
              </View>
          </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f4faffff',
    },

    container: {
        padding: 25,
        paddingTop: 13,
        paddingBottom: 45,
    },

    carregando: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fffbfb',
    },

    header: {
        paddingVertical: 15,
        paddingHorizontal: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f4faffff',
    },

    headerT: {
        marginTop: 23,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
    },

    personagemCaixa: {
        marginBottom: 10,
        backgroundColor: '#5eafffff',
        borderRadius: 9,
        padding: 21,
        alignItems: 'center',
    },

    logo: {
        marginTop: 23,
        height: 35,
        width: 35,
    },

    saibaMais: {
        marginTop: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    saibaMais1: {
        marginTop: 5,
        marginBottom: 25,
        backgroundColor: 'rgba(37, 37, 37, 0.64)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    saibaMais2: {
        marginTop: 10,
        backgroundColor: '#5eafffff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },

    saibaMais10: {
        marginBottom: 10,
        backgroundColor: '#5eafffff',
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: 400,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    saibaMais3: {
        marginTop: 10,
        backgroundColor: '#000000ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },

    saibaMais4: {
        marginTop: 10,
        backgroundColor: '#8d7210ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    saibaMais5: {
        marginTop: 10,
        backgroundColor: '#85007eff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    saibaMais6: {
        marginTop: 10,
        backgroundColor: '#cd0000ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },

    botaoT: {
        color: '#ffffff',
        fontSize: 9,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },

    botaoT1: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },

    secao: {
        marginBottom: 9,
    },

    secaoT: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 27,
    },

    secaoT1: {
        marginTop: 9,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 27,
    },

    card: {
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 9,
        padding: 21,
    },

    card1: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#DC7D05',
        borderRadius: 9,
        padding: 21,
    },

    explicacaoP: {
        fontSize: 16,
        lineHeight: 24,
        color: '#000000',
        textAlign: 'justify',
    },

    objt: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#5eafffff',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: 7,
        marginBottom: 7,
    },

    citacaoCaixa: {
        marginBottom: 10,
        backgroundColor: '#5eafffff',
        borderRadius: 9,
        padding: 21,
        alignItems: 'center',
    },

    CaixaMarrom: {
        marginBottom: 10,
        backgroundColor: '#A48B73',
        borderRadius: 9,
        padding: 21,
        alignItems: 'center',
    },

    iconeCitacao: {
        marginBottom: 9,
    },

    contoTag: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'rgba(255,255,255,0.7)',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 12,
    },

    frase: {
        fontSize: 17,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 16,
    },

    dito: {
        marginBottom: 13,
        padding: 1,
        textTransform: 'uppercase',
        fontSize: 12,
        letterSpacing: 1,
        fontWeight: 'bold',
        color: '#ffffff',
    },

    livroCard: {
        marginBottom: 20,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
    },

    livroCapa: {
        width: 150,
        height: 200,
        borderRadius: 5,
    },

    info: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },

    livroT: {
        fontSize: 19,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#000000',
        marginBottom: 5,
    },

    livroAutor: {
        padding: 1,
        fontSize: 15.5,
        textTransform: 'capitalize',
        color: '#6b6b6b',
        marginBottom: 12,
    },

    livroGenero: {
        marginTop: 12,
        padding: 1,
        fontSize: 10,
        textTransform: 'uppercase',
        color: '#6b6b6b',
        flexShrink: 1,
    },

    contorno: {
        alignSelf: 'flex-start',
        backgroundColor: '#5eafffff',
        paddingVertical: 7,
        paddingHorizontal: 14,
        borderRadius: 5,
    },

    contornoIntegracao: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgb(0, 0, 0)',
        paddingVertical: 7,
        paddingHorizontal: 14,
        borderRadius: 5,
    },

    anoPublicacao: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
    },

    autorF: {
        width: 350,
        height: 200,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 12,
    },

    autorN: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 4,
    },

    autorSbt: {
        fontSize: 15,
        color: '#8a4c00',
        textAlign: 'center',
        marginTop: 2,
        marginBottom: 7,
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: 'bold',
    },

    autorSbt1: {
        fontSize: 17,
        color: '#e4e4e4',
        textAlign: 'center',
        marginTop: 2,
        marginBottom: 7,
        letterSpacing: 1,
        padding: 1
    },

    iconepersonagem: {
        marginBottom: 9,
    },

    nome: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 13,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#000000ff',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },

    personagemCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginBottom: 18,
    },

    divisor: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 17,
        marginVertical: 15,
    },

    divisorLinha: {
        flex: 1,
        height: 1,
        backgroundColor: '#e0e0e0',
    },

    divisorLinha1: {
        flex: 1,
        height: 1,
        backgroundColor: '#ffffffff',
    },

    divisorTexto: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#adadad',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },

    divisorTexto1: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#ffffffff',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 15,
    },

    explicacaoTexto: {
        paddingHorizontal: 18,
        paddingBottom: 18,
        fontSize: 18,
        color: '#444444',
        lineHeight: 21,
        fontStyle: 'italic',
        textAlign: 'justify',
    },

    cabecalho: {
        alignItems: 'center',
        marginBottom: 24,
    },

    cabecalho1: {
        alignItems: 'center',
        marginBottom: 24,
        textAlign: 'center',
    },

    cabecalhoSbt1: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#aaa',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginTop: 7,
        marginBottom: 5,
    },

    fotoPersonagem: {
        width: 400,
        height: 600,
        borderRadius: 8,
        marginBottom: 14,
        alignSelf: 'center',
    },

    quizC: {
        marginBottom: 10,
        backgroundColor: '#808080ff',
        borderRadius: 9,
        padding: 21,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
