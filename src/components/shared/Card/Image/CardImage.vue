<template>
    <img id="card-image" :key="imageSource" v-lazy="imageSource" class="card-image small-shadow" alt="Card Image Helper" :style="imageStyle"/>
</template>

<script>
import noImage from "@/assets/jpg/no-image.jpg";

export default {
    name: "CardImage",
    props: {
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
    },
    computed: {
        imageSource() {
            return this.imageUrl ? this.imageUrl : noImage;
        },
        imageStyle() {
            return {
                "max-width": `${this.maxWidth}px`,
                "max-height": `${this.maxHeight}px`,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .card-image {
        border: 1px solid #727272;
        border-radius: 15px;
    }
</style>