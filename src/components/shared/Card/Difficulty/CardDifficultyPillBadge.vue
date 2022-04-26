<template>
    <span id="card-difficulty-pill-badge" class="card-difficulty-pill-badge badge rounded-pill small-shadow" :class="badgeClasses">
        <CardDifficultyIcon :difficulty="difficulty" class="me-2"/>
        <span v-html="badgeText"/>
    </span>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useI18n } from "vue-i18n";
import CardDifficultyIcon from "@/components/shared/Card/Difficulty/CardDifficultyIcon";
import { CARD_DIFFICULTY } from "@/helpers/constants/Card";

const props = defineProps({
    difficulty: {
        type: Number,
        required: true,
    },
});

const { t } = useI18n();

const badgeClasses = computed(() => ({
    "bg-success": props.difficulty === CARD_DIFFICULTY.EASY,
    "bg-primary": props.difficulty === CARD_DIFFICULTY.MEDIUM,
    "bg-danger": props.difficulty === CARD_DIFFICULTY.HARD,
}));
const badgeText = computed(() => t(`CardDifficultyPillBadge.difficultyLevel.${props.difficulty}`));
</script>