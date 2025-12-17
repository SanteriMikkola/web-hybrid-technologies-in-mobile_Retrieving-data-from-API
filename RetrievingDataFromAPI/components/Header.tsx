import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
    title?: string;
};

export default function Header({ title = 'Results' }: Props) {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 12,
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
});
