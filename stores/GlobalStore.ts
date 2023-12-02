export const useGlobalStore = defineStore("global-store", () => {
    const isLoggedIn = ref(false)

    const setIsLoggedInValue = (value: boolean) => {
        isLoggedIn.value = value
    }

    return {
        isLoggedIn,
        setIsLoggedInValue,
    }
})
