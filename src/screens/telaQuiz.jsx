import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LanguageContext } from "../contexts/LanguageContext";

const URL_BASE = "https://olhosdagua.onrender.com/api";
const CHAVE_API =
  "6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd";

export default function TelaQuiz() {
  const { lang } = useContext(LanguageContext);
  const pt = lang === "pt-br";

  const [perguntas, setPerguntas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [indice, setIndice] = useState(0);
  const [selecionada, setSelecionada] = useState(null);
  const [respostas, setRespostas] = useState([]);
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
    try {
      const resp = await fetch(URL_BASE + "/quiz", {
        headers: { "x-api-key": CHAVE_API },
      });
      const data = await resp.json();
      setPerguntas(data.dados ? data.dados : data);
    } catch (e) {
      console.log("Erro:", e);
    } finally {
      setCarregando(false);
    }
  }

  function opcoes(quiz) {
    return [
      { letra: "A", texto: pt ? quiz.opcaoA_pt : quiz.opcaoA_en },
      { letra: "B", texto: pt ? quiz.opcaoB_pt : quiz.opcaoB_en },
      { letra: "C", texto: pt ? quiz.opcaoC_pt : quiz.opcaoC_en },
      { letra: "D", texto: pt ? quiz.opcaoD_pt : quiz.opcaoD_en },
      { letra: "E", texto: pt ? quiz.opcaoE_pt : quiz.opcaoE_en },
    ];
  }

  function avancar() {
    setRespostas([...respostas, selecionada]);
    setSelecionada(null);
    if (indice + 1 >= perguntas.length) setFinalizado(true);
    else setIndice(indice + 1);
  }

  function reiniciar() {
    setIndice(0);
    setSelecionada(null);
    setRespostas([]);
    setFinalizado(false);
  }

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  if (finalizado) {
    let pontos = 0;
    perguntas.forEach((q, i) => {
      if (respostas[i] === q.resposta) pontos++;
    });

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.titulo}>Quiz</Text>

          <View style={styles.cardResu}>
            <FontAwesome
              name="trophy"
              size={48}
              color="#5eafffff"
              style={styles.iconeResu}
            />
            <Text style={styles.resultadoLabel}>
              {pt ? "Resultado" : "Result"}
            </Text>
            <Text style={styles.resultado}>
              {pontos}/{perguntas.length}
            </Text>
          </View>

          {perguntas.map((q, i) => {
            const acertou = respostas[i] === q.resposta;
            return (
              <View key={i} style={styles.cardGab}>
                <View style={styles.cabecalhoGab}>
                  <Text style={styles.questaoNum}>
                    {pt ? "Questão" : "Question"} {i + 1}
                  </Text>
                  <View
                    style={[
                      styles.badge,
                      acertou ? styles.acertou : styles.errou,
                    ]}
                  >
                    <Text style={styles.badgeT}>
                      {acertou
                        ? pt
                          ? "Correto"
                          : "Correct"
                        : pt
                          ? "Errado"
                          : "Wrong"}
                    </Text>
                  </View>
                </View>

                <Text style={styles.pergunta}>
                  {pt ? q.pergunta_pt : q.pergunta_en}
                </Text>

                {opcoes(q).map(({ letra, texto }) => {
                  const eCorreta = letra === q.resposta;
                  const eErrada = letra === respostas[i] && !eCorreta;
                  let estilo = styles.opcaoBloco;
                  if (eCorreta) estilo = styles.certa;
                  if (eErrada) estilo = styles.errada;
                  return (
                    <View key={letra} style={estilo}>
                      <Text style={styles.letraDestaque}>{letra})</Text>
                      <Text style={styles.opcaoTexto}>{texto}</Text>
                    </View>
                  );
                })}

                <Text style={styles.respostaGab}>
                  {pt ? "Resposta correta: " : "Correct answer: "}
                  <Text style={styles.respostaLetra}>{q.resposta}</Text>
                </Text>

                <View style={styles.explicacaoCaixa}>
                  <Text style={styles.explicacaoT}>
                    {pt ? q.explicacao_pt : q.explicacao_en}
                  </Text>
                </View>
              </View>
            );
          })}

          <TouchableOpacity style={styles.botao} onPress={reiniciar}>
            <FontAwesome
              name="refresh"
              size={13}
              color="#ffffff"
              style={styles.iconeBtn}
            />
            <Text style={styles.botaoT}>
              {pt ? "Tentar novamente" : "Try again"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const questaoAtual = perguntas[indice];
  const eUltima = indice + 1 === perguntas.length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.titulo}>Quiz</Text>
        <Text style={styles.progresso}>
          {indice + 1}/{perguntas.length}
        </Text>

        <View style={styles.quizCard}>
          <Text style={styles.questaoNum}>
            {pt ? "Questão" : "Question"} {indice + 1}
          </Text>
          <Text style={styles.pergunta}>
            {pt ? questaoAtual.pergunta_pt : questaoAtual.pergunta_en}
          </Text>

          {opcoes(questaoAtual).map(({ letra, texto }) => (
            <TouchableOpacity
              key={letra}
              style={
                selecionada === letra
                  ? styles.selecionado
                  : styles.opcaoBloco
              }
              onPress={() => setSelecionada(letra)}
            >
              <Text style={styles.letraDestaque}>{letra})</Text>
              <Text style={styles.opcaoTexto}>{texto}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.botao} onPress={avancar}>
            <Text style={styles.botaoT}>
              {eUltima
                ? pt
                  ? "Finalizar"
                  : "Finish"
                : pt
                  ? "Próxima"
                  : "Next"}
            </Text>
            <FontAwesome
              name="arrow-right"
              size={13}
              color="#ffffff"
              style={styles.iconeBtn}
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

  carregando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4faffff",
  },

  container: {
    padding: 25,
    paddingTop: 13,
    paddingBottom: 45,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
    textTransform: "uppercase",
  },

  progresso: {
    fontSize: 13,
    color: "#aaa",
    fontWeight: "bold",
    marginBottom: 20,
  },

  quizCard: {
    backgroundColor: "#ffffff",
    padding: 28,
    borderRadius: 9,
  },

  questaoNum: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#5eafffff",
    textTransform: "uppercase",
    alignSelf: "center",
    letterSpacing: 1,
    marginBottom: 12,
  },

  pergunta: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 22,
    lineHeight: 24,
  },

  opcaoBase: {
    padding: 15,
    borderRadius: 9,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },

  opcaoBloco: {
    padding: 15,
    borderRadius: 9,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#f8fafc",
  },

  selecionado: {
    padding: 15,
    borderRadius: 9,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    borderWidth: 1.5,
    backgroundColor: "#eff6ff",
    borderColor: "#5eafffff",
  },

  certa: {
    padding: 15,
    borderRadius: 9,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    borderWidth: 1,
    borderColor: "#15803d",
    backgroundColor: "#f0fdf4",
  },

  errada: {
    padding: 14,
    borderRadius: 9,
    marginBottom: 10,
    gap: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    backgroundColor: "#fef2f2",
    borderColor: "#b91c1c",
  },

  letraDestaque: {
    fontWeight: "bold",
    fontSize: 15,
    minWidth: 25,
    color: "#05407A",
  },

  opcaoTexto: {
    fontSize: 14,
    color: "#334155",
    flex: 1,
    lineHeight: 20,
  },

  botao: {
    backgroundColor: "#5eafffff",
    paddingVertical: 15,
    borderRadius: 9, 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  botaoT: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  iconeBtn: {
    marginLeft: 8,
    marginRight: 8,
  },

  cardResu: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 30,
    alignItems: "center",
    marginBottom: 20,
  },

  iconeResu: {
    marginBottom: 12,
  },

  resultadoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 8,
  },

  resultado: {
    fontSize: 52,
    fontWeight: "bold",
    color: "#5eafffff",
  },

  cardGab: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 20,
    marginBottom: 14,
  },

  cabecalhoGab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  acertou: {
    backgroundColor: "#15803d",
  },

  errou: {
    backgroundColor: "#b91c1c",
  },

  badgeT: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "bold",
  },

  respostaGab: {
    fontSize: 13,
    color: "#888",
    marginBottom: 10,
    marginTop: 4,
  },

  respostaLetra: {
    fontWeight: "bold",
    color: "#15803d",
  },

  explicacaoCaixa: {
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#5eafffff",
  },

  explicacaoT: {
    fontSize: 14,
    color: "#334155",
    lineHeight: 20,
  },
});
