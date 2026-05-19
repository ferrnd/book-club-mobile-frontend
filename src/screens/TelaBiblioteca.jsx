import React, { useState, useEffect } from "react"; 
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const CHAVE_RATS = "Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO";

export default function TelaBiblioteca() {
  const [carregando, setCarregando] = useState(true);
  const [rats, setRats] = useState(null);

  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
    try {
      const resp4 = await fetch("https://ratsjs.onrender.com/api/livros", {
        headers: { "x-api-key": CHAVE_RATS },
      });
      const data4 = await resp4.json();
      setRats(data4[0]);
    } catch (error) {
      console.error(error);
    } 
  }

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" color="#05407A" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      

     <View style={styles.header}>
             <Image
               source={{
                 uri: "https://raw.githubusercontent.com/ferrnd/book-club-mobile-backend/refs/heads/main/images/bookCover/icone-olhos-da-agua-preto.png",
               }}
               style={styles.logo}
             />
             <Text style={styles.headerT}>Clube Do Livro</Text>
           </View>
      
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.secao}>
          <Text style={styles.secaoT}>Biblioteca</Text>
          
          <View style={styles.gridLivros}>
           

            <View style={styles.card}>
              <View style={styles.infoTextos}>
                <Text  style={styles.livroT}>{rats?.titulo}</Text>
                <Text  style={styles.livroAutor}>{rats?.autor}</Text>
                {rats?.anoPublicacao && (
                  <View style={styles.contorno}> 
                    <Text style={styles.anoPublicacao}>{rats.anoPublicacao}</Text>
                  </View>
                )}
              </View>
              <View style={styles.containerCapaMini}>
                <Image source={{ uri: rats?.capa }} style={styles.livroCapaMini} />
              </View>
            </View>

            
            <View style={styles.card}>
              <View style={styles.infoTextos}>
                <Text  style={styles.livroT}>{/*livro?.titulo*/}</Text>
                <Text  style={styles.livroAutor}>{/*livro?.autor*/}</Text>
                {/*livro?.anoPublicacao && */ (
                  <View style={styles.contorno}> 
                    <Text style={styles.anoPublicacao}>{/*livro.anoPublicacao*/}</Text>
                  </View>
                )}
              </View>
              <View style={styles.containerCapaMini}>
                <Image source={{ /* uri: livro.capa*/ }} style={styles.livroCapaMini} />
              </View>
            </View>

   <View style={styles.card}>
              <View style={styles.infoTextos}>
                <Text  style={styles.livroT}>{/*livro?.titulo*/}</Text>
                <Text  style={styles.livroAutor}>{/*livro?.autor*/}</Text>
                {/*livro?.anoPublicacao && */ (
                  <View style={styles.contorno}> 
                    <Text style={styles.anoPublicacao}>{/*livro.anoPublicacao*/}</Text>
                  </View>
                )}
              </View>
              <View style={styles.containerCapaMini}>
                <Image source={{ /* uri: livro.capa*/ }} style={styles.livroCapaMini} />
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.infoTextos}>
                <Text  style={styles.livroT}>{/*livro?.titulo*/}</Text>
                <Text  style={styles.livroAutor}>{/*livro?.autor*/}</Text>
                {/*livro?.anoPublicacao && */ (
                  <View style={styles.contorno}> 
                    <Text style={styles.anoPublicacao}>{/*livro.anoPublicacao*/}</Text>
                  </View>
                )}
              </View>
              <View style={styles.containerCapaMini}>
                <Image source={{ /* uri: livro.capa*/ }} style={styles.livroCapaMini} />
              </View>
            </View>


 <View style={styles.card}>
              <View style={styles.infoTextos}>
                <Text  style={styles.livroT}>{/*livro?.titulo*/}</Text>
                <Text  style={styles.livroAutor}>{/*livro?.autor*/}</Text>
                {/*livro?.anoPublicacao && */ (
                  <View style={styles.contorno}> 
                    <Text style={styles.anoPublicacao}>{/*livro.anoPublicacao*/}</Text>
                  </View>
                )}
              </View>
              <View style={styles.containerCapaMini}>
                <Image source={{ /* uri: livro.capa*/ }} style={styles.livroCapaMini} />
              </View>
            </View>


 <View style={styles.card}>
              <View style={styles.infoTextos}>
                <Text  style={styles.livroT}>{/*livro?.titulo*/}</Text>
                <Text  style={styles.livroAutor}>{/*livro?.autor*/}</Text>
                {/*livro?.anoPublicacao && */ (
                  <View style={styles.contorno}> 
                    <Text style={styles.anoPublicacao}>{/*livro.anoPublicacao*/}</Text>
                  </View>
                )}
              </View>
              <View style={styles.containerCapaMini}>
                <Image source={{ /* uri: livro.capa*/ }} style={styles.livroCapaMini} />
              </View>
            </View>

             <View style={styles.card}>
              <View style={styles.infoTextos}>
                <Text  style={styles.livroT}>{/*livro?.titulo*/}</Text>
                <Text  style={styles.livroAutor}>{/*livro?.autor*/}</Text>
                {/*livro?.anoPublicacao && */ (
                  <View style={styles.contorno}> 
                    <Text style={styles.anoPublicacao}>{/*livro.anoPublicacao*/}</Text>
                  </View>
                )}
              </View>
              <View style={styles.containerCapaMini}>
                <Image source={{ /* uri: livro.capa*/ }} style={styles.livroCapaMini} />
              </View>
            </View>

 <View style={styles.card}>
              <View style={styles.infoTextos}>
                <Text  style={styles.livroT}>{/*livro?.titulo*/}</Text>
                <Text  style={styles.livroAutor}>{/*livro?.autor*/}</Text>
                {/*livro?.anoPublicacao && */ (
                  <View style={styles.contorno}> 
                    <Text style={styles.anoPublicacao}>{/*livro.anoPublicacao*/}</Text>
                  </View>
                )}
              </View>
              <View style={styles.containerCapaMini}>
                <Image source={{ /* uri: livro.capa*/ }} style={styles.livroCapaMini} />
              </View>
            </View>

 <View style={styles.card}>
              <View style={styles.infoTextos}>
                <Text  style={styles.livroT}>{/*livro?.titulo*/}</Text>
                <Text  style={styles.livroAutor}>{/*livro?.autor*/}</Text>
                {/*livro?.anoPublicacao && */ (
                  <View style={styles.contorno}> 
                    <Text style={styles.anoPublicacao}>{/*livro.anoPublicacao*/}</Text>
                  </View>
                )}
              </View>
              <View style={styles.containerCapaMini}>
                <Image source={{ /* uri: livro.capa*/ }} style={styles.livroCapaMini} />
              </View>
            </View>

 <View style={styles.card}>
              <View style={styles.infoTextos}>
                <Text  style={styles.livroT}>{/*livro?.titulo*/}</Text>
                <Text  style={styles.livroAutor}>{/*livro?.autor*/}</Text>
                {/*livro?.anoPublicacao && */ (
                  <View style={styles.contorno}> 
                    <Text style={styles.anoPublicacao}>{/*livro.anoPublicacao*/}</Text>
                  </View>
                )}
              </View>
              <View style={styles.containerCapaMini}>
                <Image source={{ /* uri: livro.capa*/ }} style={styles.livroCapaMini} />
              </View>
            </View>




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
  carregando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffbfb",
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f4faffff",
  },
  headerT: {
  marginTop: 23,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  logo: {
    height: 30,
    width: 35,
    resizeMode: "contain",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  secao: {
    width: "100%",
  },
  secaoT: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 20,
  },
  gridLivros: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#BCE0FD", // Azul claro dos cards do Figma
    borderRadius: 16,
    padding: 12,
    width: "48%", // Faz caber dois por linha com espaço no meio
    height: 100, // Altura fixa aproximada do formato horizontal do Figma
    flexDirection: "row", // Alinha textos na esquerda e imagem na direita
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  infoTextos: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between", // Distribui o título no topo e o ano embaixo
    paddingRight: 6,
  },
  livroT: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },
  livroAutor: {
    fontSize: 11,
    color: "#555555",
    marginTop: -2,
  },
  contorno: {
    alignSelf: "flex-start",
    backgroundColor: "#6CB7FF",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  anoPublicacao: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
  },
  containerCapaMini: {
    width: 45,
    height: "100%",
    backgroundColor: "#80C2FF", // Tom de azul de fundo da mini capa
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  livroCapaMini: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});