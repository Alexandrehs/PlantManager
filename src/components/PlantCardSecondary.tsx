import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgUri } from 'react-native-svg';

import colors from '../styles/colors';

interface PlantsProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    }
}

export const PlantCardSecondary = ({ data, ...rest }: PlantsProps) => {
    return (
        <RectButton
            style={styles.container}
            {...rest}
        >
            <SvgUri
                uri={data.photo}
                width={60}
                height={60}
            />

            <Text style={styles.title}>
                {data.name}
            </Text>

            <View style={styles.details}>
                <Text style={styles.timeLabel}>
                    Regar às
                </Text>
                <Text style={styles.time}>
                    {data.hour}
                </Text>
            </View>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 30,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5,

    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 17,
        color: colors.heading
    },
    details: {
        alignItems: 'flex-end',
        paddingEnd: 15
    },
    timeLabel: {
        fontSize: 16,
        color: colors.body_light
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.body_dark
    },
});