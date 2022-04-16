<template>
    <div id="round-starting" class="d-flex flex-column h-100 align-items-center">
        <PageTitle v-html="$t('RoundStarting.roundNumber', { number: game.round })"/>
        <div class="flex-grow-1 text-center">
            <img :src="roundIcon" alt="Round Icon" class="round-icon mt-1"/>
            <h4 class="mt-4" v-html="roundTitle"/>
            <p class="mt-4" v-html="roundDescription"/>
        </div>
        <TimesUpFooter>
            <PlayITButton @click="$emit('start-turn')"/>
        </TimesUpFooter>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import PageTitle from "@/components/shared/Title/PageTitle";
import PlayITButton from "@/components/shared/Button/PlayITButton";
import firstRoundIcon from "@/assets/svg/game/round-1-icon.svg";
import secondRoundIcon from "@/assets/svg/game/round-2-icon.svg";
import thirdRoundIcon from "@/assets/svg/game/round-3-icon.svg";
import TimesUpFooter from "@/components/shared/Nav/TimesUpFooter";

export default {
    name: "RoundStarting",
    components: { TimesUpFooter, PlayITButton, PageTitle },
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
        roundIcon() {
            const icons = {
                first: firstRoundIcon,
                second: secondRoundIcon,
                third: thirdRoundIcon,
            };
            return icons[this.roundRank];
        },
    },
};
</script>

<style lang="scss">
    .round-icon {
        max-width: 150px;
    }
</style>