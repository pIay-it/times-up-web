<template>
    <div id="game-over" class="d-flex flex-column h-100 align-items-center">
        <PageTitle v-html="$t('GameOver.gameResults')"/>
        <div id="game-results" class="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <i class="fa fa-trophy text-warning fa-4x"/>
            <h1 class="text-center my-4" v-html="winningTeamText"/>
            <h1 class="text-center" v-html="highestFinalScoreText"/>
        </div>
        <div id="game-over-footer" class="d-flex justify-content-around align-items-center w-100">
            <div class="game-over-footer-button-container pt-2">
                <RouterLink class="times-up-anchor" to="/game-lobby">
                    <i v-tooltip="$t('GameOver.newGame')" class="fa-solid fa-arrow-right-to-bracket fa-flip-horizontal fa-3x"/>
                </RouterLink>
            </div>
            <div class="game-over-footer-button-container pt-2">
                <i class="fa-solid fa-clock-rotate-left fa-3x"/>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import PageTitle from "@/components/shared/Title/PageTitle";

export default {
    name: "GameOver",
    components: { PageTitle },
    setup() {
        const store = useStore();
        return { game: computed(() => store.state.game.game) };
    },
    computed: {
        winningTeamText() {
            const { isTieBetweenTeams, winningTeam } = this.game;
            return isTieBetweenTeams ? this.$t("GameOver.tieBetweenTeams") : this.$t("GameOver.gameWonByTeam", { winningTeam });
        },
        highestFinalScoreText() {
            const { winningTeams } = this.game;
            const score = this.game.getTeamFinalScore(winningTeams[0]);
            return this.$t("GameOver.score", { score }, score);
        },
    },
};
</script>