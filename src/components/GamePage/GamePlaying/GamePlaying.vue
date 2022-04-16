<template>
    <div id="game-playing">
        <Transition name="fade" mode="out-in">
            <RoundStarting v-if="gameState === GAME_STATES.ROUND_STARTING" :key="GAME_STATES.ROUND_STARTING"
                           @start-turn="setGameState(GAME_STATES.TURN_STARTING)"/>
            <TurnStarting v-else-if="gameState === GAME_STATES.TURN_STARTING" :key="GAME_STATES.TURN_STARTING"
                          @player-is-ready="setGameState(GAME_STATES.TURN_PLAYING)"
                          @show-round-rules="setGameState(GAME_STATES.ROUND_STARTING)"/>
            <TurnPlaying v-else-if="gameState === GAME_STATES.TURN_PLAYING" :key="GAME_STATES.TURN_PLAYING"
                         @card-played="cardPlayed" @turn-is-over="setGameState(GAME_STATES.TURN_SUMMARY)"/>
            <TurnSummary v-else-if="gameState === GAME_STATES.TURN_SUMMARY" :key="GAME_STATES.TURN_SUMMARY"
                         :play="play" @update-played-card-status="updatePlayedCardStatus"
                         @validated-turn="validatedTurn" @reset-turn="resetTurn"/>
            <RoundSummary v-else-if="gameState === GAME_STATES.ROUND_SUMMARY" :key="GAME_STATES.ROUND_SUMMARY"
                          @validated-round="validatedRound"/>
        </Transition>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import TurnStarting from "@/components/GamePage/GamePlaying/Turn/TurnStarting/TurnStarting";
import TurnPlaying from "@/components/GamePage/GamePlaying/Turn/TurnPlaying";
import TurnSummary from "@/components/GamePage/GamePlaying/Turn/TurnSummary/TurnSummary";
import RoundSummary from "@/components/shared/Game/Round/RoundSummary/RoundSummary";
import useError from "@/composables/Error/useError";
import RoundStarting from "@/components/GamePage/GamePlaying/Round/RoundStarting";
import Card from "@/classes/Card";
import { GAME_STATES } from "@/helpers/constants/Game";

export default {
    name: "GamePlaying",
    components: { RoundStarting, RoundSummary, TurnSummary, TurnPlaying, TurnStarting },
    setup() {
        const store = useStore();
        const { displayError } = useError();
        return {
            displayError,
            game: computed(() => store.state.game.game),
            GAME_STATES,
        };
    },
    data() {
        return {
            gameState: GAME_STATES.TURN_STARTING,
            play: { cards: [] },
        };
    },
    created() {
        if (this.game.isNewRound) {
            this.gameState = GAME_STATES.ROUND_STARTING;
        }
    },
    methods: {
        setGameState(gameState) {
            this.gameState = gameState;
            if (gameState === GAME_STATES.TURN_STARTING) {
                this.resetPlay();
            }
        },
        resetPlay() {
            this.play.cards = [];
        },
        async resetTurn() {
            this.gameState = GAME_STATES.TURN_STARTING;
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
                const newGameState = this.game.isNewRound ? GAME_STATES.ROUND_SUMMARY : GAME_STATES.TURN_STARTING;
                this.setGameState(newGameState);
            } catch (err) {
                this.displayError(err);
            } finally {
                await this.$store.dispatch("game/setIsUpdatingGame", false);
            }
        },
        validatedRound() {
            this.setGameState(GAME_STATES.ROUND_STARTING);
        },
    },
};
</script>