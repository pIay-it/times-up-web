<template>
    <div class="row mb-2">
        <div class="game-player times-up-card col-12 d-flex flex-grow-1 align-items-center">
            <div class="d-flex flex-grow-1 align-items-center">
                <i class="game-player-icon fa-solid fa-user-check me-2" :style="{ color: playerColor }"/>
                <div class="text-truncate flex-grow-1" v-html="player.name"/>
            </div>
            <GamePlayerTeamSwitcher v-if="game.isPreparing" :player="player"/>
            <GamePlayerDeleteButton v-else-if="!game.isCreated" :player="player"/>
        </div>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Player from "@/classes/Player";
import GamePlayerDeleteButton from "@/components/shared/Game/GamePlayer/GamePlayerDeleteButton";
import GamePlayerTeamSwitcher from "@/components/shared/Game/GamePlayer/GamePlayerTeamSwitcher";

export default {
    name: "GamePlayer",
    components: { GamePlayerTeamSwitcher, GamePlayerDeleteButton },
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
    .game-player {
        height: 40px;

        .game-player-icon {
            color: #8e8d8d;
            transition: all 0.35s ease;
        }

        div {
            min-width: 0;
        }
    }
</style>