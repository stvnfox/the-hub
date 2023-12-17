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

    const supabase = useSupabase()
    const store = useUserStore()

    const getUserData = async () => {
        const { user } = await supabase.getUser()

        if (user) {
            store.$patch({
                isLoggedIn: true,
                userData: {
                    id: user.id,
                    email: user.email,
                },
            })
        } else {
            store.$patch({
                isLoggedIn: false,
                userData: null,
            })

            throw new Error("No user found")
        }
    }

    onMounted(() => {
        if (store.isLoggedIn) {
            getUserData()
        }
    })
</script>

<template>
    <authentication-page-base v-if="!store.isLoggedIn">
        <template #form>
            <login-form />
        </template>
    </authentication-page-base>
    <the-hub v-else />
</template>
