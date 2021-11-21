<template>
    <!-- eslint-disable-next-line vue/no-unregistered-components -->
    <metainfo>
        <template #title="{ content }">
            {{ content }}
        </template>
    </metainfo>
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