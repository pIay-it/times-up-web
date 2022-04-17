<template>
    <div id="round-summary" class="d-flex flex-column h-100">
        <PageTitle v-html="$t('RoundSummary.roundSummary', { round: game.lastRoundNumber })"/>
        <Scoreboard :scores="lastGameRoundSummary.scores"/>
        <div id="round-summary-turns-container" class="d-flex flex-grow-1 flex-column container-fluid">
            <RoundSummaryTurn v-for="roundTurn of roundTurns" :key="roundTurn.turn" :history-entry="roundTurn"/>
        </div>
        <TimesUpFooter>
            <PlayITButton @click="validatedRound"/>
        </TimesUpFooter>
    </div>
</template>

<script setup>
import { computed, defineEmits } from "vue";
import PageTitle from "@/components/shared/Title/PageTitle";
import PlayITButton from "@/components/shared/Button/PlayITButton";
import Scoreboard from "@/components/shared/Game/GameScoreboard/GameScoreboard";
import RoundSummaryTurn from "@/components/shared/Game/Round/RoundSummary/RoundSummaryTurn";
import TimesUpFooter from "@/components/shared/Nav/TimesUpFooter";
import useGame from "@/composables/Game/useGame";

const emit = defineEmits({ "validated-round": () => true });

const { game } = useGame();
const roundTurns = game.value.getRoundTurns(game.value.lastRoundNumber).slice().reverse();

const lastGameRoundSummary = computed(() => game.value.getRoundSummary(game.value.lastRoundNumber));

const validatedRound = () => emit("validated-round");
</script>

<style lang="scss" scoped>
#round-summary-turns-container {
    overflow-y: scroll;
}
</style>