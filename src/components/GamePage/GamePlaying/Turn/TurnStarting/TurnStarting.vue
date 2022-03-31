<template>
    <div id="turn-starting" class="d-flex flex-column h-100 align-items-center">
        <PageTitle v-html="$t('TurnStarting.turnOf')"/>
        <h1 class="d-flex flex-grow-1 align-items-center justify-content-center player-name" v-html="game.speaker.name"/>
        <PlayITButton @click="playerIsReady"/>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import PlayITButton from "@/components/shared/Button/PlayITButton";
import useSweetAlert from "@/composables/SweetAlert/useSweetAlert";
import PageTitle from "@/components/shared/Title/PageTitle";

export default {
    name: "TurnStarting",
    components: { PageTitle, PlayITButton },
    emits: { "player-is-ready": () => true },
    setup() {
        const store = useStore();
        const { DefaultConfirmSwal } = useSweetAlert();
        return {
            game: computed(() => store.state.game.game),
            DefaultConfirmSwal,
        };
    },
    methods: {
        confirmPlayerIsReady() {
            return this.DefaultConfirmSwal.fire({
                title: this.game.speaker.name,
                text: this.$t("TurnStarting.areYouReady"),
                icon: "question",
            });
        },
        async playerIsReady() {
            const { isConfirmed } = await this.confirmPlayerIsReady();
            if (isConfirmed) {
                await this.$store.dispatch("fullscreenCountdown/launchCountdown", { countdown: 5 });
                this.$emit("player-is-ready");
            }
        },
    },
};
</script>

<style lang="scss">
    .player-name {
        font-size: 3rem;
    }
</style>