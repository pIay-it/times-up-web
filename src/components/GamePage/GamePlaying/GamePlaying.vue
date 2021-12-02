<template>
    <div id="game-playing">
        <transition name="fade" mode="out-in">
            <TurnStarting v-if="gameState === 'turn-starting'" @player-is-ready="setGameState('turn-playing')"/>
            <TurnPlaying v-else-if="gameState === 'turn-playing'" @card-played="cardPlayed" @turn-is-over="setGameState('turn-summary')"/>
            <TurnSummary v-else-if="gameState === 'turn-summary'" :play="play"/>
            <RoundSummary v-else-if="gameState === 'round-summary'"/>
        </transition>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import TurnStarting from "@/components/GamePage/GamePlaying/Turn/TurnStarting";
import TurnPlaying from "@/components/GamePage/GamePlaying/Turn/TurnPlaying";
import TurnSummary from "@/components/GamePage/GamePlaying/Turn/TurnSummary";
import RoundSummary from "@/components/GamePage/GamePlaying/Round/RoundSummary";

export default {
    name: "GamePlaying",
    components: { RoundSummary, TurnSummary, TurnPlaying, TurnStarting },
    setup() {
        const store = useStore();
        return { game: computed(() => store.state.game.game) };
    },
    data() {
        return {
            gameState: "turn-playing",
            play: { cards: [] },
        };
    },
    methods: {
        setGameState(gameState) {
            this.gameState = gameState;
            if (gameState === "turn-starting") {
                this.resetPlay();
            }
        },
        resetPlay() {
            this.play.cards = [];
        },
        async cardPlayed(card) {
            this.play.cards.push(card);
            await this.$store.dispatch("game/updateGameCardById", { _id: card._id, data: card });
        },
    },
};
</script>