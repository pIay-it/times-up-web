<template>
    <div id="turn-summary" class="text-center">
        <div>
            TURN SUMMARY
        </div>
        <TurnSummaryPlayedCard v-for="card of play.cards" :key="card._id" :card="card" @update-played-card-status="updatePlayedCardStatus"/>
    </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import TurnSummaryPlayedCard from "@/components/GamePage/GamePlaying/Turn/TurnSummary/TurnSummaryPlayedCard";

export default {
    name: "TurnSummary",
    components: { TurnSummaryPlayedCard },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    emits: { "update-played-card-status": card => card._id && card.status },
    setup() {
        const store = useStore();
        return { game: computed(() => store.state.game.game) };
    },
    methods: {
        updatePlayedCardStatus(payload) {
            this.$emit("update-played-card-status", payload);
        },
    },
};
</script>