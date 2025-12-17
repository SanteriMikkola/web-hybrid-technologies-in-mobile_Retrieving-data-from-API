import type { ComplexSearchResponse, Recipe } from "../types/recipeTypes";

type SearchArgs = {
  apiKey: string;
  query: string;
  diet?: string | null;
  number?: number;
  signal?: AbortSignal;
};

export async function searchRecipesComplex({
  apiKey,
  query,
  diet,
  number = 20,
  signal,
}: SearchArgs): Promise<Recipe[]> {
  const q = query.trim();
  if (!q) return [];

  const dietParam = diet ? `&diet=${encodeURIComponent(diet)}` : "";

  const url =
    "https://api.spoonacular.com/recipes/complexSearch" +
    `?query=${encodeURIComponent(q)}` +
    `&number=${number}` +
    `&addRecipeInformation=true` +
    `&fillIngredients=true` +
    `&instructionsRequired=true` +
    dietParam +
    `&apiKey=${encodeURIComponent(apiKey)}`;

  const res = await fetch(url, { signal });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("Spoonacular error:", res.status, body);
    throw new Error(`API error: ${res.status}`);
  }

  const data: ComplexSearchResponse = await res.json();
  return Array.isArray(data.results) ? data.results.filter(Boolean) : [];
}
