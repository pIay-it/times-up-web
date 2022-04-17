<template>
    <div id="turn-summary" class="d-flex flex-column h-100">
        <PageTitle v-html="$t('TurnSummary.turnSummary', { turn: game.turn })"/>
        <div id="turn-summary-score" class="times-up-card py-2 mb-4">
            <h4 class="text-center" v-html="$t('TurnSummary.playerHasGuessed', { player: game.speaker.name })"/>
            <h4 class="text-center" v-html="$t('TurnSummary.cards', { score }, score)"/>
            <div class="d-flex justify-content-around">
                <div class="card-status-label">
                    <ColoredCircle color="#8CB32D" class="me-2"/>
                    <span v-html="$t('TurnSummary.guessed')"/>
                </div>
                <div class="card-status-label">
                    <ColoredCircle color="#C82333" class="me-2"/>
                    <span v-html="$t('TurnSummary.skipped')"/>
                </div>
            </div>
        </div>
        <div id="turn-summary-cards-container" class="flex-grow-1">
            <div v-if="play.cards.length" id="turn-summary-cards" class="h-100 container-fluid">
                <TurnSummaryPlayedCard v-for="card of play.cards" :key="card._id" :card="card" @update-played-card-status="updatePlayedCardStatus"/>
            </div>
            <h3 v-else id="no-card-text" class="d-flex justify-content-center align-items-center">
                <i class="fa-solid fa-ban me-2"/>
                <span v-html="$t('TurnSummary.noCardPlayed')"/>
            </h3>
        </div>
        <TimesUpFooter :is-loading="isUpdatingGame" :loading-text="$t('TurnSummary.validatingTurn')">
            <div class="turn-summary-footer-button-container">
                <a href="#" type="button" class="text-white me-2" @click.prevent="resetTurn">
                    <i class="fa-solid fa-arrow-rotate-right fa-flip-horizontal fa-3x"/>
                </a>
            </div>
            <div class="turn-summary-footer-button-container pt-2">
                <PlayITButton @click="validateTurn"/>
            </div>
        </TimesUpFooter>
    </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";
import { useI18n } from "vue-i18n";
import TurnSummaryPlayedCard from "@/components/GamePage/GamePlaying/Turn/TurnSummary/TurnSummaryPlayedCard";
import PageTitle from "@/components/shared/Title/PageTitle";
import PlayITButton from "@/components/shared/Button/PlayITButton";
import ColoredCircle from "@/components/shared/misc/ColoredCircle";
import TimesUpFooter from "@/components/shared/Nav/TimesUpFooter";
import useSweetAlert from "@/composables/SweetAlert/useSweetAlert";
import useGame from "@/composables/Game/useGame";

const props = defineProps({
    play: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits({
    "update-played-card-status": card => card._id && card.status,
    "validated-turn": () => true,
    "reset-turn": () => true,
});

const { DefaultConfirmSwal } = useSweetAlert();
const { t } = useI18n();
const { game, isUpdatingGame } = useGame();

const score = computed(() => props.play.cards.reduce((acc, card) => card.isGuessed ? acc + 1 : acc, 0));

const updatePlayedCardStatus = payload => emit("update-played-card-status", payload);
const confirmResetTurn = () => DefaultConfirmSwal.fire({
    title: t("TurnSummary.areYouSureYouWantToResetTurn"),
    icon: "warning",
});
const resetTurn = async() => {
    const { isConfirmed } = await confirmResetTurn();
    if (isConfirmed) {
        emit("reset-turn");
    }
};
const validateTurn = () => emit("validated-turn");
</script>

<style lang="scss">
.card-status-label {
    display: flex;
    align-items: center;
}

#turn-summary-cards-container {
    overflow-y: scroll;
}

#no-card-text {
    height: 100%;
    margin-bottom: 0;
    font-style: italic;
}
</style>