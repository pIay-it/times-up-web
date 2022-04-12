<template>
    <div id="game-playing">
        <Transition name="fade" mode="out-in">
            <RoundStarting v-if="gameState === 'round-starting'" key="round-starting" @start-turn="setGameState('turn-starting')"/>
            <TurnStarting v-else-if="gameState === 'turn-starting'" key="turn-starting"
                          @player-is-ready="setGameState('turn-playing')" @show-round-rules="setGameState('round-starting')"/>
            <TurnPlaying v-else-if="gameState === 'turn-playing'" key="turn-playing" @card-played="cardPlayed"
                         @turn-is-over="setGameState('turn-summary')"/>
            <TurnSummary v-else-if="gameState === 'turn-summary'" key="turn-summary" :play="play" @update-played-card-status="updatePlayedCardStatus"
                         @validated-turn="validatedTurn" @reset-turn="resetTurn"/>
            <RoundSummary v-else-if="gameState === 'round-summary'" key="round-summary" @validated-round="validatedRound"/>
        </Transition>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import TurnStarting from "@/components/GamePage/GamePlaying/Turn/TurnStarting/TurnStarting";
import TurnPlaying from "@/components/GamePage/GamePlaying/Turn/TurnPlaying";
import TurnSummary from "@/components/GamePage/GamePlaying/Turn/TurnSummary/TurnSummary";
import RoundSummary from "@/components/GamePage/GamePlaying/Round/RoundSummary/RoundSummary";
import useError from "@/composables/Error/useError";
import Card from "@/classes/Card";
import RoundStarting from "@/components/GamePage/GamePlaying/Round/RoundStarting";

export default {
    name: "GamePlaying",
    components: { RoundStarting, RoundSummary, TurnSummary, TurnPlaying, TurnStarting },
    setup() {
        const store = useStore();
        const { displayError } = useError();
        return {
            displayError,
            game: computed(() => store.state.game.game),
        };
    },
    data() {
        return {
            // Values are : "round-starting", "turn-starting", "turn-playing", "turn-summary", "round-summary"
            gameState: "turn-starting",
            play: { cards: [] },
        };
    },
    created() {
        if (this.game.isNewRound) {
            this.gameState = "round-starting";
        }
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
        async resetTurn() {
            this.gameState = "turn-starting";
            for (const playedCard of this.play.cards) {
                await this.$store.dispatch("game/updateGameCardById", { _id: playedCard._id, data: { status: "to-guess", playingTime: undefined } });
            }
            this.resetPlay();
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
        async validatedTurn() {
            try {
                await this.$store.dispatch("game/setIsUpdatingGame", true);
                const body = this.play.cards.length ? this.play : undefined;
                const { data } = await this.$timesUpAPI.makeGamePlay(this.game._id, body);
                await this.$store.dispatch("game/setGame", data);
                const newGameState = this.game.isNewRound ? "round-summary" : "turn-starting";
                this.setGameState(newGameState);
            } catch (err) {
                this.displayError(err);
            } finally {
                await this.$store.dispatch("game/setIsUpdatingGame", false);
            }
        },
        validatedRound() {
            this.setGameState("round-starting");
        },
    },
};
</script>