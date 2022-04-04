<template>
    <div id="round-starting" class="d-flex flex-column h-100 align-items-center">
        <PageTitle v-html="$t('RoundStarting.roundNumber', { number: game.round })"/>
        <div class="flex-grow-1 text-center">
            <i :class="roundIconClasses" class="mt-1 fa-3x"/>
            <h4 class="mt-4" v-html="roundTitle"/>
            <p class="mt-4" v-html="roundDescription"/>
        </div>
        <PlayITButton @click="$emit('start-turn')"/>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import PageTitle from "@/components/shared/Title/PageTitle";
import PlayITButton from "@/components/shared/Button/PlayITButton";

export default {
    name: "RoundStarting",
    components: { PlayITButton, PageTitle },
    emits: { "start-turn": () => true },
    setup() {
        const store = useStore();
        return { game: computed(() => store.state.game.game) };
    },
    computed: {
        roundRank() {
            const ranks = ["first", "second", "third"];
            return ranks[this.game.round - 1];
        },
        roundTitle() {
            return this.$t(`RoundStarting.${this.roundRank}Round.title`);
        },
        roundDescription() {
            return this.$t(`RoundStarting.${this.roundRank}Round.description`);
        },
        roundIconClasses() {
            const iconClasses = {
                first: "fa-solid fa-bullhorn",
                second: "fa-solid fa-hand-point-up",
                thirst: "fa-solid fa-child-reaching",
            };
            return iconClasses[this.roundRank];
        },
    },
};
</script>