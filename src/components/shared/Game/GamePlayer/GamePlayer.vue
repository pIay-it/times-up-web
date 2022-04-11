<template>
    <div class="row mb-2">
        <div class="game-player times-up-card col-12 d-flex flex-grow-1 align-items-center">
            <div class="d-flex flex-grow-1 align-items-center">
                <GamePlayerIcon :player="player" class="me-2"/>
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
import GamePlayerIcon from "@/components/shared/Game/GamePlayer/GamePlayerIcon";

export default {
    name: "GamePlayer",
    components: { GamePlayerIcon, GamePlayerTeamSwitcher, GamePlayerDeleteButton },
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
};
</script>

<style lang="scss" scoped>
    .game-player {
        height: 40px;

        div {
            min-width: 0;
        }
    }
</style>