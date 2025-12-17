import React, { useMemo, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { getRecipeIngredients } from "../utils/getRecipeIngredients";
import type { Recipe } from "../types/recipeTypes";

type Props = {
  item: Recipe;
};

export default function Row2({ item }: Props) {
  const [expanded, setExpanded] = useState(false);
  const ingredients = getRecipeIngredients(item);

  const meta = useMemo(
    () =>
      [
        item.readyInMinutes ? `${item.readyInMinutes} min` : null,
        item.servings ? `${item.servings} servings` : null,
        item.diets?.length ? item.diets.slice(0, 2).join(", ") : null,
      ].filter(Boolean),
    [item]
  );

  return (
    <Pressable onPress={() => setExpanded((v) => !v)} style={styles.card}>
      {item.image ? <Image source={{ uri: item.image }} style={styles.thumb} /> : null}

      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        {meta.length ? <Text style={styles.meta}>{meta.join(" • ")}</Text> : null}

        {ingredients.length ? (
          <>
            <Text style={styles.ingredients} numberOfLines={expanded ? undefined : 3}>
              {ingredients.join(", ")}
            </Text>
            <Text style={styles.moreLess}>{expanded ? "Show less" : "Show more"}</Text>
          </>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  meta: {
    color: "#444",
    marginTop: 4,
    marginBottom: 6,
  },
  moreLess: {
    marginTop: 6,
    color: "#666",
    fontWeight: "600",
  },
  ingredients: {
    color: "#333",
    flexShrink: 1,
  },
});
