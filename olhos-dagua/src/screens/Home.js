
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from 'expo/vector-icons';

export default function HomeScreen({Navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitulo}>CLUBE D'ÁGUA</Text>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons name="book-outline" size={28} color="#0047AB" />
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent} showsVerticalIndicator={false}>

                <View style={styles.card}>
                    <View style={styles.bookHeader}>
                        <Image
                            source={{uri: 'https://i.zst.com.br/thumbs/12/13/c/1418194973.jpg'}}
                            style={styles.bookCover} />
                        <View
                            style={styles.bookTitles}>
                            <Text
                                style={styles.bookMainTitle}>OLHOS D'ÁGUA</Text>
                            <Text
                                style={styles.bookAutora}>Conceição Evaristo</Text>
                        </View>
                    </View>
                    <Text
                        style={styles.bookDescrição}>"Olhos d'Água", de Conceição Evaristo, é um livro de contos que retrata a realidade de mulheres negras e periféricas no Brasil, abordando temas como pobreza, violência urbana, racismo, desigualdade de gênero e marginalização. A obra, marcada pela "escrevivência", mistura dor e resistência poética, focando em histórias de vida dilaceradas, mas também cheias de afeto e ancestralidade.  </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEEB',
        paddingTop: 50,
    },
})
