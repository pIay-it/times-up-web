<template>
    <div class="game-team-score">
        <GameTeamLabel :team="scoreTeam"/>
        <div class="text-center">
            <i v-if="isWinner" class="fa-solid fa-trophy text-warning me-2"/>
            <span v-html="scoreLabel"/>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useI18n } from "vue-i18n";
import GameTeamLabel from "@/components/shared/Game/GameTeamLabel";
import useGame from "@/composables/Game/useGame";
import GameSummaryScore from "@/classes/GameSummaryScore";

const props = defineProps({
    score: {
        type: GameSummaryScore,
        required: true,
    },
    isWinner: {
        type: Boolean,
        required: true,
    },
});

const { t } = useI18n();
const { game } = useGame();

const scoreLabel = computed(() => {
    const { score } = props.score;
    return t("GameTeamScore.score", { score }, score);
});
const scoreTeam = computed(() => game.value.getTeamWithName(props.score.team));
</script>