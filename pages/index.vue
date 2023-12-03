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
    const store = useGlobalStore()

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
    <the-hub v-else />
</template>
