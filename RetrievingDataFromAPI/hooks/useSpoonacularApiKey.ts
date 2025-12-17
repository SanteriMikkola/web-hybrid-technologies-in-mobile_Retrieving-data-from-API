import { useMemo } from "react";
import Constants from "expo-constants";

export function useSpoonacularApiKey() {
  return useMemo(() => {
    return (
      process.env.SEARCH_RECIPES_API ??
      (Constants.expoConfig?.extra as any)?.spoonacularApiKey
    );
  }, []);
}
