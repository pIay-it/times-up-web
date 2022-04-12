<template>
    <div id="round-summary" class="d-flex flex-column h-100">
        <PageTitle v-html="$t('RoundSummary.roundSummary', { round: game.lastRoundNumber })"/>
        <div id="round-summary-teams-score" class="times-up-card py-2 mb-4">
            <h4 class="text-center" v-html="$t('RoundSummary.teams')"/>
            <div class="d-flex">
                <RoundSummaryTeam v-for="score of lastGameRoundSummary.scores" :key="score.team" :score="score" class="flex-grow-1"/>
            </div>
        </div>
        <div id="round-summary-turns-container" class="d-flex flex-grow-1 flex-column container-fluid">
            <RoundSummaryTurn v-for="roundTurn of roundTurns" :key="roundTurn.turn" :history-entry="roundTurn"/>
        </div>
        <div id="round-summary-footer" class="d-flex justify-content-center">
            <div class="round-summary-footer-button-container pt-2">
                <PlayITButton @click="validatedRound"/>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import PageTitle from "@/components/shared/Title/PageTitle";
import RoundSummaryTeam from "@/components/GamePage/GamePlaying/Round/RoundSummary/RoundSummaryTeam";
import PlayITButton from "@/components/shared/Button/PlayITButton";
import RoundSummaryTurn from "@/components/GamePage/GamePlaying/Round/RoundSummary/RoundSummaryTurn";

export default {
    name: "RoundSummary",
    components: { RoundSummaryTurn, PlayITButton, RoundSummaryTeam, PageTitle },
    emits: { "validated-round": () => true },
    setup() {
        const store = useStore();
        const game = computed(() => store.state.game.game);
        const lastGameRoundSummary = computed(() => game.value.getRoundSummary(game.value.lastRoundNumber));
        const roundTurns = game.value.getRoundTurns(game.value.lastRoundNumber).slice().reverse();
        return {
            game,
            lastGameRoundSummary,
            roundTurns,
        };
    },
    methods: {
        validatedRound() {
            return this.$emit("validated-round");
        },
    },
};
</script>

<style>
    .round-summary-footer-button-container {
        width: 100px;
        height: 65px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>