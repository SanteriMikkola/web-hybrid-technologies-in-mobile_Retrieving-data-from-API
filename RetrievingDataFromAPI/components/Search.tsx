import React, { useState, useMemo, useEffect } from 'react';
import { View, TextInput, StyleSheet, Platform, Pressable, Text, Modal, FlatList } from 'react-native';
import Constants from 'expo-constants';

type Props = {
    defaultValue?: string;
    onSearch: (term: string) => void;
    diet?: string | null;
    onDietChange?: (diet: string | null) => void;
};

// Based on https://spoonacular.com/food-api/docs#Diets
const DIETS = [
  { label: "Any", value: null },
  { label: "Gluten Free", value: "gluten free" },
  { label: "Ketogenic", value: "ketogenic" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Lacto-Vegetarian", value: "lacto-vegetarian" },
  { label: "Ovo-Vegetarian", value: "ovo-vegetarian" },
  { label: "Vegan", value: "vegan" },
  { label: "Pescetarian", value: "pescetarian" },
  { label: "Paleo", value: "paleo" },
  { label: "Primal", value: "primal" },
  { label: "Low FODMAP", value: "low fodmap" },
  { label: "Whole30", value: "whole30" },
];

export default function Search({ defaultValue = "", onSearch, diet, onDietChange }: Props) {
    const [value, setValue] = useState<string>(defaultValue);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        onSearch(value);
    }, [value, onSearch]);

    const dietLabel = useMemo(() => {
        const found = DIETS.find((d) => d.value === diet);
        return found?.label ?? "Any";
    }, [diet]);

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search recipes (e.g. pasta)"
                value={value}
                onChangeText={setValue}
                style={styles.input}
                returnKeyType="search"
            />
            <Pressable style={styles.filterBtn} onPress={() => setOpen(true)}>
                <Text style={styles.filterIcon}>⚙️</Text>
                <Text style={styles.filterText} numberOfLines={1}>{dietLabel}</Text>
            </Pressable>

            <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
                <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
                    <Pressable style={styles.sheet} onPress={() => { /* block closing */ }}>
                        <Text style={styles.sheetTitle}>Diet</Text>

                        <FlatList
                            data={DIETS}
                            keyExtractor={(item) => String(item.value)}
                            renderItem={({ item }) => (
                                <Pressable
                                    style={[styles.option, item.value === diet ? styles.optionActive : null]}
                                    onPress={() => {
                                        onDietChange?.(item.value);
                                        setOpen(false);
                                    }}
                                >
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </Pressable>
                            )}
                        />
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
        paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 8,
        gap: 8,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 44,
    },
    filterBtn: {
        height: 44,
        minWidth: 72,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    filterIcon: { fontSize: 16 },
    filterText: { maxWidth: 90, fontWeight: "600", color: "#333" },
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
        justifyContent: "center",
        padding: 16,
    },
    sheet: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        maxHeight: "70%",
    },
    sheetTitle: { fontSize: 16, fontWeight: "700", marginBottom: 10 },
    option: { paddingVertical: 12, paddingHorizontal: 10, borderRadius: 10 },
    optionActive: { backgroundColor: "#f2f2f2" },
    optionText: { fontSize: 15 },
});
