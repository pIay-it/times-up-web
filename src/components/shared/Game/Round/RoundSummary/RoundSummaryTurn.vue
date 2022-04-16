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

<script>
import GameHistory from "@/classes/GameHistory";
import GamePlayerIcon from "@/components/shared/Game/GamePlayer/GamePlayerIcon";

export default {
    name: "RoundSummaryTurn",
    components: { GamePlayerIcon },
    props: {
        historyEntry: {
            type: GameHistory,
            required: true,
        },
    },
    computed: {
        turnSpeakerText() {
            const { turn, speaker } = this.historyEntry;
            return this.$t("RoundSummaryTurn.turnSpeaker", { turn, speakerName: speaker.name });
        },
        scoreText() {
            const { score } = this.historyEntry;
            return this.$t("RoundSummaryTurn.score", { score }, score);
        },
    },
};
</script>

<style lang="scss">
.round-summary-turn {
    height: 40px;

    div {
        min-width: 0;
    }
}
</style>