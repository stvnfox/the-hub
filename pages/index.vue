<script setup lang="ts">
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()
    const store = useGlobalStore()

    const setIsLoggedInValue = (value: boolean) => {
        store.$patch({
            isLoggedIn: value,
        })
    }

    const logout = async () => {
        await supabase.auth.signOut()

        setIsLoggedInValue(false)
    }

    onMounted(() => {
        if (!user.value) {
            setIsLoggedInValue(false)
        } else {
            setIsLoggedInValue(true)
        }
    })
</script>

<template>
    <authentication-page-base v-if="!store.isLoggedIn">
        <template #form>
            <login-form @logged-in="setIsLoggedInValue(true)" />
        </template>
    </authentication-page-base>
    <section v-else>
        <div class="container min-h-screen">
            <pre wrap>{{ user }}</pre>
            <button
                v-if="store.isLoggedIn"
                @click="logout"
            >
                Logout
            </button>
        </div>
    </section>
</template>
