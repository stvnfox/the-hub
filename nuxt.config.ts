// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/supabase', '@formkit/nuxt', '@nuxtjs/tailwindcss'],
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/',
      exclude: ['/*'],
    }
  },
  formkit: {
    autoImport: true
  }
})
