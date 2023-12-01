<script setup lang="ts">
    interface IRegisterData {
        name: string
        email: string
        password: string
        password_confirm: string
    }

    const supabase = useSupabaseClient()
    const submitted = ref(false)
    const submitError = ref(false)

    const submitHandler = async (fields: IRegisterData) => {
        // Reset submit error
        submitError.value = false

        const { error } = await supabase.auth.signUp({
            email: fields.email,
            password: fields.password,
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
                id="registration-form"
                type="form"
                submit-label="Register"
                :actions="false"
                @submit="submitHandler"
            >
                <h1>Register!</h1>
                <hr />
                <FormKit
                    type="text"
                    name="name"
                    label="Your name"
                    placeholder="Jane Doe"
                    help="What do people call you?"
                    validation="required"
                />
                <FormKit
                    type="text"
                    name="email"
                    label="Your email"
                    placeholder="jane@example.com"
                    help="What email should we use?"
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
                        help="Choose a password"
                    />
                    <FormKit
                        type="password"
                        name="password_confirm"
                        label="Confirm password"
                        placeholder="Confirm password"
                        validation="required|confirm"
                        help="Confirm your password"
                    />
                </div>

                <FormKit
                    type="submit"
                    label="Register"
                />
                <div v-if="submitError">
                    <p class="error">There was an error submitting your form.</p>
                </div>
                <div v-if="submitted">
                    <p class="success">
                        Your form was submitted successfully! Check your email to complete the registration
                    </p>
                </div>
            </FormKit>
        </template>
    </authentication-page-base>
</template>
