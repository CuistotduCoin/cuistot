export const runtimeConfig =
  typeof window !== "undefined"
    ? {
        ALGOLIASEARCH_PLACES_APP_ID: window.env.ALGOLIASEARCH_PLACES_APP_ID,
        ALGOLIASEARCH_PLACES_KEY: window.env.ALGOLIASEARCH_PLACES_KEY,
        ALGOLIASEARCH_SEARCH_APP_ID: window.env.ALGOLIASEARCH_SEARCH_APP_ID,
        ALGOLIASEARCH_SEARCH_KEY: window.env.ALGOLIASEARCH_SEARCH_KEY,
        RAZZLE_PUBLIC_DIR: window.env.ALGOLIASEARCH_SEARCH_KEY
      }
    : {
        ALGOLIASEARCH_PLACES_APP_ID: process.env.ALGOLIASEARCH_PLACES_APP_ID,
        ALGOLIASEARCH_PLACES_KEY: process.env.ALGOLIASEARCH_PLACES_KEY,
        ALGOLIASEARCH_SEARCH_APP_ID: process.env.ALGOLIASEARCH_SEARCH_APP_ID,
        ALGOLIASEARCH_SEARCH_KEY: process.env.ALGOLIASEARCH_SEARCH_KEY,
        RAZZLE_PUBLIC_DIR: process.env.ALGOLIASEARCH_SEARCH_KEY
      };
