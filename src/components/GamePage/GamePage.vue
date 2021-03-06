<template>
    <div id="game-page">
        <Transition mode="out-in" name="fade">
            <DefaultLoader v-if="isFetchingGame" key="fetching-game" class="h-100" :text="$t('GamePage.fetchingGame')"/>
            <GamePreparing v-else-if="game.isPreparing" key="game-preparing" class="h-100"/>
            <GamePlaying v-else-if="game.isPlaying" key="game-playing" class="h-100"/>
            <GameOver v-else-if="game.isOver" key="game-over" class="h-100"/>
        </Transition>
    </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import DefaultLoader from "@/components/shared/Loader/DefaultLoader";
import GamePreparing from "@/components/GamePage/GamePreparing/GamePreparing";
import GamePlaying from "@/components/GamePage/GamePlaying/GamePlaying";
import GameOver from "@/components/GamePage/GameOver/GameOver";
import useGameFromLocalStorage from "@/composables/Game/useGameFromLocalStorage";
import useUserAuth from "@/composables/User/useUserAuth";
import useError from "@/composables/Error/useError";
import useGame from "@/composables/Game/useGame";

const store = useStore();
const { params } = useRoute();
const { push } = useRouter();
const { getAndSetGameFromId } = useGameFromLocalStorage();
const { checkUserAuthentication } = useUserAuth();
const { displayError, isAPIErrorType } = useError();
const { game, isFetchingGame } = useGame();

onBeforeMount(async() => {
    try {
        await checkUserAuthentication();
        if (!store.state.game.game._id) {
            await getAndSetGameFromId(params.id);
        }
    } catch (err) {
        displayError(err);
        if (isAPIErrorType(err, "GAME_NOT_FOUND") || isAPIErrorType(err, "GAME_DOESNT_BELONG_TO_USER")) {
            await push("/game-lobby");
        }
    }
});
</script>