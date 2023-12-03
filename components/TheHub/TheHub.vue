<script setup lang="ts">
    const user = useSupabaseUser()
</script>

<template>
    <section class="flex gap-2">
        <sidebar-component />
        <div class="container flex-grow">
            <navigation-component />
            <pre wrap>{{ user }}</pre>
        </div>
    </section>
</template>
