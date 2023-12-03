// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    build: {
        transpile: ["trpc-nuxt"],
    },
    components: ["~/components/", "~/components/TheHub/", "~/components/TheHub/components/"],
    modules: [
        "@nuxtjs/supabase",
        "@formkit/nuxt",
        "@nuxtjs/tailwindcss",
        "@pinia/nuxt",
        "@pinia-plugin-persistedstate/nuxt",
    ],
    css: ["@fortawesome/fontawesome-svg-core/styles.css"],
    supabase: {
        redirectOptions: {
            login: "/",
            callback: "/",
            exclude: ["/*"],
        },
    },
    formkit: {
        autoImport: true,
        configFile: "formkit.config.ts",
    },
    piniaPersistedstate: {
        cookieOptions: {
            sameSite: "strict",
        },
        auto: true,
        storage: "sessionStorage",
    },
})
