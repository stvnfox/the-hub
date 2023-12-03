<template>
    <section class="container flex min-h-screen items-center justify-center gap-8">
        <div class="flex w-1/2 justify-center">
            <img
                class="w-80"
                src="../assets/images/logo-light.svg"
                alt="The Hub"
            />
        </div>
        <div class="w-1/2 rounded-xl border border-secondary-100 p-6">
            <slot name="form" />
        </div>
    </section>
</template>
