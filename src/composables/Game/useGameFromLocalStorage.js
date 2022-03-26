import { computed, inject } from "vue";
import { useStore } from "vuex";
import useError from "@/composables/Error/useError";

// eslint-disable-next-line max-lines-per-function
export default function useGameFromLocalStorage() {
    const store = useStore();
    const timesUpAPI = inject("timesUpAPI");
    const { localStorage } = window;
    const localStorageGameIdKey = "times-up-game-id";
    const gameIdLocalStorage = computed(() => localStorage?.getItem("times-up-game-id"));
    const { isAPIErrorType } = useError();

    function setGameIdInLocalStorage(gameId) {
        localStorage.setItem(localStorageGameIdKey, gameId);
    }

    function removeGameIdInLocalStorage() {
        localStorage.removeItem(localStorageGameIdKey);
    }

    async function getAndSetGameFromId(gameId) {
        try {
            await store.dispatch("game/setIsFetchingGame", true);
            const { data: game } = await timesUpAPI.getGame(gameId);
            await store.dispatch("game/setGame", game);
        } catch (err) {
            if ((isAPIErrorType(err, "GAME_NOT_FOUND") || isAPIErrorType(err, "GAME_DOESNT_BELONG_TO_USER")) &&
                gameIdLocalStorage.value === gameId) {
                removeGameIdInLocalStorage();
            }
            throw err;
        } finally {
            await store.dispatch("game/setIsFetchingGame", false);
        }
    }

    async function getAndSetGameFromLocalStorage() {
        await getAndSetGameFromId(gameIdLocalStorage.value);
    }

    return { gameIdLocalStorage, getAndSetGameFromId, getAndSetGameFromLocalStorage, setGameIdInLocalStorage, removeGameIdInLocalStorage };
}