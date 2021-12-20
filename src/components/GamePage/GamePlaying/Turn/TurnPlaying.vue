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
            <button v-if="game.canSkipCard" type="button" class="btn btn-warning me-1" @click.prevent="playCurrentCard('skipped')">
                SKIP
            </button>
            <button type="button" class="btn btn-secondary me-1" @click.prevent="playCurrentCard('discarded')">
                DISCARD
            </button>
        </div>
        <hr/>
        <div>
            <VueCountdown #default="{ seconds }" :time="turnTimeLimit" @end="$emit('turn-is-over')">
                Time Remaining：{{ seconds }} seconds.
            </VueCountdown>
        </div>
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
            return !this.game.currentToGuessCard;
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
        playCurrentCard(status) {
            const { currentToGuessCard } = this.game;
            const now = new Date();
            const playingTime = (now - this.currentCardStartedAt) / 1000;
            this.currentCardStartedAt = new Date();
            this.$emit("card-played", new Card({ ...currentToGuessCard, status, playingTime }));
        },
    },
};
</script>