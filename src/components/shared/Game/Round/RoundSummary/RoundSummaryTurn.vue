<template>
    <div class="round-summary-turn-container row">
        <div class="round-summary-turn times-up-card col-12 d-flex flex-grow-1 align-items-center mb-2">
            <div class="d-flex flex-grow-1 align-items-center">
                <GamePlayerIcon :player="historyEntry.speaker" class="me-2"/>
                <div class="text-truncate flex-grow-1" v-html="turnSpeakerText"/>
            </div>
            <div v-html="scoreText"/>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useI18n } from "vue-i18n";
import GameHistory from "@/classes/GameHistory";
import GamePlayerIcon from "@/components/shared/Game/GamePlayer/GamePlayerIcon";

const props = defineProps({
    historyEntry: {
        type: GameHistory,
        required: true,
    },
});

const { t } = useI18n();

const turnSpeakerText = computed(() => {
    const { turn, speaker } = props.historyEntry;
    return t("RoundSummaryTurn.turnSpeaker", { turn, speakerName: speaker.name });
});
const scoreText = computed(() => {
    const { score } = props.historyEntry;
    return t("RoundSummaryTurn.score", { score }, score);
});
</script>

<style lang="scss">
.round-summary-turn {
    height: 40px;

    div {
        min-width: 0;
    }
}
</style>