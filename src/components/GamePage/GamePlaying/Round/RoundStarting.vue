<template>
    <div id="round-starting" class="d-flex flex-column h-100 align-items-center">
        <PageTitle v-html="$t('RoundStarting.roundNumber', { number: game.round })"/>
        <div class="flex-grow-1 text-center">
            <img :src="roundIcon" alt="Round Icon" width="200"/>
            <h3 class="mt-2" v-html="roundTitle"/>
            <p class="mt-2" v-html="roundDescription"/>
        </div>
        <TimesUpFooter>
            <PlayITButton @click="$emit('start-turn')"/>
        </TimesUpFooter>
    </div>
</template>

<script setup>
import { computed, defineEmits } from "vue";
import { useI18n } from "vue-i18n";
import PageTitle from "@/components/shared/Title/PageTitle";
import PlayITButton from "@/components/shared/Button/PlayITButton";
import TimesUpFooter from "@/components/shared/Nav/TimesUpFooter";
import useGame from "@/composables/Game/useGame";
import firstRoundIcon from "@/assets/svg/game/round-1-icon.svg";
import secondRoundIcon from "@/assets/svg/game/round-2-icon.svg";
import thirdRoundIcon from "@/assets/svg/game/round-3-icon.svg";

defineEmits({ "start-turn": () => true });

const { game } = useGame();
const { t } = useI18n();

const roundRank = computed(() => {
    const ranks = ["first", "second", "third"];
    return ranks[game.value.round - 1];
});
const roundTitle = computed(() => t(`RoundStarting.${roundRank.value}Round.title`));
const roundDescription = computed(() => t(`RoundStarting.${roundRank.value}Round.description`));
const roundIcon = computed(() => {
    const icons = {
        first: firstRoundIcon,
        second: secondRoundIcon,
        third: thirdRoundIcon,
    };
    return icons[roundRank.value];
});
</script>