<template>
    <div id="input-success-message" class="valid-feedback" :class="messageClasses">
        <i class="me-1" :class="messageIconClasses"/>
        <span v-html="text"/>
    </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
    text: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "success",
    },
});

const messageClasses = computed(() => ({ "info-feedback": props.type === "info" }));
const messageIconClasses = computed(() => ({
    "fa fa-check-circle": props.type === "success",
    "fa fa-circle-info": props.type === "info",
}));
</script>

<style lang="scss" scoped>
    .valid-feedback {
        display: block !important;
    }

    .info-feedback {
        color: #0500b1;
    }
</style>