<template>
    <div class="game-team-label d-flex align-items-center">
        <div class="team-color-circle me-2" :style="{ backgroundColor: team.color }"/>
        <span v-html="team.name"/>
        <div v-tooltip="teamProblemTooltipText" class="text-center team-problem-container">
            <Transition mode="out-in" name="fade">
                <i v-if="!game.doesTeamHaveEnoughPlayers(team.name)" class="fa-solid fa-exclamation-triangle"/>
            </Transition>
        </div>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
    name: "GameTeamLabel",
    props: {
        team: {
            type: Object,
            required: true,
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
    .team-color-circle {
        border-radius: 50px;
        height: 15px;
        width: 15px;
        box-shadow: 1px 1px 3px #000000;
    }

    .team-problem-container {
        min-width: 30px;
    }
</style>