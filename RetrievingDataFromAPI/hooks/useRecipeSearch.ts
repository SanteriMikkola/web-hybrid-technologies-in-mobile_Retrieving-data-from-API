import { useEffect, useMemo, useState } from "react";
import type { Recipe } from "../types/recipeTypes";
import { useDebouncedValue } from "./useDebouncedValue";
import { useSpoonacularApiKey } from "./useSpoonacularApiKey";
import { searchRecipesComplex } from "../api/spoonacular";

type UseRecipeSearchOptions = {
  debounceMs?: number;
  initialQuery?: string;
};

export function useRecipeSearch(options: UseRecipeSearchOptions = {}) {
  const { debounceMs = 800, initialQuery = "" } = options;

  const apiKey = useSpoonacularApiKey();

  const [query, setQuery] = useState(initialQuery);
  const [diet, setDiet] = useState<string | null>(null);

  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebouncedValue(query, debounceMs);

  const canSearch = useMemo(() => debouncedQuery.trim().length > 0, [debouncedQuery]);

  useEffect(() => {
    // Kun hakukenttä tyhjenee, tyhjennetään tulokset + error.
    if (!canSearch) {
      setRecipes(null);
      setError(null);
      setLoading(false);
      return;
    }

    if (!apiKey) {
      setError("Missing Spoonacular API key.");
      setRecipes(null);
      return;
    }

    const controller = new AbortController();

    (async () => {
      setLoading(true);
      setError(null);

      try {
        const list = await searchRecipesComplex({
          apiKey,
          query: debouncedQuery,
          diet,
          signal: controller.signal,
        });
        setRecipes(list);
      } catch (e: any) {
        // Abort ei ole oikea “error” käyttäjälle
        if (e?.name === "AbortError") return;
        setError(e?.message ?? "Failed to fetch recipes.");
        setRecipes([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [apiKey, debouncedQuery, diet, canSearch]);

  return {
    query,
    setQuery,
    diet,
    setDiet,
    recipes,
    loading,
    error,
  };
}
