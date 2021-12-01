<template>
    <div id="turn-starting">
        TURN STARTING
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
    name: "TurnStarting",
    setup() {
        const store = useStore();
        return { game: computed(() => store.state.game.game) };
    },
};
</script>