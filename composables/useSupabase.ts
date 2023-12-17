import { createClient } from "@supabase/supabase-js"

export interface LoginData {
    email: string
    password: string
}

const config = useRuntimeConfig()
const supabase = createClient(config.public.sbUrl, config.public.sbKey)

export const useSupabase = {
    signUp: async (params: LoginData) => {
        const { error } = await supabase.auth.signUp({
            email: params.email,
            password: params.password,
        })

        return error
    },

    signIn: async (params: LoginData) => {
        const { error } = await supabase.auth.signInWithPassword({
            email: params.email,
            password: params.password,
        })

        return error
    },

    signOut: async () => {
        await supabase.auth.signOut()
    },

    resetPassword: async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "http://localhost:3000/reset",
        })

        return error
    },

    getUser: async () => {
        const { data } = await supabase.auth.getUser()

        return data
    },

    updateUser: async (email: string) => {
        const { error } = await supabase.auth.updateUser({ email })

        return error
    },
}
