<template>
    <i :class="difficultyIconClasses"/>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { CARD_DIFFICULTY } from "@/helpers/constants/Card";

const props = defineProps({
    difficulty: {
        type: Number,
        required: true,
    },
});

const difficultyIconClasses = computed(() => ({
    "fa fa-seedling": props.difficulty === CARD_DIFFICULTY.EASY,
    "fa fa-cloud-rain": props.difficulty === CARD_DIFFICULTY.MEDIUM,
    "fa fa-fire-flame-curved": props.difficulty === CARD_DIFFICULTY.HARD,
}));
</script>