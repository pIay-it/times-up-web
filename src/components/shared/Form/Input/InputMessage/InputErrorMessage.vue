<template>
    <div class="invalid-feedback">
        <i class="fa fa-exclamation-circle me-1"/>
        <span v-html="text"/>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
    text: {
        type: String,
        default: "",
    },
});
</script>

<style lang="scss" scoped>
    .invalid-feedback {
        display: block !important;
    }
</style>