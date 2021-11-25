<template>
    <Metainfo>
        <template #title="{ content }">
            {{ content }}
        </template>
    </Metainfo>
    <RouterView class="pt-2 h-100 container-fluid"/>
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