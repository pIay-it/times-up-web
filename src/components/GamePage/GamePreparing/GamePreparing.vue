<template>
    <div id="game-preparing" class="d-flex flex-column h-100">
        <PageTitle v-html="$t('GamePreparing.makeTeams')"/>
        <div class="times-up-card py-2 mb-4">
            <h4 class="text-center" v-html="$t('GamePreparing.teams')"/>
            <div class="d-flex justify-content-around">
                <GameTeamLabel v-for="team of game.teams" :key="`team-${team.color}`" :team="team"/>
            </div>
        </div>
        <div class="d-flex flex-grow-1 flex-column container-fluid">
            <GamePlayer v-for="player of game.players" :key="player._id" :player="player"/>
        </div>
        <Transition class="mt-3" mode="out-in" name="translate-from-top">
            <div v-if="!isUpdatingGame" key="" class="d-flex justify-content-center align-items-center">
                <div class="game-preparing-footer-button-container">
                    <BackButton to="/"/>
                </div>
                <div class="game-preparing-footer-button-container pt-2">
                    <PlayITButton :class="{ 'cant-start-game-button': !game.canStart }" @click="startPlayingGame"/>
                </div>
            </div>
            <div v-else>
                <DefaultLoader :text="$t('GameLobby.creatingGame')"/>
            </div>
        </Transition>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import PageTitle from "@/components/shared/Title/PageTitle";
import GameTeamLabel from "@/components/shared/Game/GameTeamLabel";
import GamePlayer from "@/components/shared/Game/GamePlayer/GamePlayer";
import BackButton from "@/components/shared/Button/BackButton";
import PlayITButton from "@/components/shared/Button/PlayITButton";
import DefaultLoader from "@/components/shared/Loader/DefaultLoader";

export default {
    name: "GamePreparing",
    components: { DefaultLoader, PlayITButton, BackButton, GamePlayer, GameTeamLabel, PageTitle },
    setup() {
        const store = useStore();
        return {
            game: computed(() => store.state.game.game),
            isUpdatingGame: computed(() => store.state.game.isUpdating),
        };
    },
    methods: {
        startPlayingGame() {
            console.log("GO");
        },
    },
};
</script>

<style lang="scss">
    .game-preparing-footer-button-container {
        width: 100px;
        height: 65px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>