<script setup lang="ts">
    import { createUuid } from "~/helpers/uuid"

    const user = useSupabaseUser()
    const { $client } = useNuxtApp()

    const getData = async () => {
        const { data } = await $client.projects.get.useQuery()
        console.log(data.value)
    }

    const addTestProject = async () => {
        try {
            await $client.projects.create.mutate({
                id: createUuid(),
                name: "This is a test project",
                created_at: new Date().toISOString(),
                owner_id: user.value?.id,
            })
        } catch (error) {
            console.log(error)
        }
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
            <button @click="addTestProject">Add test project</button>
            <pre wrap>{{ user }}</pre>
        </div>
    </section>
</template>
