<template>
    <div id="game-currently-playing">
        <div class="row">
            A GAME IS PLAYING
        </div>
        <div class="row">
            <RouterLink class="btn btn-primary" :to="`/game/${game._id}`">
                <span v-html="$t('GameCurrentlyPlaying.goToGame')"/>
            </RouterLink>
        </div>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
    name: "GameCurrentlyPlaying",
    setup() {
        const store = useStore();
        return { game: computed(() => store.state.game.game) };
    },
};
</script>