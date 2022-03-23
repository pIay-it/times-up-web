<template>
    <div class="game-team-label d-flex align-items-center">
        <div class="team-color-circle me-2" :style="{ backgroundColor: team.color }"/>
        <span v-html="team.name"/>
    </div>
</template>

<script>
export default {
    name: "GameTeamLabel",
    props: {
        team: {
            type: Object,
            required: true,
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
</style>