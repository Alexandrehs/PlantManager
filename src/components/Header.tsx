import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';

import alexandre from '../assets/alexandre.png';

export function Header() {
    const [name, setName] = useState<string>();

    async function loadStorageUserName() {
        const name = await AsyncStorage.getItem('@plantManager:user');
        setName(name || '');
    }

    useEffect(() => {
        loadStorageUserName();
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.cumpriment}>Olá,</Text>
                <Text style={styles.name}>{name}!</Text>
            </View>
            <Image
                source={alexandre}
                style={styles.avatar}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 38,
        alignItems: 'center'
    },
    cumpriment: {
        fontSize: 18,
        fontWeight: '400',
        color: colors.heading
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.heading
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30,
    }
});