import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

export default function App() {
    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>Watery Eyes</Text>

            <Text style={styles.subtitle}>conheça mais sobre Olhos D´agua</Text>

            <View style={styles.eye}>
                <View style={styles.pupil} />
            </View>

            <Text style={styles.loading}>Carregando</Text>

            <Text style={styles.footer}>Clube da Água</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E73E8',
        justifyContent: 'space-evenly',
        alingItems: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff'
    },
    subtitle: {
        color: '#fff',
        fontSize: 15,
        marginTop: 10,
    },
    loading: {
        color: '#fff',
        fontSize: 28,
        letterSpacing: 4,
    },
    footer: {
        color: '#fff',
        fontSize: 20,
    }


})
