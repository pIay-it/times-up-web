<template>
    <div id="game-playing">
        <transition name="fade" mode="out-in">
            <TurnStarting v-if="gameState === 'turn-starting'" @player-is-ready="setGameState('turn-playing')"/>
            <TurnPlaying v-else-if="gameState === 'turn-playing'" @card-played="cardPlayed" @turn-is-over="setGameState('turn-summary')"/>
            <TurnSummary v-else-if="gameState === 'turn-summary'" :play="play" @update-played-card-status="updatePlayedCardStatus"/>
            <RoundSummary v-else-if="gameState === 'round-summary'"/>
        </transition>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import TurnStarting from "@/components/GamePage/GamePlaying/Turn/TurnStarting";
import TurnPlaying from "@/components/GamePage/GamePlaying/Turn/TurnPlaying";
import TurnSummary from "@/components/GamePage/GamePlaying/Turn/TurnSummary/TurnSummary";
import RoundSummary from "@/components/GamePage/GamePlaying/Round/RoundSummary";
import Card from "@/classes/Card";

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
            if (card._id && !this.play.cards.find(({ _id }) => _id === card._id)) {
                this.play.cards.push(new Card(card));
                await this.$store.dispatch("game/updateGameCardById", { _id: card._id, data: card });
            }
        },
        updatePlayedCardStatus({ _id, status }) {
            const playedCardIdx = this.play.cards.findIndex(card => card._id === _id);
            if (playedCardIdx !== -1) {
                const playedCard = this.play.cards[playedCardIdx];
                this.play.cards.splice(playedCardIdx, 1, new Card({ ...playedCard, status }));
            }
        },
    },
};
</script>