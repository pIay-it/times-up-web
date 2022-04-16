<template>
    <div id="game-preparing" class="d-flex flex-column h-100">
        <PageTitle v-html="$t('GamePreparing.makeTeams')"/>
        <div class="times-up-card py-2 mb-4">
            <h4 class="text-center" v-html="$t('GamePreparing.teams')"/>
            <div class="d-flex justify-content-around">
                <GameTeamLabel v-for="team of game.teams" :key="`team-${team.color}`" :team="team" :has-append-icon="true"/>
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

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { onBeforeRouteLeave } from "vue-router";
import { useI18n } from "vue-i18n";
import PageTitle from "@/components/shared/Title/PageTitle";
import GameTeamLabel from "@/components/shared/Game/GameTeamLabel";
import GamePlayer from "@/components/shared/Game/GamePlayer/GamePlayer";
import BackButton from "@/components/shared/Button/BackButton";
import PlayITButton from "@/components/shared/Button/PlayITButton";
import useError from "@/composables/Error/useError";
import useSweetAlert from "@/composables/SweetAlert/useSweetAlert";
import TimesUpFooter from "@/components/shared/Nav/TimesUpFooter";

export default {
    name: "GamePreparing",
    components: { TimesUpFooter, PlayITButton, BackButton, GamePlayer, GameTeamLabel, PageTitle },
    setup() {
        const store = useStore();
        const { displayError } = useError();
        const { t } = useI18n();
        const { DefaultConfirmSwal } = useSweetAlert();
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
        return {
            game: computed(() => store.state.game.game), displayError,
            isUpdatingGame: computed(() => store.state.game.isUpdating),
        };
    },
    methods: {
        async startPlayingGame() {
            if (!this.game.doesAllTeamsHaveEnoughPlayers()) {
                return this.$toast.warning(this.$t("GamePreparing.allTeamsDontHaveEnoughPlayers"));
            }
            try {
                await this.$store.dispatch("game/setIsUpdatingGame", true);
                await this.$timesUpAPI.updateGamePlayers(this.game._id, { players: this.game.players });
                const { data: game } = await this.$timesUpAPI.updateGame(this.game._id, { status: "playing" });
                await this.$store.dispatch("game/setGame", game);
                this.$toast.success(this.$t("GamePreparing.gameStarts"));
            } catch (err) {
                this.displayError(err);
            } finally {
                await this.$store.dispatch("game/setIsUpdatingGame", false);
            }
        },
    },
};
</script>