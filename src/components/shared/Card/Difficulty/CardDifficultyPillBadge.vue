<template>
    <span id="card-difficulty-pill-badge" class="card-difficulty-pill-badge badge rounded-pill small-shadow" :class="badgeClasses">
        <CardDifficultyIcon :difficulty="difficulty" class="me-2"/>
        <span v-html="badgeText"/>
    </span>
</template>

<script>
import CardDifficultyIcon from "@/components/shared/Card/Difficulty/CardDifficultyIcon";

export default {
    name: "CardDifficultyPillBadge",
    components: { CardDifficultyIcon },
    props: {
        difficulty: {
            type: Number,
            required: true,
        },
    },
    computed: {
        badgeClasses() {
            return {
                "bg-success": this.difficulty === 1,
                "bg-primary": this.difficulty === 2,
                "bg-danger": this.difficulty === 3,
            };
        },
        badgeText() {
            return this.$t(`CardDifficultyPillBadge.difficultyLevel.${this.difficulty}`);
        },
    },
};
</script>