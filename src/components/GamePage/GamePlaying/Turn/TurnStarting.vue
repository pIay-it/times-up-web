<template>
    <div id="turn-starting">
        TURN STARTING FOR {{ game.speaker.name }}
        <button type="button" class="btn btn-primary" @click.prevent="$emit('player-is-ready')">
            I AM READY
        </button>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
    name: "TurnStarting",
    emits: { "player-is-ready": () => true },
    setup() {
        const store = useStore();
        return { game: computed(() => store.state.game.game) };
    },
};
</script>