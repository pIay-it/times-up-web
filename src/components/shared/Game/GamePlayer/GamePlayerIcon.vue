<template>
    <i class="game-player-icon fa-solid fa-user-check" :style="{ color: playerColor }"/>
</template>

<script setup>
import { computed, defineProps } from "vue";
import Player from "@/classes/Player";
import useGame from "@/composables/Game/useGame";

const props = defineProps({
    player: {
        type: Player,
        required: true,
    },
});

const { game } = useGame();

const playerColor = computed(() => {
    if (!game.value.isCreated) {
        return "#00b500";
    }
    const team = game.value.getTeamWithName(props.player.team);
    return team?.color;
});
</script>

<style lang="scss" scoped>
.game-player-icon {
    color: #8e8d8d;
    transition: all 0.35s ease;
}
</style>