<template>
    <Metainfo>
        <template #title="{ content }">
            {{ content }}
        </template>
    </Metainfo>
    <RouterView class="h-100 pt-2 px-2"/>
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