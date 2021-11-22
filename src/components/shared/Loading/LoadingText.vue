<template>
    <div id="loading" class="d-flex justify-content-center align-items-center text-center">
        <DualRingLoader :size="iconSize"/>
        <div id="loading-text">
            <slot/>
        </div>
    </div>
</template>

<script>
import DualRingLoader from "@/components/shared/Loading/DualRingLoader";

export default {
    name: "LoadingText",
    components: { DualRingLoader },
    props: {
        iconSize: {
            type: Number,
            default: 35,
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