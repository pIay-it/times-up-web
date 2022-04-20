<template>
    <div id="loading" class="d-flex justify-content-center align-items-center text-center">
        <DualRingSpinner :size="iconSize" :color="color"/>
        <div id="loading-text" :style="loadingTextStyle" v-html="text"/>
    </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import DualRingSpinner from "@/components/shared/Loader/DualRingSpinner";

const props = defineProps({
    text: {
        type: String,
        default: "",
    },
    color: {
        type: String,
        default: "white",
    },
    iconSize: {
        type: Number,
        default: 45,
    },
    textSize: {
        type: Number,
        default: 26,
    },
});

const loadingTextStyle = computed(() => ({ "font-size": `${props.textSize}px` }));
</script>

<style lang="scss" scoped>
    #loading-icon {
        margin: 5px;
    }

    #loading-text {
        margin-left: 5px;
    }
</style>