<template>
    <div id="game-lobby-page">
        <transition mode="out-in" name="fade">
            <LoadingText key="fetching-existing-game-from-local-storage" class="h-100"/>
        </transition>
    </div>
</template>

<script>
import LoadingText from "@/components/shared/Loading/LoadingText";
import useGameFromLocalStorage from "@/composables/Game/useGameFromLocalStorage";
import useErrorManager from "@/composables/Error/useErrorManager";

export default {
    name: "GameLobbyPage",
    components: { LoadingText },
    setup() {
        const { displayError, isAPIErrorType } = useErrorManager();
        const { gameIdLocalStorage, getAndSetGameFromLocalStorage } = useGameFromLocalStorage();
        return { gameIdLocalStorage, getAndSetGameFromLocalStorage, displayError, isAPIErrorType };
    },
    async created() {
        try {
            if (this.gameIdLocalStorage) {
                await this.getAndSetGameFromLocalStorage();
            }
        } catch (err) {
            if (!this.isAPIErrorType(err, "GAME_NOT_FOUND")) {
                this.displayError(err);
            }
        }
    },
};
</script>