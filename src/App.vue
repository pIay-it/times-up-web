<template>
    <Metainfo>
        <template #title="{ content }">
            {{ content }}
        </template>
    </Metainfo>
    <RouterView class="py-3 h-100 container-fluid fade-in"/>
    <FullScreenCountdown/>
</template>

<script>
import { useMeta } from "vue-meta";
import FullScreenCountdown from "@/components/FullscreenCountdown/FullScreenCountdown";

export default {
    name: "App",
    components: { FullScreenCountdown },
    setup() {
        useMeta({
            title: "Time's Up by Play-IT",
            htmlAttrs: { lang: "fr", amp: true },
        });
    },
};
</script>