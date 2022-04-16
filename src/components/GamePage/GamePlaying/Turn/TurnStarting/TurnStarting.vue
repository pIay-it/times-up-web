<template>
    <div id="turn-starting" class="d-flex flex-column h-100 align-items-center">
        <PageTitle v-html="$t('TurnStarting.turnOf')"/>
        <h1 class="d-flex flex-grow-1 align-items-center justify-content-center player-name" v-html="game.speaker.name"/>
        <TimesUpFooter class="w-100">
            <div class="container-fluid w-100">
                <div class="row align-items-center">
                    <div class="col-2">
                        <i v-tooltip="$t('TurnStarting.showRoundRules')" class="fa-solid fa-circle-question fa-2x" @click="showRoundRules"/>
                    </div>
                    <div class="col-8 d-flex justify-content-center">
                        <PlayITButton @click="playerIsReady"/>
                    </div>
                </div>
            </div>
        </TimesUpFooter>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import PlayITButton from "@/components/shared/Button/PlayITButton";
import PageTitle from "@/components/shared/Title/PageTitle";
import TimesUpFooter from "@/components/shared/Nav/TimesUpFooter";
import useSweetAlert from "@/composables/SweetAlert/useSweetAlert";

export default {
    name: "TurnStarting",
    components: { TimesUpFooter, PageTitle, PlayITButton },
    emits: { "player-is-ready": () => true, "show-round-rules": () => true },
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
        showRoundRules() {
            this.$emit("show-round-rules");
        },
    },
};
</script>

<style lang="scss">
    .player-name {
        font-size: 3rem;
    }
</style>