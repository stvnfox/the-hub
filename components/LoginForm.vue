<!-- eslint-disable vue/no-unused-vars -->
<script setup lang="ts">
    interface ILoginData {
        email: string
        password: string
    }

    const emit = defineEmits(["logged-in"])

    const supabase = useSupabaseClient()

    const submitHandler = async (fields: ILoginData) => {
        const { error } = await supabase.auth.signInWithPassword({
            email: fields.email,
            password: fields.password,
        })

        if (error) {
            // eslint-disable-next-line no-console
            console.error(error)
        } else {
            emit("logged-in")
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
        <h1>Login</h1>
        <hr />
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
            validation="required|length:6|matches:/[^a-zA-Z]/"
            :validation-messages="{
                matches: 'Please include at least one symbol',
            }"
            placeholder="Your password"
        />
        <p>Lost password? <NuxtLink to="/forgot">Reset password</NuxtLink></p>
        <FormKit
            type="submit"
            label="Login"
        />
    </FormKit>

    <div>
        <p>Don't have an account? <NuxtLink to="/register">Register</NuxtLink></p>
    </div>
</template>
