<template>
    <div class="game-team-label d-flex justify-content-center align-items-center">
        <ColoredCircle :color="team.color" class="me-2"/>
        <span v-html="team.name"/>
        <div v-if="hasAppendIcon" v-tooltip="teamProblemTooltipText" class="text-center team-problem-container">
            <Transition mode="out-in" name="fade">
                <i v-if="!game.doesTeamHaveEnoughPlayers(team.name)" class="fa-solid fa-exclamation-triangle"/>
            </Transition>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useI18n } from "vue-i18n";
import ColoredCircle from "@/components/shared/misc/ColoredCircle";
import useGame from "@/composables/Game/useGame";

const props = defineProps({
    team: {
        type: Object,
        required: true,
    },
    hasAppendIcon: {
        type: Boolean,
        default: false,
    },
});

const { game } = useGame();
const { t } = useI18n();

const teamProblemTooltipText = computed(() => {
    const missingPlayerCount = game.value.getMissingPlayerCountInTeam(props.team.name);
    return t("GameTeamLabel.itMissesPlayers", { missingPlayerCount }, missingPlayerCount);
});
</script>

<style lang="scss" scoped>
    .team-problem-container {
        min-width: 30px;
    }
</style>