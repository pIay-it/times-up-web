<template>
    <div id="turn-summary" class="d-flex flex-column h-100">
        <PageTitle v-html="$t('TurnSummary.turnSummary', { turn: game.turn })"/>
        <div id="turn-summary-score" class="times-up-card py-2 mb-4">
            <h4 class="text-center" v-html="$t('TurnSummary.playerHasGuessed', { player: game.speaker.name })"/>
            <h4 class="text-center" v-html="$t('TurnSummary.cards', { score }, score)"/>
            <div class="d-flex justify-content-around">
                <div class="card-status-label">
                    <div id="guessed-card-circle" class="card-status-circle me-2"/>
                    <span v-html="$t('TurnSummary.guessed')"/>
                </div>
                <div class="card-status-label">
                    <div id="skipped-card-circle" class="card-status-circle me-2"/>
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
        <div id="turn-summary-footer">
            <Transition class="mt-3" mode="out-in" name="translate-from-top">
                <div v-if="!isGameUpdating" key="turn-summary-footer" class="d-flex justify-content-center align-items-center">
                    <div class="turn-summary-footer-button-container">
                        <a href="#" type="button" class="text-white me-2" @click.prevent="resetTurn">
                            <i class="fa-solid fa-arrow-rotate-right fa-flip-horizontal fa-3x"/>
                        </a>
                    </div>
                    <div class="turn-summary-footer-button-container pt-2">
                        <PlayITButton @click="validateTurn"/>
                    </div>
                </div>
                <DefaultLoader v-else key="turn-summary-footer-loader" :text="$t('TurnSummary.validatingTurn')"/>
            </Transition>
        </div>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import TurnSummaryPlayedCard from "@/components/GamePage/GamePlaying/Turn/TurnSummary/TurnSummaryPlayedCard";
import useSweetAlert from "@/composables/SweetAlert/useSweetAlert";
import PageTitle from "@/components/shared/Title/PageTitle";
import useError from "@/composables/Error/useError";
import PlayITButton from "@/components/shared/Button/PlayITButton";
import DefaultLoader from "@/components/shared/Loader/DefaultLoader";

export default {
    name: "TurnSummary",
    components: { DefaultLoader, PlayITButton, PageTitle, TurnSummaryPlayedCard },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    emits: {
        "update-played-card-status": card => card._id && card.status,
        "validated-turn": () => true,
        "reset-turn": () => true,
    },
    setup() {
        const store = useStore();
        const { DefaultConfirmSwal } = useSweetAlert();
        const { displayError } = useError();
        return {
            DefaultConfirmSwal, displayError,
            game: computed(() => store.state.game.game),
            isGameUpdating: computed(() => store.state.game.isUpdating),
        };
    },
    computed: {
        score() {
            return this.play.cards.reduce((acc, card) => card.isGuessed ? acc + 1 : acc, 0);
        },
    },
    methods: {
        updatePlayedCardStatus(payload) {
            this.$emit("update-played-card-status", payload);
        },
        confirmResetTurn() {
            return this.DefaultConfirmSwal.fire({
                title: this.$t("TurnSummary.areYouSureYouWantToResetTurn"),
                icon: "warning",
            });
        },
        async resetTurn() {
            const { isConfirmed } = await this.confirmResetTurn();
            if (isConfirmed) {
                this.$emit("reset-turn");
            }
        },
        validateTurn() {
            this.$emit("validated-turn");
        },
    },
};
</script>

<style lang="scss">
    .card-status-label {
        display: flex;
        align-items: center;

        .card-status-circle {
            border-radius: 50px;
            height: 15px;
            width: 15px;
            box-shadow: 1px 1px 3px #000000;

            &#guessed-card-circle {
                background-color: #8CB32D;
            }

            &#skipped-card-circle {
                background-color: #C82333;
            }
        }
    }

    #turn-summary-cards-container {
        overflow-y: scroll;
    }

    #no-card-text {
        height: 100%;
        margin-bottom: 0;
        font-style: italic;
    }

    .turn-summary-footer-button-container {
        width: 100px;
        height: 65px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>