import { computed } from "vue";
import { useStore } from "vuex";

export default function useGame() {
    const store = useStore();

    const game = computed(() => store.state.game.game);
    const isFetchingGame = computed(() => store.state.game.isFetching);
    const isCreatingGame = computed(() => store.state.game.isCreating);
    const isUpdatingGame = computed(() => store.state.game.isUpdating);

    return {
        game,
        isFetchingGame,
        isCreatingGame,
        isUpdatingGame,
    };
}