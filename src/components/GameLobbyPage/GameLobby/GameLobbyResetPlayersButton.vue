<template>
    <Transition mode="out-in" name="translate-from-top">
        <a v-if="isShown" id="game-lobby-reset-players-button" v-tooltip="$t('GameLobbyResetPlayersButton.resetGameComposition')"
           href="#" type="button" class="times-up-anchor" @click.prevent="removeAllGamePlayers">
            <i class="fa-solid fa-arrow-rotate-right fa-flip-horizontal fa-3x"/>
        </a>
    </Transition>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import useSweetAlert from "@/composables/SweetAlert/useSweetAlert";
import useGame from "@/composables/Game/useGame";

const store = useStore();
const { DefaultConfirmSwal } = useSweetAlert();
const { t } = useI18n();
const { game } = useGame();

const isShown = computed(() => game.value.hasPlayers);

const confirmResetGameComposition = () => DefaultConfirmSwal.fire({
    title: t("GameLobbyResetPlayersButton.areYouSureYouWantToResetGameComposition"),
    text: t("GameLobbyResetPlayersButton.gameCompositionWillBeLost"),
    icon: "warning",
});
const removeAllGamePlayers = async() => {
    const { isConfirmed } = await confirmResetGameComposition();
    if (isConfirmed) {
        await store.dispatch("game/removeAllGamePlayers");
    }
};
</script>