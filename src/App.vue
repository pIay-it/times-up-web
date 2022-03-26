<template>
    <Metainfo>
        <template #title="{ content }">
            {{ content }}
        </template>
    </Metainfo>
    <RouterView class="py-3 h-100 container-fluid fade-in"/>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
    name: "App",
    setup() {
        useMeta({
            title: "Time's Up by Play-IT",
            htmlAttrs: { lang: "fr", amp: true },
        });
    },
};
</script>