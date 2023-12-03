<script setup lang="ts">
    const user = useSupabaseUser()
    const { $client } = useNuxtApp()

    const getData = async () => {
        const { data } = await $client.projects.get.useQuery()
        console.log(data.value)
    }

    onMounted(() => {
        getData()
    })
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
