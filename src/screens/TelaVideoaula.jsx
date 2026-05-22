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
                <View style={styles.Card}>
                    <Text style={styles.title}>
                        Video Aula
                    </Text>
                    <View style={styles.placeholder}>
                        <Text style={styles.placeholderText}>
                            Vídeo em breve
                        </Text>
                    </View>
                    
                    <View style={StyleSheet.Card}>

                        <Text style={styles.title}>
                            Video Aula
                        </Text>
                        <View style={styles.placeholder}>
                            <Text style={styles.placeholderText}>
                                Vídeo em breve
                            </Text>
                        </View>

                    </View>

                    <View style={StyleSheet.Card}>

                        <Text style={styles.title}>
                            Video Aula
                        </Text>
                        <View style={styles.placeholder}>
                            <Text style={styles.placeholderText}>
                                Vídeo em breve
                            </Text>
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
        backgroundColor: '#f4faff',
    },
    container: {
        padding: 25,
        paddingTop: 45,
        paddingBottom: 45,
    },
    Card: {
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
        marginTop: 12,
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
});