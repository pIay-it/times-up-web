<template>
    <div id="scoreboard" class="times-up-card py-2 mb-4">
        <h4 class="text-center" v-html="$t('GameScoreboard.teams')"/>
        <div class="d-flex">
            <GameTeamScore :key="firstTeamScore.team" :score="firstTeamScore" :is-winner="hasFirstTeamWon"
                           class="flex-grow-1"/>
            <img v-if="isTieBetweenTeams" :src="champagneGlassesSVG" width="45" alt="Tie"/>
            <GameTeamScore :key="secondTeamScore.team" :score="secondTeamScore" :is-winner="hasSecondTeamWon"
                           class="flex-grow-1"/>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";
import GameTeamScore from "@/components/shared/Game/GameScoreboard/GameTeamScore";
import useGame from "@/composables/Game/useGame";
import champagneGlassesSVG from "@/assets/svg/game/champagne-glasses-mini.svg";
import GameSummaryScore from "@/classes/GameSummaryScore";

const props = defineProps({
    scores: {
        type: [Object],
        required: true,
        validator: scores => scores.every(score => score instanceof GameSummaryScore),
    },
});

const { game } = useGame();
const getTeamScore = team => props.scores.find(score => team === score.team);
const firstTeamScore = getTeamScore(game.value.firstTeam?.name);
const secondTeamScore = getTeamScore(game.value.secondTeam?.name);
const isTieBetweenTeams = firstTeamScore.score === secondTeamScore.score;
const hasFirstTeamWon = !isTieBetweenTeams && firstTeamScore.score > secondTeamScore.score;
const hasSecondTeamWon = !isTieBetweenTeams && !hasFirstTeamWon;
</script>