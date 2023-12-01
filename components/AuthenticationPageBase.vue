<template>
    <section class="container flex items-center justify-center gap-8 min-h-screen">
        <div class="w-1/2">
            <h1 class="text-3xl mb-2">The Hub</h1>
            <p>Where all the cool kids hang out</p>
        </div>
        <div class="w-1/2">
            <slot name="form" />
        </div>
    </section>
</template>
