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
    <authentication-page-base>
        <template #form>
            <login-form v-if="!isLoggedIn" @logged-in="isLoggedIn = true"/>
            <pre v-else wrap>{{ user }}</pre>
        </template>
    </authentication-page-base>
    <button v-if="isLoggedIn" @click="logout">Logout</button>
</template>