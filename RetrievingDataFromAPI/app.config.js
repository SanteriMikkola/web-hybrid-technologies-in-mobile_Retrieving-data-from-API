export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    spoonacularApiKey: process.env.SEARCH_RECIPES_API,
  },
});