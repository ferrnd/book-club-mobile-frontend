import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    SafeAreaView
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

export default function TelaVideoAula() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}>
                <View style={styles.cardUm}>
                    <Text style={styles.title}>
                        Video Aula
                    </Text>
                    <View style={styles.placeholder}>
                        <Text style={styles.placeholderText}>
                            Vídeo em breve
                        </Text>
                    </View>
                </View>

                <View style={StyleSheet.CardDois}>
                    <View style={styles.placeholder}>
                        <Text style={styles.placeholderText}>
                            Vídeo em breve
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
        backgroundColor: '#f4faff',
    },
    header: {
        paddingVertical: 22,
        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        marginTop: 8,
    },
    logo: {
        height: 45,
        width: 45,
    },
    headerT: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
    },
    container: {
        padding: 25,
        paddingTop: 45,
        paddingBottom: 45,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 9,
        padding: 21,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#000000',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#444444',
    },
    placeholder: {
        marginTop: 20,
        borderRadius: 9,
        backgroundColor: '#e7f2ff',
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d0e6fb',
    },
    placeholderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4aa1f3',
    },
    CardDois: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        borderLeftWidth: 5,
        borderLeftColor: '#4aa1f3',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
});