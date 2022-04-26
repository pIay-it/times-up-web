<template>
    <div id="game-playing">
        <Transition name="fade" mode="out-in">
            <RoundStarting v-if="gameState === GAME_STATE.ROUND_STARTING" :key="GAME_STATE.ROUND_STARTING"
                           @start-turn="setGameState(GAME_STATE.TURN_STARTING)"/>
            <TurnStarting v-else-if="gameState === GAME_STATE.TURN_STARTING" :key="GAME_STATE.TURN_STARTING"
                          @player-is-ready="setGameState(GAME_STATE.TURN_PLAYING)"
                          @show-round-rules="setGameState(GAME_STATE.ROUND_STARTING)"/>
            <TurnPlaying v-else-if="gameState === GAME_STATE.TURN_PLAYING" :key="GAME_STATE.TURN_PLAYING"
                         @card-played="cardPlayed" @turn-is-over="setGameState(GAME_STATE.TURN_SUMMARY)"/>
            <TurnSummary v-else-if="gameState === GAME_STATE.TURN_SUMMARY" :key="GAME_STATE.TURN_SUMMARY"
                         :play="play" @update-played-card-status="updatePlayedCardStatus"
                         @validated-turn="validatedTurn" @reset-turn="resetTurn"/>
            <RoundSummary v-else-if="gameState === GAME_STATE.ROUND_SUMMARY" :key="GAME_STATE.ROUND_SUMMARY"
                          @validated-round="validatedRound"/>
        </Transition>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import TurnStarting from "@/components/GamePage/GamePlaying/Turn/TurnStarting/TurnStarting";
import TurnPlaying from "@/components/GamePage/GamePlaying/Turn/TurnPlaying";
import TurnSummary from "@/components/GamePage/GamePlaying/Turn/TurnSummary/TurnSummary";
import RoundSummary from "@/components/shared/Game/Round/RoundSummary/RoundSummary";
import RoundStarting from "@/components/GamePage/GamePlaying/Round/RoundStarting";
import useError from "@/composables/Error/useError";
import useGame from "@/composables/Game/useGame";
import Card from "@/classes/Card";
import { GAME_STATE } from "@/helpers/constants/Game";
import useTimesUpAPI from "@/composables/API/useTimesUpAPI";

const store = useStore();
const { displayError } = useError();
const { game } = useGame();
const { timesUpAPI } = useTimesUpAPI();
const gameState = ref(GAME_STATE.TURN_STARTING);
const play = reactive({ cards: [] });

if (game.value.isNewRound) {
    gameState.value = GAME_STATE.ROUND_STARTING;
}

const resetPlay = () => (play.cards = []);
const setGameState = state => {
    gameState.value = state;
    if (state === GAME_STATE.TURN_STARTING) {
        resetPlay();
    }
};
const resetTurn = async() => {
    try {
        await store.dispatch("game/setIsUpdatingGame", true);
        const { data } = await timesUpAPI.shuffleGameCards(game.value._id);
        await store.dispatch("game/setGame", data);
        gameState.value = GAME_STATE.TURN_STARTING;
        for (const playedCard of play.cards) {
            await store.dispatch("game/updateGameCardById", { _id: playedCard._id, data: { status: "to-guess", playingTime: undefined } });
        }
        resetPlay();
    } catch (err) {
        displayError(err);
    } finally {
        await store.dispatch("game/setIsUpdatingGame", false);
    }
};
const cardPlayed = async card => {
    if (card._id && !play.cards.find(({ _id }) => _id === card._id)) {
        play.cards.push(new Card(card));
        await store.dispatch("game/updateGameCardById", { _id: card._id, data: card });
    }
};
const updatePlayedCardStatus = ({ _id, status }) => {
    const playedCardIdx = play.cards.findIndex(card => card._id === _id);
    if (playedCardIdx !== -1) {
        const playedCard = play.cards[playedCardIdx];
        play.cards.splice(playedCardIdx, 1, new Card({ ...playedCard, status }));
    }
};
const validatedTurn = async() => {
    try {
        await store.dispatch("game/setIsUpdatingGame", true);
        const body = play.cards.length ? play : undefined;
        const { data } = await timesUpAPI.makeGamePlay(game.value._id, body);
        await store.dispatch("game/setGame", data);
        const newGameState = game.value.isNewRound ? GAME_STATE.ROUND_SUMMARY : GAME_STATE.TURN_STARTING;
        setGameState(newGameState);
    } catch (err) {
        displayError(err);
    } finally {
        await store.dispatch("game/setIsUpdatingGame", false);
    }
};
const validatedRound = () => setGameState(GAME_STATE.ROUND_STARTING);
</script>