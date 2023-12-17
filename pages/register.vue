<script setup lang="ts">
    interface RegisterData {
        name: string
        email: string
        password: string
        password_confirm: string
    }
    useHead({
        title: "The Hub | Register",
        meta: [
            {
                name: "description",
                content:
                    "The Hub is a project management tool that brings simplicity to complexity, making task organization a breeze. Your projects, your way – streamlined and efficient. Let's get started!",
            },
        ],
    })

    const supabase = useSupabase()
    const submitted = ref(false)
    const submitError = ref(false)

    const submitHandler = async (fields: RegisterData) => {
        // Reset submit error
        submitError.value = false

        const error = await supabase.signUp({
            email: fields.email,
            password: fields.password,
        })

        if (error) {
            submitError.value = true

            throw new Error(error.message)
        } else {
            submitted.value = true
        }
    }
</script>

<template>
    <authentication-page-base>
        <template #form>
            <FormKit
                id="registration-form"
                type="form"
                submit-label="Register"
                :actions="false"
                @submit="submitHandler"
            >
                <div class="mb-4">
                    <h1 class="mb-3 text-lg">Welcome to <span class="text-secondary-700">The Hub</span></h1>
                    <p class="text-xs">
                        Welcome to The Hub, your central hub for seamless project management! Get started on your
                        project journey by creating your account. Unleash the power of collaboration, organization, and
                        productivity. Your projects are about to reach new heights. Let's dive in!
                    </p>
                </div>
                <FormKit
                    type="text"
                    name="name"
                    label="Your name"
                    placeholder="Jane Doe"
                    validation="required"
                />
                <FormKit
                    type="text"
                    name="email"
                    label="Your email"
                    placeholder="jane@example.com"
                    validation="required|email"
                />
                <div class="double">
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
                    <FormKit
                        type="password"
                        name="password_confirm"
                        label="Confirm password"
                        placeholder="Confirm password"
                        validation="required|confirm"
                    />
                </div>

                <FormKit
                    type="submit"
                    label="Register"
                    input-class="bg-secondary-700 text-sm text-white border border-transparent hover:bg-transparent hover:text-secondary-700 hover:border-secondary-700 transition-colors px-4 py-2 rounded-md"
                    outer-class="mt-4 !mb-2"
                />
                <div v-if="submitError">
                    <p class="error">There was an error submitting your form.</p>
                </div>
                <div v-if="submitted">
                    <p class="success">
                        Your form was submitted successfully! Check your email to complete the registration
                    </p>
                </div>
                <div class="mt-4 text-xs">
                    Already have an account?
                    <NuxtLink
                        to="/"
                        class="group w-fit text-xs text-secondary-500 transition-colors hover:text-secondary-700"
                    >
                        <span class="underline-hover after:bg-secondary-700"> Login here </span>
                    </NuxtLink>
                </div>
            </FormKit>
        </template>
    </authentication-page-base>
</template>
