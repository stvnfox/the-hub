// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    modules: [
        "@nuxtjs/supabase",
        "@formkit/nuxt",
        "@nuxtjs/tailwindcss",
        "@pinia/nuxt",
        "@pinia-plugin-persistedstate/nuxt",
    ],
    supabase: {
        redirectOptions: {
            login: "/",
            callback: "/",
            exclude: ["/*"],
        },
    },
    formkit: {
        autoImport: true,
    },
    piniaPersistedstate: {
        cookieOptions: {
            sameSite: "strict",
        },
        auto: true,
        storage: "sessionStorage",
    },
})
