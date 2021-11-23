<template>
    <div id="loading" class="d-flex justify-content-center align-items-center text-center">
        <DualRingSpinner :size="iconSize"/>
        <div id="loading-text" v-html="text"/>
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
        iconSize: {
            type: Number,
            default: 45,
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
        font-size: 1.5rem;
    }
</style>