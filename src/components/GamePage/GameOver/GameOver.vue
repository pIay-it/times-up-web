<template>
    <div id="game-over" class="h-100">
        <Transition name="fade" mode="out-in">
            <RoundSummary v-if="gameState === GAME_STATE.ROUND_SUMMARY" :key="GAME_STATE.ROUND_SUMMARY"
                          @validated-round="setGameState(GAME_STATE.GAME_SUMMARY)"/>
            <GameSummary v-else-if="gameState === GAME_STATE.GAME_SUMMARY" :key="GAME_STATE.GAME_SUMMARY"
                         @show-game-history="setGameState(GAME_STATE.GAME_HISTORY)"/>
            <GameHistory v-else-if="gameState === GAME_STATE.GAME_HISTORY" :key="GAME_STATE.GAME_HISTORY"
                         @show-game-summary="setGameState(GAME_STATE.GAME_SUMMARY)"/>
        </Transition>
    </div>
</template>

<script setup>
import { ref } from "vue";
import RoundSummary from "@/components/shared/Game/Round/RoundSummary/RoundSummary";
import GameSummary from "@/components/GamePage/GameOver/GameSummary";
import GameHistory from "@/components/GamePage/GameOver/GameHistory";
import { GAME_STATE } from "@/helpers/constants/Game";

const gameState = ref(GAME_STATE.ROUND_SUMMARY);
const setGameState = value => (gameState.value = value);
</script>