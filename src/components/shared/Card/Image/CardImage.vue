<template>
    <img id="card-image" :key="imageSource" v-lazy="imageSource" class="card-image small-shadow" alt="Card Image Helper" :style="imageStyle"/>
</template>

<script setup>
import { computed, defineProps } from "vue";
import noImage from "@/assets/jpg/no-image.jpg";

const props = defineProps({
    imageUrl: {
        type: String,
        default: "",
    },
    maxWidth: {
        type: Number,
        default: 100,
    },
    maxHeight: {
        type: Number,
        default: 100,
    },
});

const imageSource = computed(() => props.imageUrl ? props.imageUrl : noImage);
const imageStyle = computed(() => ({
    "max-width": `${props.maxWidth}px`,
    "max-height": `${props.maxHeight}px`,
}));
</script>

<style lang="scss" scoped>
    .card-image {
        border: 1px solid #727272;
        border-radius: 15px;
    }
</style>