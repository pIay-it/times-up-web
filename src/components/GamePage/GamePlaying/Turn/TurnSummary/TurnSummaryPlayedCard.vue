<template>
    <div class="turn-summary-played-card row">
        <div class="played-card times-up-card col-12 d-flex flex-grow-1 align-items-center mb-2">
            <div class="d-flex flex-grow-1 align-items-center">
                <div class="card-image-container my-1 me-2">
                    <CardImage :image-url="card.imageURL" :max-height="50" :max-width="50"/>
                </div>
                <div class="text-truncate flex-grow-1">
                    <div v-html="card.label"/>
                    <div class="playing-time-text" v-html="playingTimeText"/>
                </div>
            </div>
            <VueFormToggleButton v-model="cardStatus" :false-value="playedCardFalseValue" true-value="guessed" class="toggle-card-status">
                <template #label="{ checked }">
                    <span class="card-status-switcher-label text-white px-2" v-html="getCardStatusSwitcherLabel(checked)"/>
                </template>
            </VueFormToggleButton>
        </div>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Card from "@/classes/Card";
import CardImage from "@/components/shared/Card/Image/CardImage";

export default {
    name: "TurnSummaryPlayedCard",
    components: { CardImage },
    props: {
        card: {
            type: Card,
            required: true,
        },
    },
    emits: { "update-played-card-status": card => card._id && card.status },
    setup() {
        const store = useStore();
        return { game: computed(() => store.state.game.game) };
    },
    computed: {
        cardStatus: {
            get() {
                return this.card.status;
            },
            set(status) {
                this.$emit("update-played-card-status", { _id: this.card._id, status });
            },
        },
        playedCardFalseValue() {
            return this.game.round === 1 ? "discarded" : "skipped";
        },
        playingTimeText() {
            return this.$t("TurnSummaryPlayedCard.cardPlayedInSeconds", { playingTime: this.card.playingTime });
        },
    },
    methods: {
        getCardStatusSwitcherLabel(isChecked) {
            const icon = isChecked ? "fa-check" : "fa-times";
            return `<i class="fa-solid ${icon}"></i>`;
        },
    },
};
</script>

<style lang="scss">
    .card-image-container {
        height: 50px;
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .toggle-card-status {
        --toggle-bg-on: #8CB32D;
        --toggle-border-on: #67861f;
        --toggle-bg-off: #C82333;
        --toggle-border-off: #991823;
    }

    .card-status-switcher-label {
        font-size: 1.2rem;
    }

    .playing-time-text {
        font-style: italic;
        font-size: 0.8rem;
        color: lightgray;
    }
</style>