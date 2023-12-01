<script setup lang="ts">
    interface IForgotPasswordData {
        email: string;
    }

    const supabase = useSupabaseClient();
    const submitted = ref(false);
    const submitError = ref(false);

    const submitHandler = async (fields: IForgotPasswordData) => {
        // Reset submit error
        submitError.value = false;

        const { data, error } = await supabase.auth.resetPasswordForEmail(fields.email, {
            redirectTo: 'http://localhost:3000/reset',
        })

        if(error) {
            console.log(error)
            submitError.value = true;
            return;
        } else {
            submitted.value = true;
        }      
    }
</script>

<template>
    <section class="container flex items-center justify-center gap-8 min-h-screen">
        <div class="w-1/2">
            <h1 class="text-3xl mb-2">The Hub</h1>
            <p>Where all the cool kids hang out</p>
        </div>
        <div class="w-1/2">
            <FormKit
                type="form"
                id="forgot-password-form"
                submit-label="Submit"
                @submit="submitHandler"
                :actions="false"
                #default="{ value }"
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
                    <p class="success">Your request was submitted successfully! Check your email to reset your password</p>
                </div>
            </FormKit>
        </div>
    </section>
</template>

