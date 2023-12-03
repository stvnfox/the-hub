<script setup lang="ts">
    interface IResetPasswordData {
        password: string
        password_confirm: string
    }

    useHead({
        title: "The Hub | Reset password",
        meta: [
            {
                name: "description",
                content:
                    "The Hub is a project management tool that brings simplicity to complexity, making task organization a breeze. Your projects, your way – streamlined and efficient. Let's get started!",
            },
        ],
    })

    const supabase = useSupabaseClient()
    const submitError = ref(false)
    const errorMessage = ref("")

    const submitHandler = async (fields: IResetPasswordData) => {
        // Reset submit error
        submitError.value = false

        const { error } = await supabase.auth.updateUser({
            password: fields.password,
        })

        if (error) {
            submitError.value = true
            errorMessage.value = error.message
        } else {
            navigateTo("/")
        }
    }
</script>

<template>
    <authentication-page-base>
        <template #form>
            <FormKit
                id="reset-password-form"
                type="form"
                submit-label="Reset password"
                :actions="false"
                @submit="submitHandler"
            >
                <div class="mb-4">
                    <h1 class="mb-3 text-lg">Reset password</h1>
                    <p class="text-xs">
                        Ready to regain access? No problem! Fill in the required fields below and hit submit. Let's
                        ensure your projects stay on the path to success!
                    </p>
                </div>
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

                <FormKit
                    type="submit"
                    label="Register"
                    input-class="bg-secondary-700 text-sm text-white border border-transparent hover:bg-transparent hover:text-secondary-700 hover:border-secondary-700 transition-colors px-4 py-2 rounded-md"
                    outer-class="mt-4 !mb-2"
                />
                <div v-if="submitError">
                    <p
                        class="error"
                        v-text="errorMessage"
                    />
                </div>
            </FormKit>
        </template>
    </authentication-page-base>
</template>
