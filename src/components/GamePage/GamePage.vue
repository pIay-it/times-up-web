<template>
    <div id="game-page">
        <transition mode="out-in" name="fade">
            <DefaultLoader v-if="isGameFetching" key="fetching-game" class="h-100" :text="$t('GamePage.fetchingGame')"/>
            <GamePreparing v-else-if="game.isPreparing" key="game-preparing" class="h-100"/>
            <GamePlaying v-else-if="game.isPlaying" key="game-playing" class="h-100"/>
            <GameOver v-else-if="game.isOver" key="game-over" class="h-100"/>
        </transition>
    </div>
</template>

<script>
import { computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import useGameFromLocalStorage from "@/composables/Game/useGameFromLocalStorage";
import useError from "@/composables/Error/useError";
import DefaultLoader from "@/components/shared/Loader/DefaultLoader";
import { useStore } from "vuex";
import GamePreparing from "@/components/GamePage/GamePreparing/GamePreparing";
import GamePlaying from "@/components/GamePage/GamePlaying/GamePlaying";
import GameOver from "@/components/GamePage/GameOver/GameOver";

export default {
    name: "GamePage",
    components: { GameOver, GamePlaying, GamePreparing, DefaultLoader },
    setup() {
        const store = useStore();
        const { params } = useRoute();
        const { push } = useRouter();
        const { getAndSetGameFromId } = useGameFromLocalStorage();
        const { displayError, isAPIErrorType } = useError();
        onBeforeMount(async() => {
            try {
                await getAndSetGameFromId(params.id);
            } catch (err) {
                displayError(err);
                if (isAPIErrorType(err, "GAME_NOT_FOUND")) {
                    await push("/game-lobby");
                }
            }
        });
        return {
            game: computed(() => store.state.game.game),
            isGameFetching: computed(() => store.state.game.isFetching),
        };
    },
};
</script>