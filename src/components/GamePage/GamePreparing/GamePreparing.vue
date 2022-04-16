<template>
    <div id="game-preparing" class="d-flex flex-column h-100">
        <PageTitle v-html="$t('GamePreparing.makeTeams')"/>
        <div class="times-up-card py-2 mb-4">
            <h4 class="text-center" v-html="$t('GamePreparing.teams')"/>
            <div class="d-flex justify-content-around">
                <GameTeamLabel v-for="team of game.teams" :key="`team-${team.color}`" :team="team" has-append-icon/>
            </div>
        </div>
        <div class="d-flex flex-grow-1 flex-column container-fluid">
            <GamePlayer v-for="player of game.players" :key="player._id" :player="player"/>
        </div>
        <TimesUpFooter :is-loading="isUpdatingGame" :loading-text="$t('GamePreparing.startingGame')">
            <BackButton to="/"/>
            <PlayITButton :class="{ 'cant-start-game-button': !game.doesAllTeamsHaveEnoughPlayers() }" @click="startPlayingGame"/>
        </TimesUpFooter>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onBeforeRouteLeave } from "vue-router";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import PageTitle from "@/components/shared/Title/PageTitle";
import GameTeamLabel from "@/components/shared/Game/GameTeamLabel";
import GamePlayer from "@/components/shared/Game/GamePlayer/GamePlayer";
import BackButton from "@/components/shared/Button/BackButton";
import PlayITButton from "@/components/shared/Button/PlayITButton";
import useError from "@/composables/Error/useError";
import useSweetAlert from "@/composables/SweetAlert/useSweetAlert";
import TimesUpFooter from "@/components/shared/Nav/TimesUpFooter";
import useGame from "@/composables/Game/useGame";
import useTimesUpAPI from "@/composables/API/useTimesUpAPI";

const store = useStore();
const { displayError } = useError();
const { t } = useI18n();
const Toast = useToast();
const { DefaultConfirmSwal } = useSweetAlert();
const { game, isUpdatingGame } = useGame();
const { timesUpAPI } = useTimesUpAPI();

onBeforeRouteLeave(async to => {
    if (to.name !== "Game") {
        const { isConfirmed } = await DefaultConfirmSwal.fire({
            title: t("GamePreparing.areYouSureYouWantToLeaveGamePreparing"),
            html: `<i class="text-success fa-solid fa-check-circle me-2"></i>${t("GamePreparing.gameWillBeRestored")}`,
            icon: "warning",
        });
        return isConfirmed;
    }
    return true;
});

const startPlayingGame = async() => {
    if (!game.value.doesAllTeamsHaveEnoughPlayers()) {
        return Toast.warning(t("GamePreparing.allTeamsDontHaveEnoughPlayers"));
    }
    try {
        await store.dispatch("game/setIsUpdatingGame", true);
        await timesUpAPI.updateGamePlayers(game.value._id, { players: game.value.players });
        const { data: updatedGame } = await timesUpAPI.updateGame(game.value._id, { status: "playing" });
        await store.dispatch("game/setGame", updatedGame);
        Toast.success(this.$t("GamePreparing.gameStarts"));
    } catch (err) {
        displayError(err);
    } finally {
        await store.dispatch("game/setIsUpdatingGame", false);
    }
};
</script>