<template>
    <div id="game-history" class="h-100 d-flex flex-column">
        <PageTitle v-html="$t('GameHistory.gameHistory')"/>
        <div id="game-history-content" class="flex-grow-1">
            <GameScoreboard :scores="game.summary.finalScores"/>
        </div>
        <TimesUpFooter>
            <a href="#" class="times-up-anchor" @click.prevent="$emit('show-game-summary')">
                <i class="fa-solid fa-chevron-left fa-3x"/>
            </a>
        </TimesUpFooter>
    </div>
</template>

<script setup>
import { defineEmits } from "vue";
import PageTitle from "@/components/shared/Title/PageTitle";
import TimesUpFooter from "@/components/shared/Nav/TimesUpFooter";
import GameScoreboard from "@/components/shared/Game/GameScoreboard/GameScoreboard";
import useGame from "@/composables/Game/useGame";

defineEmits({ "show-game-summary": () => true });

const { game } = useGame();
</script>