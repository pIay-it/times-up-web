<template>
    <div id="api-not-available" class="d-flex flex-column align-items-center justify-content-center">
        <h3 class="d-flex justify-content-center align-items-center">
            <i class="fa text-warning fa-bug me-2"/>
            <span v-html="$t('APIError.anErrorOccurred')"/>
        </h3>
        <button type="button" class="btn btn-primary" @click="$emit('retry')">
            <i class="fa fa-refresh me-2"/>
            <span v-html="$t('APIError.retry')"/>
        </button>
    </div>
</template>

<script setup>
import { defineEmits } from "vue";

defineEmits({ retry: () => true });
</script>