<script setup lang="ts">
    const supabase = useSupabase()
    const store = useUserStore()

    const signOut = async () => {
        store.$patch({
            isLoggedIn: false,
        })

        await supabase.signOut()
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
                    <button @click="signOut">Sign out</button>
                </li>
            </ul>
        </nav>
    </section>
</template>
