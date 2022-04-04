<template>
    <div id="loading" class="d-flex justify-content-center align-items-center text-center">
        <DualRingSpinner :size="iconSize" :color="color"/>
        <div id="loading-text" :style="loadingTextStyle" v-html="text"/>
    </div>
</template>

<script>
import DualRingSpinner from "@/components/shared/Loader/DualRingSpinner";

export default {
    name: "DefaultLoader",
    components: { DualRingSpinner },
    props: {
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
    },
    computed: {
        loadingTextStyle() {
            return { "font-size": `${this.textSize}px` };
        },
    },
};
</script>

<style lang="scss" scoped>
    #loading-icon {
        margin: 5px;
    }

    #loading-text {
        margin-left: 5px;
    }
</style>