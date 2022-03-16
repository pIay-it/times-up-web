<template>
    <div class="row px-3 mb-1">
        <div class="game-lobby-player d-flex align-items-center">
            <div class="d-flex flex-grow-1 align-items-center">
                <i class="fa-solid fa-user-check me-2"/>
                <div class="text-truncate" v-html="player.name"/>
            </div>
            <GameLobbyPlayerDeleteButton :player="player"/>
        </div>
    </div>
</template>

<script>
import Player from "@/classes/Player";
import GameLobbyPlayerDeleteButton from "@/components/GameLobbyPage/GameLobby/GameLobbyPlayer/GameLobbyPlayerDeleteButton";

export default {
    name: "GameLobbyPlayer",
    components: { GameLobbyPlayerDeleteButton },
    props: {
        player: {
            type: Player,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .game-lobby-player {
        border-radius: 0.25rem;
        border: 1px solid #ced4da;
        background-color: rgba(65, 58, 58, 0.2);
        width: 100%;

        div {
            min-width: 0;
        }

        .fa-solid {

            &.fa-user-check {
                color: #00b500;
            }
        }

    }
</style>