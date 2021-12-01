<template>
    <div id="game-playing"/>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
    name: "GamePlaying",
    setup() {
        const store = useStore();
        return { game: computed(() => store.state.game.game) };
    },
    data() {
        return { gameState: "starting-turn" };
    },
};
</script>