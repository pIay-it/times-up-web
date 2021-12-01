<template>
    <div id="game-lobby-page">
        <transition mode="out-in" name="fade">
            <DefaultLoader v-if="isFetchingGame" key="fetching-existing-game-from-local-storage" class="h-100"/>
            <GameCurrentlyPlaying v-else-if="game?.isPlaying"/>
            <GameLobby v-else key="game-lobby" class="h-100"/>
        </transition>
    </div>
</template>

<script>
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import DefaultLoader from "@/components/shared/Loader/DefaultLoader";
import GameLobby from "@/components/GameLobbyPage/GameLobby";
import useGameFromLocalStorage from "@/composables/Game/useGameFromLocalStorage";
import useError from "@/composables/Error/useError";
import GameCurrentlyPlaying from "@/components/GameLobbyPage/GameCurrentlyPlaying";

export default {
    name: "GameLobbyPage",
    components: { GameCurrentlyPlaying, GameLobby, DefaultLoader },
    setup() {
        const store = useStore();
        const { displayError, isAPIErrorType } = useError();
        const { gameIdLocalStorage, getAndSetGameFromLocalStorage } = useGameFromLocalStorage();
        onBeforeMount(async() => {
            try {
                if (gameIdLocalStorage.value) {
                    await getAndSetGameFromLocalStorage();
                }
            } catch (err) {
                displayError(err);
            }
        });
        return {
            gameIdLocalStorage, getAndSetGameFromLocalStorage, displayError, isAPIErrorType,
            game: computed(() => store.state.game.game),
            isFetchingGame: computed(() => store.state.game.isFetching),
        };
    },
};
</script>