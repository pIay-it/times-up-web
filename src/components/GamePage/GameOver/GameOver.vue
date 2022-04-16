<template>
    <div id="game-over" class="h-100">
        <Transition name="fade" mode="out-in">
            <RoundSummary v-if="gameState === GAME_STATES.ROUND_SUMMARY" :key="GAME_STATES.ROUND_SUMMARY"
                          @validated-round="setGameState(GAME_STATES.GAME_SUMMARY)"/>
            <GameSummary v-else-if="gameState === GAME_STATES.GAME_SUMMARY" :key="GAME_STATES.GAME_SUMMARY"
                         @show-game-history="setGameState(GAME_STATES.GAME_HISTORY)"/>
            <GameHistory v-else-if="gameState === GAME_STATES.GAME_HISTORY" :key="GAME_STATES.GAME_HISTORY"
                         @show-game-summary="setGameState(GAME_STATES.GAME_SUMMARY)"/>
        </Transition>
    </div>
</template>

<script>
import { ref } from "vue";
import RoundSummary from "@/components/shared/Game/Round/RoundSummary/RoundSummary";
import GameSummary from "@/components/GamePage/GameOver/GameSummary";
import GameHistory from "@/components/GamePage/GameOver/GameHistory";
import { GAME_STATES } from "@/helpers/constants/Game";

export default {
    name: "GameOver",
    components: { GameHistory, GameSummary, RoundSummary },
    setup() {
        const gameState = ref(GAME_STATES.ROUND_SUMMARY);
        const setGameState = value => (gameState.value = value);
        return {
            gameState,
            setGameState,
            GAME_STATES,
        };
    },
};
</script>