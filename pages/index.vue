<script setup lang="ts">
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()
    const store = useGlobalStore()

    const logout = async () => {
        await supabase.auth.signOut()

        store.setIsLoggedInValue(false)
    }

    onMounted(() => {
        if (!user.value) {
            store.setIsLoggedInValue(false)
        } else {
            store.setIsLoggedInValue(true)
        }
    })
</script>

<template>
    <authentication-page-base v-if="!store.isLoggedIn">
        <template #form>
            <login-form />
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
