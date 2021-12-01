<template>
    <div id="turn-playing">
        TURN PLAYING
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
    name: "TurnPlaying",
    setup() {
        const store = useStore();
        return { game: computed(() => store.state.game.game) };
    },
};
</script>