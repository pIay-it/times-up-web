<template>
    <div id="turn-starting" class="d-flex flex-column h-100 align-items-center justify-content-between">
        <PageTitle v-html="$t('TurnStarting.turnOf')"/>
        <h1 class="player-name mt-3 mb-0" v-html="game.speaker.name"/>
        <TimesUpFooter class="w-100">
            <div class="container-fluid w-100">
                <div class="row align-items-center">
                    <div class="col-2">
                        <i v-tooltip="$t('TurnStarting.showRoundRules')" class="fa-solid fa-circle-question fa-2x" @click="showRoundRules"/>
                    </div>
                    <div class="col-8 d-flex justify-content-center">
                        <PlayITButton @click="playerIsReady"/>
                    </div>
                </div>
            </div>
        </TimesUpFooter>
    </div>
</template>

<script setup>
import { defineEmits } from "vue";
import { useStore } from "vuex";
import PlayITButton from "@/components/shared/Button/PlayITButton";
import PageTitle from "@/components/shared/Title/PageTitle";
import TimesUpFooter from "@/components/shared/Nav/TimesUpFooter";
import useSweetAlert from "@/composables/SweetAlert/useSweetAlert";
import useGame from "@/composables/Game/useGame";
import { useI18n } from "vue-i18n";

const emit = defineEmits({
    "player-is-ready": () => true,
    "show-round-rules": () => true,
});

const store = useStore();
const { DefaultConfirmSwal } = useSweetAlert();
const { t } = useI18n();
const { game } = useGame();

const confirmPlayerIsReady = () => DefaultConfirmSwal.fire({
    title: game.value.speaker.name,
    text: t("TurnStarting.areYouReady"),
    icon: "question",
});
const playerIsReady = async() => {
    const { isConfirmed } = await confirmPlayerIsReady();
    if (isConfirmed) {
        await store.dispatch("fullscreenCountdown/launchCountdown", { countdown: 5 });
        emit("player-is-ready");
    }
};
const showRoundRules = () => emit("show-round-rules");
</script>

<style lang="scss">
    .player-name {
        text-align: center;
        font-size: 3.5rem;
    }
</style>