<template>
    <div id="game-summary" class="d-flex flex-column h-100 align-items-center">
        <PageTitle v-html="$t('GameOver.gameResults')"/>
        <div id="game-results" class="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <i v-if="!game.isTieBetweenTeams" class="fa fa-trophy text-warning fa-4x"/>
            <img v-else :src="champagneGlassesSVG" width="100" alt="Tie"/>
            <h1 class="text-center my-4" v-html="winningTeamText"/>
            <h1 class="text-center" v-html="highestFinalScoreText"/>
        </div>
        <TimesUpFooter>
            <RouterLink class="times-up-anchor" to="/game-lobby">
                <i v-tooltip="$t('GameOver.newGame')" class="fa-solid fa-arrow-right-to-bracket fa-flip-horizontal fa-3x"/>
            </RouterLink>
            <a href="#" class="times-up-anchor" @click.prevent="$emit('show-game-history')">
                <i class="fa-solid fa-clock-rotate-left fa-3x"/>
            </a>
        </TimesUpFooter>
    </div>
</template>

<script setup>
import { computed, defineEmits } from "vue";
import { useI18n } from "vue-i18n";
import TimesUpFooter from "@/components/shared/Nav/TimesUpFooter";
import PageTitle from "@/components/shared/Title/PageTitle";
import useGame from "@/composables/Game/useGame";
import champagneGlassesSVG from "@/assets/svg/game/champagne-glasses.svg";

defineEmits({ "show-game-history": () => true });

const { t } = useI18n();
const { game } = useGame();

const winningTeamText = computed(() => {
    const { isTieBetweenTeams, winningTeam } = game.value;
    return isTieBetweenTeams ? t("GameOver.tieBetweenTeams") : t("GameOver.gameWonByTeam", { winningTeam });
});
const highestFinalScoreText = computed(() => {
    const { winningTeams } = game.value;
    const score = game.value.getTeamFinalScore(winningTeams[0]);
    return t("GameOver.score", { score }, score);
});
</script>