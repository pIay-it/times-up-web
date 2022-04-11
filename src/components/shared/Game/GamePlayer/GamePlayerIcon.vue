<template>
    <i class="game-player-icon fa-solid fa-user-check" :style="{ color: playerColor }"/>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Player from "@/classes/Player";

export default {
    name: "GamePlayerIcon",
    props: {
        player: {
            type: Player,
            required: true,
        },
    },
    setup() {
        const store = useStore();
        return { game: computed(() => store.state.game.game) };
    },
    computed: {
        playerColor() {
            if (!this.game.isCreated) {
                return "#00b500";
            }
            const team = this.game.getTeamWithName(this.player.team);
            return team?.color;
        },
    },
};
</script>

<style lang="scss" scoped>
.game-player-icon {
    color: #8e8d8d;
    transition: all 0.35s ease;
}
</style>