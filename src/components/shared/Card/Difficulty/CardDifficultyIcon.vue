<template>
    <i :class="difficultyIconClasses"/>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
    difficulty: {
        type: Number,
        required: true,
    },
});

const difficultyIconClasses = computed(() => ({
    "fa fa-seedling": props.difficulty === 1,
    "fa fa-cloud-rain": props.difficulty === 2,
    "fa fa-fire-flame-curved": props.difficulty === 3,
}));
</script>