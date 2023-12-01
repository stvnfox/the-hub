<script setup lang="ts">
    const user = useSupabaseUser();
    const supabase = useSupabaseClient();
    const isLoggedIn = ref(false);

    const logout = async () => {
        await supabase.auth.signOut();
        isLoggedIn.value = false;
    }

    onMounted(() => {
        if(!user.value) {
            isLoggedIn.value = false
        } else {
            isLoggedIn.value = true
        }
    })
</script>

<template>
    <section class="container flex items-center justify-center gap-8 min-h-screen">
        <div class="w-1/2">
            <h1 class="text-3xl mb-2">The Hub</h1>
            <p>Where all the cool kids hang out</p>
        </div>
        <div class="w-1/2">
            <login-form v-if="!isLoggedIn" @logged-in="isLoggedIn = true"/>
            <pre v-else wrap>{{ user }}</pre>
        </div>
    </section>
    <button v-if="isLoggedIn" @click="logout">Logout</button>
</template>