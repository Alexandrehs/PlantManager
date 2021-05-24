import React from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';

interface ButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
}

export function EnviromentButton({
    title,
    active,
    ...rest
}: ButtonProps) {
    return (
        <RectButton
            style={[
                styles.container,
                active && styles.containerActived
            ]}
            {...rest}
        >
            <Text style={[
                styles.title,
                active && styles.titleActived
            ]}>
                {title}
            </Text>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.shape,
        width: 76,
        height: 40,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    containerActived: {
        backgroundColor: colors.green_light
    },
    title: {
        color: colors.heading,
        fontWeight: '400',
    },
    titleActived: {
        fontWeight: 'bold',
        color: colors.green_dark
    },
});