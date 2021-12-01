<template>
    <div id="game-preparing">
        GAME PREPARING
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
    name: "GamePreparing",
    setup() {
        const store = useStore();
        return { game: computed(() => store.state.game.game) };
    },
};
</script>