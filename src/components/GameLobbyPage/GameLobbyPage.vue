<template>
    <div id="game-lobby-page">
        <transition mode="out-in" name="fade">
            <DefaultLoader v-if="isFetchingGame" key="fetching-existing-game-from-local-storage" class="h-100"/>
            <GameLobby v-else key="game-lobby" class="h-100"/>
        </transition>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import DefaultLoader from "@/components/shared/Loader/DefaultLoader";
import GameLobby from "@/components/GameLobbyPage/GameLobby";
import useGameFromLocalStorage from "@/composables/Game/useGameFromLocalStorage";
import useErrorManager from "@/composables/Error/useErrorManager";

export default {
    name: "GameLobbyPage",
    components: { GameLobby, DefaultLoader },
    setup() {
        const store = useStore();
        const { displayError, isAPIErrorType } = useErrorManager();
        const { gameIdLocalStorage, getAndSetGameFromLocalStorage } = useGameFromLocalStorage();
        return {
            gameIdLocalStorage, getAndSetGameFromLocalStorage, displayError, isAPIErrorType,
            isFetchingGame: computed(() => store.state.game.isFetching),
        };
    },
    async created() {
        try {
            if (this.gameIdLocalStorage) {
                await this.$store.dispatch("game/setIsFetchingGame", true);
                await this.getAndSetGameFromLocalStorage();
            }
        } catch (err) {
            if (!this.isAPIErrorType(err, "GAME_NOT_FOUND")) {
                this.displayError(err);
            }
        } finally {
            await this.$store.dispatch("game/setIsFetchingGame", false);
        }
    },
};
</script>