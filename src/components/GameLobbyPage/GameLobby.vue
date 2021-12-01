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
        <div class="row">
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
import useErrorManager from "@/composables/Error/useErrorManager";
import { filterOutHTMLTags } from "@/helpers/functions/String";

export default {
    name: "GameLobby",
    components: { SubmitButton, InputMessage },
    setup() {
        const store = useStore();
        const displayError = useErrorManager();
        return {
            playerName: ref(""), displayError,
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
            } catch (err) {
                this.displayError(err);
            } finally {
                await this.$store.dispatch("game/setIsCreatingGame", false);
            }
        },
    },
};
</script>