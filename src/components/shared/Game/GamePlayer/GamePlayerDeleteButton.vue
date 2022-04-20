<template>
    <a v-tooltip="$t('GamePlayerDeleteButton.deletePlayer')" class="game-lobby-player-delete-button" href="#" type="button"
       @click="deletePlayer">
        <i class="fa-solid fa-square-xmark"/>
    </a>
</template>

<script setup>
import { defineProps } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import useSweetAlert from "@/composables/SweetAlert/useSweetAlert";
import Player from "@/classes/Player";

const props = defineProps({
    player: {
        type: Player,
        required: true,
    },
});

const store = useStore();
const { DefaultConfirmSwal } = useSweetAlert();
const { t } = useI18n();

const confirmDeletePlayer = () => DefaultConfirmSwal.fire({
    title: t("GamePlayerDeleteButton.areYouSureYouWantToDeletePlayer", { playerName: props.player.name }),
    icon: "warning",
});
const deletePlayer = async() => {
    const { isConfirmed } = await confirmDeletePlayer();
    if (isConfirmed) {
        await store.dispatch("game/removeGamePlayerByName", props.player.name);
    }
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