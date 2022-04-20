<template>
    <div id="game-lobby" class="d-flex flex-column h-100">
        <PageTitle v-html="$t('GameLobby.addPlayers')"/>
        <div id="player-form" class="row justify-content-center">
            <form @submit.prevent="addPlayer">
                <div class="input-group">
                    <button id="game-lobby-player-input-button" type="submit" class="btn btn-primary"
                            :disabled="!game.canAddPlayerWithName(sanitizedPlayerName)">
                        <i class="fa-solid fa-user-plus"/>
                    </button>
                    <input id="game-lobby-player-input" v-model="playerName" class="form-control"
                           :placeholder="playerNameInputPlaceholder" :disabled="game.isMaxPlayerReached"
                           :class="playerInputClasses" maxlength="30"/>
                </div>
                <InputMessage :is-shown="!!sanitizedPlayerName" :is-input-valid="game.canAddPlayerWithName(sanitizedPlayerName)"
                              :error-message="$t('GameLobby.playerNameAlreadyTaken')" is-message-white/>
            </form>
        </div>
        <TransitionGroup id="game-composition" name="slide-from-left" tag="div" class="d-flex flex-column flex-grow-1 container-fluid"
                         @before-leave="beforeLeaveList">
            <GamePlayer v-for="player of reversedGamePlayers" :key="player.name" :player="player"/>
        </TransitionGroup>
        <TimesUpFooter :is-loading="isCreatingGame" :loading-text="$t('GameLobby.creatingGame')">
            <BackButton to="/"/>
            <div>
                <GameLobbyResetPlayersButton/>
            </div>
            <PlayITButton :class="{ 'cant-start-game-button': !game.canStart }" @click="createGame"/>
        </TimesUpFooter>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import InputMessage from "@/components/shared/Form/Input/InputMessage/InputMessage";
import BackButton from "@/components/shared/Button/BackButton";
import PlayITButton from "@/components/shared/Button/PlayITButton";
import GameLobbyResetPlayersButton from "@/components/GameLobbyPage/GameLobby/GameLobbyResetPlayersButton";
import GamePlayer from "@/components/shared/Game/GamePlayer/GamePlayer";
import useError from "@/composables/Error/useError";
import { filterOutHTMLTags } from "@/helpers/functions/String";
import useGameFromLocalStorage from "@/composables/Game/useGameFromLocalStorage";
import useTransition from "@/composables/Transition/useTransition";
import useSweetAlert from "@/composables/SweetAlert/useSweetAlert";
import PageTitle from "@/components/shared/Title/PageTitle";
import TimesUpFooter from "@/components/shared/Nav/TimesUpFooter";
import useGame from "@/composables/Game/useGame";
import useTimesUpAPI from "@/composables/API/useTimesUpAPI";

const store = useStore();
const { displayError } = useError();
const { DefaultConfirmSwal } = useSweetAlert();
const { setGameIdInLocalStorage } = useGameFromLocalStorage();
const { beforeLeaveList } = useTransition();
const { t } = useI18n();
const Toast = useToast();
const { push } = useRouter();
const { game, isCreatingGame } = useGame();
const { timesUpAPI } = useTimesUpAPI();

const playerName = ref("");

const sanitizedPlayerName = computed(() => filterOutHTMLTags(playerName.value.trim()));
const playerNameInputPlaceholder = computed(() => {
    const defaultPlaceholder = `${t("GameLobby.playerName")} ${game.value.players.length + 1}`;
    return game.value.isMaxPlayerReached ? t("GameLobby.maxPlayerReached") : defaultPlaceholder;
});
const playerInputClasses = computed(() => ({ "is-invalid": game.value.isPlayerNameTaken(sanitizedPlayerName.value) }));
const reversedGamePlayers = computed(() => game.value.players.slice().reverse());

onBeforeRouteLeave(async to => {
    if (to.name !== "Game" && store.state.game.game.hasPlayers) {
        const { isConfirmed } = await DefaultConfirmSwal.fire({
            title: t("GameLobby.areYouSureYouWantToLeaveGameLobby"),
            text: t("GameLobby.gameCompositionWillBeLost"),
            icon: "warning",
        });
        return isConfirmed;
    }
    return true;
});

const addPlayer = async() => {
    if (!sanitizedPlayerName.value || !game.value.canAddPlayerWithName(sanitizedPlayerName.value)) {
        playerName.value = "";
    } else {
        await store.dispatch("game/addGamePlayer", { name: sanitizedPlayerName.value });
        playerName.value = "";
    }
};
const createGame = async() => {
    if (!game.value.canStart) {
        return Toast.warning(t("GameLobby.gameMustContainPlayers"));
    }
    try {
        await store.dispatch("game/setIsCreatingGame", true);
        const { data: newGame } = await timesUpAPI.createGame(game.value);
        setGameIdInLocalStorage(newGame._id);
        await store.dispatch("game/setGame", newGame);
        Toast.success(t("GameLobby.gameCreated"));
        await push(`/game/${newGame._id}`);
    } catch (err) {
        displayError(err);
    } finally {
        await store.dispatch("game/setIsCreatingGame", false);
    }
};
</script>

<style lang="scss">
    #game-lobby-player-input-button {
        border-color: white;
    }

    #game-lobby-player-input {
        background-color: rgba(0, 0, 0, 0);
        border-top-color: white;
        border-bottom-color: white;
        border-right-color: white;
        border-left-color: white;
        color: white;
        text-shadow: 1px 1px 3px #000000;

        &::placeholder {
            color: white;
        }

        &:focus {
            -webkit-box-shadow: none;
            box-shadow: none;
        }
    }

    #game-composition {
        overflow-y: scroll;
        position: relative;
    }
</style>