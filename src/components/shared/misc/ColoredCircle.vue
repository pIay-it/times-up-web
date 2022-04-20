<template>
    <div class="colored-circle" :style="{ backgroundColor: color }"/>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
    color: {
        type: String,
        required: true,
    },
});
</script>

<style scoped lang="scss">
.colored-circle {
    border-radius: 50px;
    height: 15px;
    width: 15px;
    box-shadow: 1px 1px 3px #000000;
}
</style>