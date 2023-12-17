type UserData = {
    id: string
    email: string
}

export const useUserStore = defineStore(
    "user-store",
    () => {
        const isLoggedIn = ref(false)
        const userData = ref<UserData | null>(null)

        return {
            isLoggedIn,
            userData,
        }
    },
    {
        persist: {
            paths: ["isLoggedIn", "userData"],
        },
    }
)
