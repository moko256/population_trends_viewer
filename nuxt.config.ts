// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    resasApiKey: process.env.RESAS_API_KEY,
  },

  modules: ["@nuxt/eslint"],

  // https://eslint.nuxt.com/packages/module
  eslint: {
    config: {
      stylistic: true
    }
  }
})