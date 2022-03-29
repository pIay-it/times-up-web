<template>
    <div id="game-currently-playing"/>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import useGameFromLocalStorage from "@/composables/Game/useGameFromLocalStorage";
import useSweetAlert from "@/composables/SweetAlert/useSweetAlert";

export default {
    name: "GameCurrentlyPlaying",
    setup() {
        const store = useStore();
        const { DefaultConfirmSwal } = useSweetAlert();
        const { removeGameIdInLocalStorage } = useGameFromLocalStorage();
        return {
            DefaultConfirmSwal, removeGameIdInLocalStorage,
            game: computed(() => store.state.game.game),
        };
    },
    async mounted() {
        const { isConfirmed } = await this.DefaultConfirmSwal.fire({
            title: this.$t("GameCurrentlyPlaying.gameCurrentlyPlaying"),
            text: this.$t("GameCurrentlyPlaying.continueOrCancelGame"),
            icon: "info",
            confirmButtonText: this.$t("GameCurrentlyPlaying.goToGame"),
            cancelButtonText: this.$t("GameCurrentlyPlaying.cancelGame"),
            allowOutsideClick: false,
            allowEscapeKey: false,
        });
        if (isConfirmed) {
            return this.$router.push(`/game/${this.game._id}`);
        }
        this.$timesUpAPI.updateGame(this.game._id, { status: "canceled" });
        this.removeGameIdInLocalStorage();
        await this.$store.dispatch("game/resetGame");
    },
};
</script>