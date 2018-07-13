export const runtimeConfig =
  typeof window !== "undefined"
    ? {
        STRIPE_API: process.env.STRIPE_API,
        STRIPE_API_KEY: process.env.STRIPE_API_KEY
      }
    : {};
