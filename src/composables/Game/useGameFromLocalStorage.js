import { computed, inject } from "vue";
import { useStore } from "vuex";
import useErrorManager from "@/composables/Error/useErrorManager";

export default function useGameFromLocalStorage() {
    const { localStorage } = window;
    const gameIdLocalStorage = computed(() => localStorage?.getItem("times-up-game-id"));

    async function getAndSetGameFromLocalStorage() {
        const store = useStore();
        const timesUpAPI = inject("timesUpAPI");
        const { isAPIErrorType } = useErrorManager();
        try {
            await store.game.setIsFetchingGame(true);
            const { data: game } = await timesUpAPI.getGame(gameIdLocalStorage.value);
            await store.game.setGame(game);
        } catch (err) {
            if (isAPIErrorType(err, "GAME_NOT_FOUND")) {
                localStorage.removeItem("times-up-game-id");
            }
            throw err;
        } finally {
            await store.game.setIsFetchingGame(false);
        }
    }

    return { gameIdLocalStorage, getAndSetGameFromLocalStorage };
}