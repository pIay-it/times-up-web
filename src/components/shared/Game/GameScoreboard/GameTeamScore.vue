<template>
    <div class="game-team-score">
        <GameTeamLabel :team="scoreTeam"/>
        <div class="text-center">
            <i v-if="isWinner" class="fa-solid fa-trophy text-warning me-2"/>
            <span v-html="scoreLabel"/>
        </div>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import GameTeamLabel from "@/components/shared/Game/GameTeamLabel";
import GameSummaryScore from "@/classes/GameSummaryScore";

export default {
    name: "GameTeamScore",
    components: { GameTeamLabel },
    props: {
        score: {
            type: GameSummaryScore,
            required: true,
        },
        isWinner: {
            type: Boolean,
            required: true,
        },
    },
    setup() {
        const store = useStore();
        const game = computed(() => store.state.game.game);
        return { game };
    },
    computed: {
        scoreLabel() {
            const { score } = this.score;
            return this.$t("GameTeamScore.score", { score }, score);
        },
        scoreTeam() {
            return this.game.getTeamWithName(this.score.team);
        },
    },
};
</script>