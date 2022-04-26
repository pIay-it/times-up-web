<template>
    <div id="turn-playing" class="h-100">
        <VTooltip :triggers="[]" :hide-triggers="[]" :distance="300" :skidding="300" container="#turn-playing" theme="card-helper-tooltip"
                  :shown="isCardTooltipShown" :auto-hide="false" :hide-on-target-click="false">
            <i id="card-helper-icon" class="fa-solid fa-lightbulb fa-3x" @click.prevent="showCardTooltip"/>
            <template #popper>
                <div v-if="isCardTooltipShown" class="d-flex">
                    <CardImage :image-url="currentToGuessCard.imageURL" class="me-2"/>
                    <p v-html="currentToGuessCardDescription"/>
                </div>
            </template>
        </VTooltip>
        <div id="turn-playing-timer-section" class="turn-playing-section d-flex justify-content-center align-items-center">
            <ve-progress :progress="countdownProgress" :size="175" animation="default 400 0" color="white" empty-color="rgba(255, 255, 255, 0.1)">
                <template #default>
                    <VueCountdown #default="{ seconds }" :time="turnTimeLimitMs" @progress="syncCountdown" @end="endTurn">
                        <Transition mode="out-in" name="translate-from-top">
                            <span :key="seconds" class="countdown-seconds" v-html="`${seconds}s`"/>
                        </Transition>
                    </VueCountdown>
                </template>
            </ve-progress>
        </div>
        <div id="turn-playing-card-section" class="flex-grow-1 d-flex flex-column turn-playing-section">
            <Transition mode="out-in" name="card-transition" @before-leave="beforeLeaveList">
                <h1 id="card-to-guess-label" :key="currentToGuessCard?._id"
                    class="d-flex flex-grow-1 justify-content-center align-items-center text-center"
                    v-html="currentToGuessCard?.label"/>
            </Transition>
        </div>
        <div id="turn-playing-actions-section" class="d-flex flex-grow-1 justify-content-between turn-playing-section">
            <div class="turn-action-button-container">
                <button id="skipped-card-button" type="button"
                        class="turn-action-button d-flex flex-column align-items-center justify-content-center"
                        :class="{ disabled: isSkippedButtonDisabled }"
                        @click="playCurrentCard('skipped')">
                    <i class="fa-solid fa-times"/>
                    <span class="text-center" v-html="$t('TurnPlaying.skipped')"/>
                </button>
            </div>
            <div class="turn-action-button-container">
                <button id="guessed-card-button" type="button"
                        class="turn-action-button d-flex flex-column align-items-center justify-content-center"
                        @click="playCurrentCard('guessed')">
                    <i class="fa-solid fa-check"/>
                    <span class="text-center" v-html="$t('TurnPlaying.guessed')"/>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, defineEmits, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { POSITION, useToast } from "vue-toastification";
import useTransition from "@/composables/Transition/useTransition";
import Card from "@/classes/Card";
import CardImage from "@/components/shared/Card/Image/CardImage";
import useGame from "@/composables/Game/useGame";

const emit = defineEmits({
    "card-played": card => card instanceof Card,
    "turn-is-over": () => true,
});

const store = useStore();
const { game } = useGame();
const { beforeLeaveList } = useTransition();
const { t } = useI18n();
const Toast = useToast();
const turnTimeLimitMs = ref(game.value.roundsTurnsTimeLimit * 1000);
const turnTimeLimit = ref(game.value.roundsTurnsTimeLimit);
const isCardTooltipShown = ref(false);
const currentCardStartedAt = ref(new Date());
const countdown = ref(turnTimeLimit.value);

const currentToGuessCard = computed(() => game.value.currentToGuessCard);
const countdownProgress = computed(() => {
    const seconds = turnTimeLimit.value - countdown.value;
    return turnTimeLimit.value ? 100 - seconds * 100 / turnTimeLimit.value : 0;
});
const isTurnOver = computed(() => !game.value.currentToGuessCard);
const currentToGuessCardDescription = computed(() => {
    const { description } = currentToGuessCard.value;
    return description ? description : t("TurnPlaying.noCardDescription");
});
const isSkippedButtonDisabled = computed(() => game.value.round === 1);

const endTurn = () => {
    countdown.value = 0;
    emit("turn-is-over");
};
const playCurrentCard = status => {
    if (status === "skipped" && isSkippedButtonDisabled.value) {
        Toast.dismiss("forbidden-skip");
        return Toast.warning(t("TurnPlaying.youCantSkipOnFirstRound"), { id: "forbidden-skip", position: POSITION.TOP_CENTER });
    }
    isCardTooltipShown.value = false;
    const now = new Date();
    const playingTime = (now - currentCardStartedAt.value) / 1000;
    currentCardStartedAt.value = new Date();
    emit("card-played", new Card({ ...currentToGuessCard.value, status, playingTime }));
};
const syncCountdown = ({ seconds }) => (countdown.value = seconds);
const showCardTooltip = async() => {
    if (!isCardTooltipShown.value) {
        await store.dispatch("fullscreenCountdown/launchCountdown", { countdown: 3 });
    }
    isCardTooltipShown.value = true;
};

watch(isTurnOver, value => {
    if (value) {
        endTurn();
    }
});
</script>

<style lang="scss" scoped>
#card-helper-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

.turn-playing-section {
    height: 33%;

    #to-guess-text {
        opacity: 0.65;
    }

    #card-to-guess-label {
        font-size: 3.5rem;
    }

    .turn-action-button-container {
        width: 49%;

        .turn-action-button {
            height: 100%;
            width: 100%;
            border-radius: 15px;
            color: white;
            opacity: 0.85;
            box-shadow: 1px 1px 3px #000000;

            &#guessed-card-button {
                background-color: #8CB32D;
                border-color: #8CB32D;
            }

            &#skipped-card-button {
                background-color: #C82333;
                border-color: #C82333;
            }

            &.disabled {
                background-color: #6a6868 !important;
                border-color: #4a4a4a !important;
            }

            .fa-solid {
                font-size: 6rem;
            }
        }
    }
}

.countdown-seconds {
    font-size: 3rem;
}

.card-transition-enter-active, .card-transition-leave-active {
    transition: all 0.15s ease-out;
}

.card-transition-leave-to {
    opacity: 0;
    transform: translateX(100px);
}

.card-transition-enter-from {
    opacity: 0;
    transform: translateX(-100px);
}

.card-transition-leave-active {
    position: fixed;
}
</style>