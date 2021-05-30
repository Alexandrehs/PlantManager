import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import Feather from '@expo/vector-icons/Feather'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated from 'react-native-reanimated';
import { SvgUri } from 'react-native-svg';

import colors from '../styles/colors';

interface PlantsProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    };
    handleRemove: () => void;
}

export const PlantCardSecondary = ({ data, handleRemove, ...rest }: PlantsProps) => {
    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <RectButton
                        style={styles.buttomRemove}
                        onPress={handleRemove}
                    >
                        <Feather name="trash" size={32} color={colors.white} />
                    </RectButton>
                </Animated.View>
            )}
        >
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
        </Swipeable>
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
    buttomRemove: {
        width: 100,
        height: 85,
        backgroundColor: colors.red,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: 20,
        paddingLeft: 15
    },
});