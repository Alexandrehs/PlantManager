import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';

import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';
import colors from '../styles/colors';

export function UserIndentification() {

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    const navigation = useNavigation();

    function handleInputFocused() {
        setIsFocused(true);
    }

    function handleInputBlur() {
        setIsFocused(false);
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setName(value);
    }

    function handleSubmit() {

        if (!name)
            return Alert.alert('😢 Como você quer que eu te chame 😢');

        try {
            AsyncStorage.setItem('@plantManager:user', name);
            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subTitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            });
        } catch {
            Alert.alert('Não foi possível salvar seu nome 😢!');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                >
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    🙂
                                </Text>
                                <Text style={styles.subTitle}>
                                    Como podemos {'\n'}
                                    chamar você
                                </Text>
                            </View>
                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && { borderColor: colors.green }
                                ]}
                                placeholder="Digite seu nome"
                                onFocus={handleInputFocused}
                                onBlur={handleInputBlur}
                                onChangeText={handleInputChange}
                            />
                            <View style={styles.footer}>
                                <Button
                                    title="Confirmar"
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 54,
        width: '100%'
    },
    header: {
        alignItems: 'center',
    },
    emoji: {
        fontSize: 76,
    },
    subTitle: {
        fontSize: 24,
        color: colors.heading,
        paddingVertical: 20,
        textAlign: 'center',
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        fontSize: 18,
        color: colors.heading,
        marginTop: 20,
        padding: 10,
        textAlign: 'center',
    },
    footer: {
        width: '100%',
        paddingTop: 20
    }
});