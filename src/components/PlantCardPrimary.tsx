import React from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgUri } from 'react-native-svg';

import colors from '../styles/colors';

interface PlantsProps extends RectButtonProps {
    data: {
        name: string,
        photo: string
    }
}

export const PlantCardPrimary = ({ data, ...rest }: PlantsProps) => {
    return (
        <RectButton
            style={styles.container}
            {...rest}
        >
            <SvgUri uri={data.photo} width={70} height={70} />

            <Text style={styles.text}>
                {data.name}
            </Text>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '45%',
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 30,
        alignItems: 'center',
        margin: 10,
    },
    text: {
        color: colors.heading,
        fontWeight: 'bold'
    }
});