import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
} from 'react-native';

export default function TelaLogo(){
    const [carregando, setCarregando] = useState(true);



<View style={styles.container}>
    <Image
        source={{
            uri: 'https://raw.githubusercontent.com/ferrnd/book-club-mobile-backend/refs/heads/main/images/bookCover/icone-olhos-da-agua-preto.png',
        }}
        style={{ width: 32, height: 32, resizeMode: 'contain', alignItems: 'center' }}
    />
    <Image
        source={{
            uri: 'https://raw.githubusercontent.com/ferrnd/book-club-mobile-backend/refs/heads/main/images/bookCover/clube-da-agua.png',
        }}
        style={{ width: 32, height: 32, resizeMode: 'contain', alignItems: 'bottom' }}
    />
</View>;
}

 if (carregando) {
        return (
            <View style={styles.carregando}>
                <ActivityIndicator size="large" color="#000000" />
            </View>
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
        backgroundColor:"blue"
    }
});
