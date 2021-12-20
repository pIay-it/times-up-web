<template>
    <div id="game-lobby">
        <div id="player-form" class="row justify-content-center">
            <form @submit.prevent="addPlayer">
                <div class="input-group">
                    <input id="game-lobby-player-input" v-model="playerName" class="form-control"
                           :placeholder="playerNameInputPlaceholder" :disabled="game.isMaxPlayerReached"
                           :class="playerInputClasses" maxlength="30"/>
                    <button type="submit" class="btn btn-primary" :disabled="!game.canAddPlayerWithName(sanitizedPlayerName)">
                        <i class="fa fa-plus me-1"/>
                        <span v-html="$t('GameLobby.add')"/>
                    </button>
                </div>
                <InputMessage :is-shown="!!sanitizedPlayerName" :is-input-valid="game.canAddPlayerWithName(sanitizedPlayerName)"
                              :error-message="$t('GameLobby.playerNameAlreadyTaken')"/>
            </form>
        </div>
        <div class="row">
            <div v-for="player of game.players" :key="player.name" v-html="player.name"/>
        </div>
        <div class="row d-flex justify-content-center">
            <SubmitButton classes="btn btn-primary btn-lg" :is-loading="isCreatingGame" :disabled="!game.canStart" @click="createGame">
                <i class="fa fa-gamepad me-2"/>
                <span v-html="$t('GameLobby.startGame')"/>
            </SubmitButton>
        </div>
    </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import InputMessage from "@/components/shared/Form/Input/InputMessage/InputMessage";
import SubmitButton from "@/components/shared/Form/SubmitButton";
import useError from "@/composables/Error/useError";
import { filterOutHTMLTags } from "@/helpers/functions/String";
import useGameFromLocalStorage from "@/composables/Game/useGameFromLocalStorage";

export default {
    name: "GameLobby",
    components: { SubmitButton, InputMessage },
    setup() {
        const store = useStore();
        const { displayError } = useError();
        const { setGameIdInLocalStorage } = useGameFromLocalStorage();
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
            return this.game.isMaxPlayerReached ? this.$t("GameLobby.maxPlayerReached") : this.$t("GameLobby.playerName");
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