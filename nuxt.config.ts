// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    resasApiKey: process.env.RESAS_API_KEY,
  },

  modules: ["@nuxt/eslint", "@pinia/nuxt"],

  // https://nuxt.com/docs/guide/concepts/typescript
  typescript: {
    typeCheck: true,
  },

  app: {
    head: {
      viewport: "width=device-width,height=device-height,initial-scale=1",
    },
  },
});
