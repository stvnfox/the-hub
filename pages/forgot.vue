<script setup lang="ts">
    interface ResetPasswordData {
        email: string
    }

    useHead({
        title: "The Hub | Forgot password",
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

    const submitHandler = async (fields: ResetPasswordData) => {
        // Reset submit error
        submitError.value = false

        const error = await supabase.resetPassword(fields.email)

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
                id="forgot-password-form"
                type="form"
                submit-label="Submit"
                :actions="false"
                @submit="submitHandler"
            >
                <div class="mb-4">
                    <h1 class="mb-3 text-lg">Forgot password</h1>
                    <p class="text-xs">
                        Oops, did you forget your password? No worries! We've got you covered at
                        <span class="text-secondary-700">The Hub</span>. Simply fill in your email below, and check your
                        inbox for further instructions. Just a few clicks, and you'll be back on track. Your project's
                        success awaits!
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
                    type="submit"
                    label="Send me the reset mail!"
                    input-class="bg-secondary-700 text-sm text-white border border-transparent hover:bg-transparent hover:text-secondary-700 hover:border-secondary-700 transition-colors px-4 py-2 rounded-md"
                    outer-class="mt-4 !mb-2"
                />
                <div v-if="submitError">
                    <p class="error">There was an error submitting your form.</p>
                </div>
                <div v-if="submitted">
                    <p class="success">
                        Your request was submitted successfully! Check your email to reset your password
                    </p>
                </div>
                <div class="mt-4 text-xs">
                    <span>Remember your password?</span>
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
