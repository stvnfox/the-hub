<script setup lang="ts">
    import type { User } from "@supabase/supabase-js"
    import { createUuid } from "~/helpers/uuid"

    const { $client } = useNuxtApp()
    const supabase = useSupabase()
    const userData = ref<User | null>(null)

    // const inviteUser = async (email: string, projectId: string) => {
    //     try {
    //         await $client.users.inviteUser.mutate({
    //             email,
    //             projectId,
    //         })

    //         console.log("user is invited")
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const getUserId = async () => {
    //     const { data } = await $client.users.getUserId.useQuery({ email: "steven@wepburo.nl" })
    //     console.log(data.value)
    //     if (data.value) return data.value

    //     // return inviteUser("steven@wepburo.nl", "c49ba46e-4542-4eea-a29e-bc66033b5933")
    // }

    const getUserData = async () => {
        const { user } = await supabase.getUser()

        userData.value = user
    }

    // const getData = async () => {
    //     const { data } = await $client.projects.get.useQuery({ id: user.value?.id })
    //     console.log(data.value)
    // }

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
        getUserData()
        // getData()
        // getUserId()
    })
</script>

<template>
    <section class="flex gap-2">
        <sidebar-component />
        <div class="container flex-grow">
            <navigation-component />
            <button @click="addTestProject">Add test project</button>
            <pre wrap>{{ userData }}</pre>
        </div>
    </section>
</template>
