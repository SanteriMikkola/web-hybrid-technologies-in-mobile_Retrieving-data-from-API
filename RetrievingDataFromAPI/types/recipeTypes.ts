export type ExtendedIngredient = {
  id?: number;
  name?: string;
  original?: string;
  amount?: number;
  unit?: string;
  image?: string;
};

export type Recipe = {
  id: number;
  title: string;
  image?: string;
  imageType?: string;

  readyInMinutes?: number;
  servings?: number;

  cuisines?: string[];
  dishTypes?: string[];
  diets?: string[];

  summary?: string;
  sourceUrl?: string;
  spoonacularSourceUrl?: string;

  extendedIngredients?: ExtendedIngredient[];

  // fillIngredients=true lisää usein nämä
  usedIngredients?: ExtendedIngredient[];
  missedIngredients?: ExtendedIngredient[];
  unusedIngredients?: ExtendedIngredient[];
};

export type ComplexSearchResponse = {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
};
