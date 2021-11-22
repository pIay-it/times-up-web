<template>
    <metainfo>
        <template #title="{ content }">
            {{ content }}
        </template>
    </metainfo>
    <router-view class="h-100"/>
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