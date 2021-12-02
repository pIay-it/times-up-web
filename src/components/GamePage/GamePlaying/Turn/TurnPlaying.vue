<template>
    <div id="turn-playing" class="text-center">
        <div>
            CURRENT CARD
            <div>
                {{ currentToGuessCard.label }}
            </div>
            <button type="button" class="btn btn-success me-1" @click.prevent="playCurrentCard('guessed')">
                GUESSED
            </button>
            <button type="button" class="btn btn-warning me-1" @click.prevent="playCurrentCard('skipped')">
                SKIPPED
            </button>
            <button type="button" class="btn btn-secondary me-1" @click.prevent="playCurrentCard('discarded')">
                DISCARDED
            </button>
        </div>
        <hr/>
        <div>
            <VueCountdown #default="{ seconds }" :time="turnTimeLimit">
                Time Remaining：{{ seconds }} seconds.
            </VueCountdown>
        </div>
        <button type="button" class="btn btn-danger" @click.prevent="subtractSecondsToTimeLimit(2)">
            SUBTRACT TWO SECONDS
        </button>
    </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Card from "@/classes/Card";

export default {
    name: "TurnPlaying",
    emits: { "card-played": card => card instanceof Card, "turn-is-over": () => true },
    setup() {
        const store = useStore();
        const game = computed(() => store.state.game.game);
        const turnTimeLimit = ref(game.value.roundsTurnsTimeLimit * 1000);
        return {
            game: computed(() => store.state.game.game),
            turnTimeLimit,
        };
    },
    data() {
        return { currentCardStartedAt: new Date() };
    },
    computed: {
        currentToGuessCard() {
            return this.game.currentToGuessCard;
        },
        isTurnOver() {
            return !this.turnTimeLimit || !this.game.currentToGuessCard;
        },
    },
    watch: {
        isTurnOver(isTurnOver) {
            if (isTurnOver) {
                this.$emit("turn-is-over");
            }
        },
    },
    methods: {
        subtractSecondsToTimeLimit(seconds) {
            if (seconds >= this.turnTimeLimit) {
                this.turnTimeLimit = 0;
            } else {
                this.turnTimeLimit -= seconds * 1000;
            }
        },
        playCurrentCard(status) {
            const { currentToGuessCard } = this.game;
            const now = new Date();
            const timeToGuess = status === "guessed" ? (now - this.currentCardStartedAt) / 1000 : undefined;
            this.currentCardStartedAt = new Date();
            this.$emit("card-played", new Card({ ...currentToGuessCard, status, timeToGuess }));
        },
    },
};
</script>