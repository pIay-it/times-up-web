<template>
    <a v-tooltip="$t('GamePlayerDeleteButton.deletePlayer')" class="game-lobby-player-delete-button" href="#" type="button"
       @click="deletePlayer">
        <i class="fa-solid fa-square-xmark"/>
    </a>
</template>

<script>
import Player from "@/classes/Player";
import useSweetAlert from "@/composables/SweetAlert/useSweetAlert";

export default {
    name: "GamePlayerDeleteButton",
    props: {
        player: {
            type: Player,
            required: true,
        },
    },
    setup() {
        const { DefaultConfirmSwal } = useSweetAlert();
        return { DefaultConfirmSwal };
    },
    methods: {
        confirmDeletePlayer() {
            return this.DefaultConfirmSwal.fire({
                title: this.$t("GamePlayerDeleteButton.areYouSureYouWantToDeletePlayer", { playerName: this.player.name }),
                icon: "warning",
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
            font-size: 25px;
            padding-top: 3px;
        }
    }
</style>