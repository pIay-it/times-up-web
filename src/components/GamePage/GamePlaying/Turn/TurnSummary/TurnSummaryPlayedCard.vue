<template>
    <div id="turn-summary-played-card">
        <div class="mb-2" v-html="card.label"/>
        <div class="btn-group" role="group">
            <input :id="`guessed-card-${card._id}`" v-model="status" type="radio" class="btn-check" value="guessed"/>
            <label class="btn btn-outline-success" :for="`guessed-card-${card._id}`">
                <span v-html="$t('TurnSummaryPlayedCard.guessed')"/>
            </label>
            <input v-if="game.canSkipCard" :id="`skipped-card-${card._id}`" v-model="status" type="radio" class="btn-check" value="skipped"/>
            <label v-if="game.canSkipCard" class="btn btn-outline-warning" :for="`skipped-card-${card._id}`">
                <span v-html="$t('TurnSummaryPlayedCard.skipped')"/>
            </label>
            <input :id="`discarded-card-${card._id}`" v-model="status" type="radio" class="btn-check" value="discarded"/>
            <label class="btn btn-outline-danger" :for="`discarded-card-${card._id}`">
                <span v-html="$t('TurnSummaryPlayedCard.discarded')"/>
            </label>
        </div>
        <hr/>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Card from "@/classes/Card";

export default {
    name: "TurnSummaryPlayedCard",
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
        status: {
            get() {
                return this.card.status;
            },
            set(status) {
                this.$emit("update-played-card-status", { _id: this.card._id, status });
            },
        },
    },
};
</script>