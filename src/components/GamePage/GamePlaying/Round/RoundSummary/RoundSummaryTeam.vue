<template>
    <div class="round-summary-team-score">
        <GameTeamLabel :team="scoreTeam"/>
        <div class="text-center">
            <i v-if="didTeamWinRound" class="fa-solid fa-trophy text-warning me-2"/>
            <span v-html="scoreLabel"/>
        </div>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import GameTeamLabel from "@/components/shared/Game/GameTeamLabel";

export default {
    name: "RoundSummaryTeam",
    components: { GameTeamLabel },
    props: {
        score: {
            type: Object,
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
            return this.$t("RoundSummaryTeamScore.score", { score }, score);
        },
        scoreTeam() {
            return this.game.getTeamWithName(this.score.team);
        },
        didTeamWinRound() {
            return this.game.getRoundWinningTeams(this.game.lastRoundNumber).includes(this.score.team);
        },
    },
};
</script>