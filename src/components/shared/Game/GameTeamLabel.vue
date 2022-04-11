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

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import ColoredCircle from "@/components/shared/misc/ColoredCircle";

export default {
    name: "GameTeamLabel",
    components: { ColoredCircle },
    props: {
        team: {
            type: Object,
            required: true,
        },
        hasAppendIcon: {
            type: Boolean,
            default: false,
        },
    },
    setup() {
        const store = useStore();
        return { game: computed(() => store.state.game.game) };
    },
    computed: {
        teamProblemTooltipText() {
            const missingPlayerCount = this.game.getMissingPlayerCountInTeam(this.team.name);
            return this.$t("GameTeamLabel.itMissesPlayers", { missingPlayerCount }, missingPlayerCount);
        },
    },
};
</script>

<style lang="scss" scoped>
    .team-problem-container {
        min-width: 30px;
    }
</style>