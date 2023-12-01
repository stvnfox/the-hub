<template>
    <section class="container flex items-center justify-center gap-8 min-h-screen">
        <div class="w-1/2 flex justify-center">
            <img
                class="w-80"
                src="../assets/images/logo-light.svg"
                alt="The Hub"
            />
        </div>
        <div class="w-1/2">
            <slot name="form" />
        </div>
    </section>
</template>
