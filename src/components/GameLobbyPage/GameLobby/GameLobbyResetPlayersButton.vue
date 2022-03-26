<template>
    <Transition mode="out-in" name="translate-from-top">
        <a v-if="isShown" id="game-lobby-reset-players-button" v-tooltip="$t('GameLobbyResetPlayersButton.resetGameComposition')"
           href="#" type="button" @click.prevent="removeAllGamePlayers">
            <i class="fa-solid fa-arrow-rotate-right fa-flip-horizontal fa-3x"/>
        </a>
    </Transition>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import useSweetAlert from "@/composables/SweetAlert/useSweetAlert";

export default {
    name: "GameLobbyResetPlayersButton",
    setup() {
        const store = useStore();
        const { DefaultConfirmSwal } = useSweetAlert();
        return { game: computed(() => store.state.game.game), DefaultConfirmSwal };
    },
    computed: {
        isShown() {
            return this.game.hasPlayers;
        },
    },
    methods: {
        confirmResetGameComposition() {
            return this.DefaultConfirmSwal.fire({
                title: this.$t("GameLobbyResetPlayersButton.areYouSureYouWantToResetGameComposition"),
                text: this.$t("GameLobbyResetPlayersButton.gameCompositionWillBeLost"),
                icon: "warning",
            });
        },
        async removeAllGamePlayers() {
            const { isConfirmed } = await this.confirmResetGameComposition();
            if (isConfirmed) {
                await this.$store.dispatch("game/removeAllGamePlayers");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    #game-lobby-reset-players-button {
        text-decoration: none;
        color: white;
    }
</style>