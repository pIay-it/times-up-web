<template>
    <div id="turn-summary" class="text-center">
        <div>
            TURN SUMMARY
        </div>
        <div>
            The player scored {{ score }} points
            <hr/>
        </div>
        <div v-if="play.cards.length">
            <TurnSummaryPlayedCard v-for="card of play.cards" :key="card._id" :card="card" @update-played-card-status="updatePlayedCardStatus"/>
        </div>
        <div v-else>
            NO CARDS PLAYED
        </div>
        <button type="button" class="btn btn-secondary mb-1" @click.prevent="resetTurn">
            RESET TURN
        </button>
        <div class="d-flex justify-content-center">
            <SubmitButton classes="btn btn-primary" :is-loading="isGameUpdating" @click.prevent="$emit('validated-turn')">
                VALIDATE TURN
            </SubmitButton>
        </div>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import TurnSummaryPlayedCard from "@/components/GamePage/GamePlaying/Turn/TurnSummary/TurnSummaryPlayedCard";
import SubmitButton from "@/components/shared/Form/SubmitButton";

export default {
    name: "TurnSummary",
    components: { SubmitButton, TurnSummaryPlayedCard },
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
        return {
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
            return Swal.fire({
                title: this.$t("TurnSummary.areYouSureYouWantToResetTurn"),
                text: this.$t("SweetAlert.actionIsIrreversible"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: this.$t("SweetAlert.confirm"),
                cancelButtonText: this.$t("SweetAlert.cancel"),
                heightAuto: false,
            });
        },
        async resetTurn() {
            const { isConfirmed } = await this.confirmResetTurn();
            if (isConfirmed) {
                this.$emit("reset-turn");
            }
        },
    },
};
</script>