interface IWindow extends Window {
  env: any;
}
declare var window: IWindow;

export const runtimeConfig =
  typeof window !== "undefined"
    ? {
        STRIPE_API: window.env.STRIPE_API,
        STRIPE_API_KEY: window.env.STRIPE_API_KEY
      }
    : {
        STRIPE_API: process.env.STRIPE_API,
        STRIPE_API_KEY: process.env.STRIPE_API_KEY
      };
