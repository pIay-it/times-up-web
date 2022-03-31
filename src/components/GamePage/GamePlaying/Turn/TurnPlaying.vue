<template>
    <div id="turn-playing" class="h-100">
        <div id="turn-playing-timer-section" class="turn-playing-section d-flex justify-content-center align-items-center">
            <ve-progress :progress="countdownProgress" :size="175" animation="default 400 0" color="white" empty-color="rgba(255, 255, 255, 0.1)">
                <template #default>
                    <VueCountdown #default="{ seconds }" :time="turnTimeLimitMs" @progress="syncCountdown" @end="endTurn">
                        <Transition mode="out-in" name="translate-from-top">
                            <span :key="seconds" class="countdown-seconds" v-html="seconds"/>
                        </Transition>
                    </VueCountdown>
                </template>
            </ve-progress>
        </div>
        <div id="turn-playing-card-section" class="flex-grow-1 d-flex flex-column turn-playing-section">
            <Transition mode="out-in" name="card-transition" @before-leave="beforeLeaveList">
                <h1 id="card-to-guess-label" :key="currentToGuessCard._id" class="d-flex flex-grow-1 justify-content-center align-items-center"
                    v-html="currentToGuessCard.label"/>
            </Transition>
        </div>
        <div id="turn-playing-actions-section" class="d-flex flex-grow-1 justify-content-between turn-playing-section">
            <div class="turn-action-button-container">
                <button id="skipped-card-button" type="button"
                        class="turn-action-button d-flex flex-column align-items-center justify-content-center"
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

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Card from "@/classes/Card";
import useTransition from "@/composables/Transition/useTransition";

export default {
    name: "TurnPlaying",
    emits: { "card-played": card => card instanceof Card, "turn-is-over": () => true },
    setup() {
        const store = useStore();
        const game = computed(() => store.state.game.game);
        const turnTimeLimitMs = ref(game.value.roundsTurnsTimeLimit * 1000);
        const turnTimeLimit = ref(game.value.roundsTurnsTimeLimit);
        const { beforeLeaveList } = useTransition();
        const countdown = ref(turnTimeLimit.value);
        return {
            game: computed(() => store.state.game.game),
            turnTimeLimit, turnTimeLimitMs, currentCardStartedAt: new Date(), countdown,
            beforeLeaveList,
        };
    },
    computed: {
        currentToGuessCard() {
            return this.game.currentToGuessCard;
        },
        countdownProgress() {
            const seconds = this.turnTimeLimit - this.countdown;
            return this.turnTimeLimit ? 100 - seconds * 100 / this.turnTimeLimit : 0;
        },
        isTurnOver() {
            return !this.game.currentToGuessCard;
        },
    },
    watch: {
        isTurnOver(isTurnOver) {
            if (isTurnOver) {
                // This.$emit("turn-is-over");
            }
        },
    },
    methods: {
        playCurrentCard(status) {
            const { currentToGuessCard } = this.game;
            const now = new Date();
            const playingTime = (now - this.currentCardStartedAt) / 1000;
            this.currentCardStartedAt = new Date();
            this.$emit("card-played", new Card({ ...currentToGuessCard, status, playingTime }));
        },
        syncCountdown({ seconds }) {
            this.countdown = seconds;
        },
        endTurn() {
            this.countdown = 0;
            // This.$emit("turn-is-overs");
        },
    },
};
</script>

<style lang="scss">
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

            .fa-solid {
                font-size: 6rem;
            }

            &#guessed-card-button {
                background-color: #8CB32D;
                border-color: #8CB32D;
            }

            &#skipped-card-button {
                background-color: #C82333;
                border-color: #C82333;
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