// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    resasApiKey: process.env.RESAS_API_KEY,
  }
})
