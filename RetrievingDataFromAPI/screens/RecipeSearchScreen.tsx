import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

import Search from "../components/Search";
import Header from "../components/Header";
import Row from "../components/Row2";

import { useRecipeSearch } from "../hooks/useRecipeSearch";

export default function RecipeSearchScreen() {
  const { query, setQuery, diet, setDiet, recipes, loading, error } =
    useRecipeSearch({ debounceMs: 800, initialQuery: "" });

  return (
    <View style={styles.container}>
      <Search
        defaultValue={query}
        onSearch={setQuery}
        diet={diet}
        onDietChange={setDiet}
      />

      {query.trim() ? (
        <Text style={styles.resultsText}>Results for: {query}</Text>
      ) : null}

      {!query.trim() ? (
        <View style={styles.centered}>
          <Text>Type to search for recipes…</Text>
        </View>
      ) : loading ? (
        <View style={styles.centered}>
          <ActivityIndicator />
          <Text style={{ marginTop: 8 }}>Loading…</Text>
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={{ color: "crimson" }}>{error}</Text>
        </View>
      ) : recipes && recipes.length > 0 ? (
        <>
          <Header title="Recipes" />
          <FlatList
            data={recipes}
            keyExtractor={(r) => String(r.id)}
            renderItem={({ item }) => <Row item={item} />}
            contentContainerStyle={styles.list}
          />
        </>
      ) : (
        <View style={styles.centered}>
          <Text>No recipes found.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  resultsText: { paddingHorizontal: 12, paddingVertical: 8, color: "#444" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  list: { paddingHorizontal: 12, paddingBottom: 12 },
});
