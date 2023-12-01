export const useGlobalStore = defineStore("global-store", () => {
    const isLoggedIn = ref(false)

    return {
        isLoggedIn,
    }
})
