<template>
    <Transition id="game-lobby-page" mode="out-in" name="fade">
        <DefaultLoader v-if="isFetchingGame" key="fetching-existing-game-from-local-storage" class="h-100"/>
        <GameCurrentlyPlaying v-else-if="game?.isPreparing || game?.isPlaying"/>
        <GameLobby v-else key="game-lobby" class="h-100"/>
    </Transition>
</template>

<script>
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import DefaultLoader from "@/components/shared/Loader/DefaultLoader";
import GameLobby from "@/components/GameLobbyPage/GameLobby";
import useGameFromLocalStorage from "@/composables/Game/useGameFromLocalStorage";
import useUserAuth from "@/composables/User/useUserAuth";
import useError from "@/composables/Error/useError";
import GameCurrentlyPlaying from "@/components/GameLobbyPage/GameCurrentlyPlaying";

export default {
    name: "GameLobbyPage",
    components: { GameCurrentlyPlaying, GameLobby, DefaultLoader },
    setup() {
        const store = useStore();
        const { checkUserAuthentication } = useUserAuth();
        const { displayError, isAPIErrorType } = useError();
        const { gameIdLocalStorage, getAndSetGameFromLocalStorage } = useGameFromLocalStorage();
        const game = computed(() => store.state.game.game);
        onBeforeMount(async() => {
            try {
                if (gameIdLocalStorage.value) {
                    await store.dispatch("game/setIsFetchingGame", true);
                }
                await checkUserAuthentication();
                if (gameIdLocalStorage.value) {
                    await getAndSetGameFromLocalStorage();
                }
            } catch (err) {
                displayError(err);
            } finally {
                if (!gameIdLocalStorage.value || !game.value.isPreparing && !game.value.isPlaying) {
                    await store.dispatch("game/resetGame");
                }
                await store.dispatch("game/setIsFetchingGame", false);
            }
        });
        return {
            gameIdLocalStorage, getAndSetGameFromLocalStorage, displayError, isAPIErrorType, game,
            isFetchingGame: computed(() => store.state.game.isFetching),
        };
    },
};
</script>