import React from 'react';
import { useNavigation } from '@react-navigation/core';

import {
    SafeAreaView,
    Text,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';

import { Button } from '../components/Button';

import imageFirst from '../assets/watering.png';
import colors from '../styles/colors';

export function Welcome() {

    const navigation = useNavigation();

    function handleStart() {
        navigation.navigate('UserIndentification');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Gerencie {'\n'}
                suas plantas de {'\n'}
                forma fácil
            </Text>

            <Image
                source={imageFirst}
                style={styles.image}
                resizeMode="contain"
            />

            <Text style={styles.subTitle}>
                Não esqueça mais de regar sua plantas.
                Nós cuidamos de lembrar você sempre que precisar.
            </Text>

            <Button
                title="Começar"
                onPress={handleStart}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38
    },
    subTitle: {
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 20,
        color: colors.heading
    },
    image: {
        height: Dimensions.get('window').width * 0.7
    }
});