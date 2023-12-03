<script setup lang="ts">
    const supabase = useSupabaseClient()
    const store = useGlobalStore()

    const logout = async () => {
        await supabase.auth.signOut()

        store.setIsLoggedInValue(false)
    }
</script>
<template>
    <section class="container flex justify-end py-6">
        <nav>
            <ul class="flex items-center gap-6">
                <li>
                    <NuxtLink to="/profile"><font-awesome-icon :icon="['fas', 'user']" /></NuxtLink>
                </li>
                <li>
                    <button @click="logout">Logout</button>
                </li>
            </ul>
        </nav>
    </section>
</template>
