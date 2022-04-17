<template>
    <div id="game-currently-playing"/>
</template>

<script setup>
import { onMounted, inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import useGameFromLocalStorage from "@/composables/Game/useGameFromLocalStorage";
import useSweetAlert from "@/composables/SweetAlert/useSweetAlert";
import useGame from "@/composables/Game/useGame";

const timesUpAPI = inject("timesUpAPI");
const store = useStore();
const { t } = useI18n();
const { game } = useGame();
const { push } = useRouter();
const { DefaultConfirmSwal } = useSweetAlert();
const { removeGameIdInLocalStorage } = useGameFromLocalStorage();
onMounted(async() => {
    const { isConfirmed } = await DefaultConfirmSwal.fire({
        title: t("GameCurrentlyPlaying.gameCurrentlyPlaying"),
        text: t("GameCurrentlyPlaying.continueOrCancelGame"),
        icon: "info",
        confirmButtonText: t("GameCurrentlyPlaying.goToGame"),
        cancelButtonText: t("GameCurrentlyPlaying.cancelGame"),
        allowOutsideClick: false,
        allowEscapeKey: false,
    });
    if (isConfirmed) {
        return push(`/game/${game.value._id}`);
    }
    timesUpAPI.updateGame(game.value._id, { status: "canceled" });
    removeGameIdInLocalStorage();
    await store.dispatch("game/resetGame");
});
</script>