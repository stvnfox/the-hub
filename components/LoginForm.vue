<script setup lang="ts">
    import type { LoginData } from "~/composables/useSupabase"

    const supabase = useSupabase
    const store = useUserStore()

    const submitHandler = async (fields: LoginData) => {
        const error = await supabase.signIn({
            email: fields.email,
            password: fields.password,
        })

        if (error) {
            // eslint-disable-next-line no-console
            console.error(error)
        } else {
            store.$patch({
                isLoggedIn: true,
            })
        }
    }
</script>

<template>
    <FormKit
        id="login-form"
        type="form"
        submit-label="Login"
        :actions="false"
        @submit="submitHandler"
    >
        <div class="mb-4">
            <h1 class="mb-3 text-lg">Welcome to <span class="text-secondary-700">The Hub</span></h1>
            <p class="text-xs font-semibold">Where Projects Thrive and Collaboration Flourishes.</p>
            <p class="text-xs">
                Log in to elevate your project management experience. The Hub brings simplicity to complexity, making
                task organization a breeze. Your projects, your way – streamlined and efficient. Let's get started!
            </p>
        </div>
        <FormKit
            type="text"
            name="email"
            label="Your email"
            placeholder="jane@example.com"
            validation="required|email"
        />
        <FormKit
            type="password"
            name="password"
            label="Password"
            outer-class="!mb-0"
            validation="required|length:6|matches:/[^a-zA-Z]/"
            :validation-messages="{
                matches: 'Please include at least one symbol',
            }"
            placeholder="Your password"
        />
        <NuxtLink
            to="/forgot"
            class="group w-fit text-xs text-secondary-500 transition-colors hover:text-secondary-700"
        >
            <span class="underline-hover after:bg-secondary-700"> Lost password? </span>
        </NuxtLink>
        <FormKit
            type="submit"
            label="Login"
            input-class="bg-secondary-700 text-sm text-white border border-transparent hover:bg-transparent hover:text-secondary-700 hover:border-secondary-700 transition-colors px-4 py-2 rounded-md"
            outer-class="mt-4 !mb-2"
        />
    </FormKit>

    <div class="mt-4 text-xs">
        Don't have an account?
        <NuxtLink
            to="/register"
            class="group w-fit text-xs text-secondary-500 transition-colors hover:text-secondary-700"
        >
            <span class="underline-hover after:bg-secondary-700"> Register here </span>
        </NuxtLink>
    </div>
</template>
