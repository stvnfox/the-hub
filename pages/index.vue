<script setup lang="ts">
    useHead({
        title: "The Hub",
        meta: [
            {
                name: "description",
                content:
                    "The Hub is a project management tool that brings simplicity to complexity, making task organization a breeze. Your projects, your way – streamlined and efficient. Let's get started!",
            },
        ],
    })

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
