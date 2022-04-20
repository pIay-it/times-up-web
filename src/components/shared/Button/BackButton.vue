<template>
    <RouterLink id="back-button" v-tooltip="$t('BackButton.back')" :to="to" type="button" class="times-up-anchor">
        <i class="fa-solid fa-chevron-left fa-3x"/>
    </RouterLink>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
    to: {
        type: String,
        required: true,
    },
});
</script>