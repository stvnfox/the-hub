<script setup lang="ts">
    interface IForgotPasswordData {
        email: string
    }

    const supabase = useSupabaseClient()
    const submitted = ref(false)
    const submitError = ref(false)

    const submitHandler = async (fields: IForgotPasswordData) => {
        // Reset submit error
        submitError.value = false

        const { error } = await supabase.auth.resetPasswordForEmail(fields.email, {
            redirectTo: "http://localhost:3000/reset",
        })

        if (error) {
            // eslint-disable-next-line no-console
            console.log(error)
            submitError.value = true
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
                <h1>Forgot password</h1>
                <hr />
                <FormKit
                    type="text"
                    name="email"
                    label="Your email"
                    placeholder="jane@example.com"
                    validation="required|email"
                />

                <FormKit
                    type="submit"
                    label="Register"
                />
                <div v-if="submitError">
                    <p class="error">There was an error submitting your form.</p>
                </div>
                <div v-if="submitted">
                    <p class="success">
                        Your request was submitted successfully! Check your email to reset your password
                    </p>
                </div>
            </FormKit>
        </template>
    </authentication-page-base>
</template>
