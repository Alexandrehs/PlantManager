import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Platform,
    Alert,
    ScrollView
} from 'react-native';

import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import { SvgFromUri } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/core';

import waterdrop from '../assets/waterdrop.png';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import { format, isBefore } from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loadPlant, PlantProps, savePlant } from '../libs/storage';

interface Params {
    plant: PlantProps
}

export function PlantSave() {
    const [selectedDateTime, setSelectDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

    const route = useRoute();
    const { plant } = route.params as Params;

    const navigation = useNavigation();

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android')
            setShowDatePicker(oldState => !oldState);

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectDateTime(new Date());
            return Alert.alert('Escolha uma data no futuro 🕗 ');
        }

        if (dateTime)
            setSelectDateTime(dateTime);
    }

    function handleDateTimePickerForAndroid() {
        setShowDatePicker(oldValue => !oldValue);
    }

    async function handleSavePlant() {
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            });

            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subTitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito amor.',
                buttonTitle: 'Muito Obrigado!',
                icon: 'hug',
                nextScreen: 'MyPlants'
            });
        } catch (error) {
            Alert.alert('Não foi possível salvar a planta.');
            console.log(error);
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri
                        uri={plant.photo}
                        width={270}
                        height={270}
                    />
                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>
                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>
                </View>

                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image
                            source={waterdrop}
                            style={styles.tipImage}
                        />
                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>

                    <Text style={styles.alertLabel}>
                        Escolha o melhor horário para ser lembrado:
                    </Text>

                    {showDatePicker && <DateTimePicker
                        value={selectedDateTime}
                        mode="time"
                        display="spinner"
                        onChange={handleChangeTime}
                    />}

                    {
                        Platform.OS === 'android' && (
                            <TouchableOpacity
                                style={styles.dateTimePickerButton}
                                onPress={handleDateTimePickerForAndroid}
                            >
                                <Text style={styles.dateTimePickerText}>
                                    {`Horário ${format(selectedDateTime, 'HH:mm')}`}
                                </Text>
                            </TouchableOpacity>
                        )
                    }

                    <Button
                        title="Cadastrar planta"
                        onPress={handleSavePlant}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: colors.shape
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape,
        marginBottom: 60
    },
    plantAbout: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.heading,
        marginTop: 10
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 50
    },
    tipImage: {
        width: 56,
        height: 56
    },
    tipText: {
        flex: 1,
        marginLeft: 10,
        color: colors.blue,
        fontSize: 16,
        textAlign: 'justify'
    },
    plantName: {
        fontSize: 21,
        color: colors.heading,
        marginTop: 15,
        fontWeight: 'bold'
    },
    alertLabel: {
        textAlign: 'center',
        color: colors.heading,
        fontSize: 14,
    },
    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },
    dateTimePickerText: {
        color: colors.green_dark,
        fontSize: 24
    },
});