<template>
    <a v-tooltip="$t('GameLobbyPlayerDeleteButton.deletePlayer')" class="game-lobby-player-delete-button" href="#" type="button"
       @click="deletePlayer">
        <i class="fa-solid fa-square-xmark"/>
    </a>
</template>

<script>
import Player from "@/classes/Player";
import Swal from "sweetalert2";

export default {
    name: "GameLobbyPlayerDeleteButton",
    props: {
        player: {
            type: Player,
            required: true,
        },
    },
    methods: {
        confirmDeletePlayer() {
            return Swal.fire({
                title: this.$t("GameLobbyPlayerDeleteButton.areYouSureYouWantToDeletePlayer", { playerName: this.player.name }),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: this.$t("SweetAlert.confirm"),
                cancelButtonText: this.$t("SweetAlert.cancel"),
                heightAuto: false,
                returnFocus: false,
            });
        },
        async deletePlayer() {
            const { isConfirmed } = await this.confirmDeletePlayer();
            if (isConfirmed) {
                await this.$store.dispatch("game/removeGamePlayerByName", this.player.name);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .game-lobby-player-delete-button {
        .fa-square-xmark {
            color: #f8f8f8;
        }
    }
</style>