import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,

} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/core';

import { Button } from '../components/Button';
import colors from '../styles/colors';

interface Params {
    title: string;
    subTitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug';
    nextScreen: string;
}

const emojis = {
    hug: '👏',
    smile: '😃'
}

export function Confirmation() {
    const route = useRoute();

    const {
        title,
        subTitle,
        buttonTitle,
        icon,
        nextScreen
    } = route.params as Params;

    const navigation = useNavigation();

    function handleConfirm() {
        navigation.navigate(nextScreen);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subTitle} >
                    {subTitle}
                </Text>
                <View style={styles.footer}>
                    <Button
                        title={buttonTitle}
                        onPress={handleConfirm}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 30
    },
    emoji: {
        fontSize: 76,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.heading,
        paddingTop: 50
    },
    subTitle: {
        fontSize: 16,
        color: colors.heading,
        textAlign: 'center',
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
});