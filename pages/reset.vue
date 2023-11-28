<script setup lang="ts">
    interface IResetPasswordData {
        password: string;
        password_confirm: string;
    }

    const supabase = useSupabaseClient();
    const submitError = ref(false);
    const errorMessage = ref('');

    const submitHandler = async (fields: IResetPasswordData) => {
        // Reset submit error
        submitError.value = false;
        
        const { error } = await supabase.auth.updateUser({
            password: fields.password
        })

        if(error) {
            submitError.value = true;
            errorMessage.value = error.message
            return;
        } else {
            navigateTo('/')
        }      
    }
</script>

<template>
    <FormKit
        type="form"
        id="reset-password-form"
        submit-label="Reset password"
        @submit="submitHandler"
        :actions="false"
        #default="{ value }"
    >
        <h1>Reset password</h1>
        <hr />
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

        <FormKit
            type="submit"
            label="Register"
        />
        <div v-if="submitError">
            <p class="error" v-text="errorMessage"/>
        </div>
    </FormKit>
</template>

