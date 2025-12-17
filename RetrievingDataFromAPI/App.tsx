// App.tsx
import React from "react";
import { StatusBar } from "expo-status-bar";
import RecipeSearchScreen from "./screens/RecipeSearchScreen";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <RecipeSearchScreen />
    </>
  );
}