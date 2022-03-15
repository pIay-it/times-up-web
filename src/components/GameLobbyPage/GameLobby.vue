<template>
    <div id="game-lobby" class="d-flex flex-column h-100">
        <h1 class="times-up-title mb-5" v-html="$t('GameLobby.addPlayers')"/>
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
                              :error-message="$t('GameLobby.playerNameAlreadyTaken')" :is-message-white="true"/>
            </form>
        </div>
        <div id="game-composition" class="d-flex flex-column flex-grow-1 container-fluid">
            <GameLobbyPlayer v-for="player of game.players" :key="player.name" :player="player"/>
        </div>
        <div class="d-flex justify-content-center align-items-center pb-2">
            <div class="game-lobby-footer-button-container">
                <BackButton to="/"/>
            </div>
            <div class="game-lobby-footer-button-container">
                <GameLobbyResetPlayersButton/>
            </div>
            <div class="game-lobby-footer-button-container pt-2">
                <PlayITButton/>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";
import { onBeforeRouteLeave } from "vue-router";
import InputMessage from "@/components/shared/Form/Input/InputMessage/InputMessage";
import BackButton from "@/components/shared/Button/BackButton";
import PlayITButton from "@/components/shared/Button/PlayITButton";
import useError from "@/composables/Error/useError";
import { filterOutHTMLTags } from "@/helpers/functions/String";
import useGameFromLocalStorage from "@/composables/Game/useGameFromLocalStorage";
import GameLobbyResetPlayersButton from "@/components/GameLobbyPage/GameLobby/GameLobbyResetPlayersButton";
import GameLobbyPlayer from "@/components/GameLobbyPage/GameLobby/GameLobbyPlayer";

export default {
    name: "GameLobby",
    components: { GameLobbyPlayer, GameLobbyResetPlayersButton, PlayITButton, BackButton, InputMessage },
    setup() {
        const store = useStore();
        const { displayError } = useError();
        const { t } = useI18n();
        const { setGameIdInLocalStorage } = useGameFromLocalStorage();
        function confirmLeaveGameLobby() {
            return Swal.fire({
                title: t("GameLobby.areYouSureYouWantToLeaveGameLobby"),
                text: t("GameLobby.gameCompositionWillBeLost"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: t("SweetAlert.confirm"),
                cancelButtonText: t("SweetAlert.cancel"),
                heightAuto: false,
                returnFocus: false,
            });
        }
        onBeforeRouteLeave(async() => {
            if (store.state.game.game.hasPlayers) {
                const { isConfirmed } = await confirmLeaveGameLobby();
                return isConfirmed;
            }
            return true;
        });
        return {
            playerName: ref(""), displayError, setGameIdInLocalStorage,
            game: computed(() => store.state.game.game),
            isCreatingGame: computed(() => store.state.game.isCreating),
        };
    },
    computed: {
        sanitizedPlayerName() {
            return filterOutHTMLTags(this.playerName.trim());
        },
        playerNameInputPlaceholder() {
            const defaultPlaceholder = `${this.$t("GameLobby.playerName")} ${this.game.players.length + 1}`;
            return this.game.isMaxPlayerReached ? this.$t("GameLobby.maxPlayerReached") : defaultPlaceholder;
        },
        playerInputClasses() {
            return { "is-invalid": this.game.isPlayerNameTaken(this.sanitizedPlayerName) };
        },
    },
    methods: {
        async addPlayer() {
            if (!this.sanitizedPlayerName || !this.game.canAddPlayerWithName(this.sanitizedPlayerName)) {
                this.playerName = "";
            } else {
                await this.$store.dispatch("game/addGamePlayer", { name: this.sanitizedPlayerName });
                this.playerName = "";
            }
        },
        async createGame() {
            try {
                await this.$store.dispatch("game/setIsCreatingGame", true);
                const { data: game } = await this.$timesUpAPI.createGame({ ...this.game, status: "playing" });
                this.setGameIdInLocalStorage(game._id);
                await this.$store.dispatch("game/setGame", game);
                this.$toast.success(this.$t("GameLobby.gameCreated"));
                await this.$router.push(`/game/${game._id}`);
            } catch (err) {
                this.displayError(err);
            } finally {
                await this.$store.dispatch("game/setIsCreatingGame", false);
            }
        },
    },
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
    }

    .game-lobby-footer-button-container {
        width: 100px;
        height: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>