<template>
    <div class="round-summary-turn-container row mb-2">
        <div class="round-summary-turn times-up-card col-12 d-flex flex-grow-1 align-items-center">
            <div class="d-flex flex-grow-1 align-items-center">
                <div class="d-flex flex-grow-1 align-items-center">
                    <GamePlayerIcon :player="historyEntry.speaker" class="me-2"/>
                    <div class="text-truncate flex-grow-1" v-html="historyEntry.speaker.name"/>
                </div>
            </div>
            <div>
                lol
            </div>
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