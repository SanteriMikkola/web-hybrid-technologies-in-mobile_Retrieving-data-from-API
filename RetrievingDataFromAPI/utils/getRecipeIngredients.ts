import type { Recipe } from "../types/recipeTypes";

export function getRecipeIngredients(recipe: Recipe): string[] {
  const list =
    recipe.extendedIngredients ??
    recipe.usedIngredients ??
    recipe.missedIngredients ??
    [];

  return list
    .map((ing) => (ing.original ?? ing.name ?? "").trim())
    .filter((s) => s.length > 0);
}
