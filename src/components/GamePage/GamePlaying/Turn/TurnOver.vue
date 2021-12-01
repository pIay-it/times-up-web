<template>
    <div id="turn-over">
        TURN OVER
    </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
    name: "TurnOver",
    setup() {
        const store = useStore();
        return { game: computed(() => store.state.game.game) };
    },
};
</script>