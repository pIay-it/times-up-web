<template>
    <VueFormToggleButton ref="teamSwitcher" v-model="playerTeam"
                         :false-value="game.secondTeam.name" :true-value="game.firstTeam.name"/>
</template>

<script setup>
import { computed, defineProps, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import Player from "@/classes/Player";
import useGame from "@/composables/Game/useGame";

const props = defineProps({
    player: {
        type: Player,
        required: true,
    },
});

const store = useStore();
const { game } = useGame();
const teamSwitcher = ref(null);

const playerTeam = computed({
    get: () => props.player.team,
    set: team => store.dispatch("game/updateGamePlayerById", { _id: props.player._id, data: { team } }),
});

const changeSwitchColor = () => {
    const toggleElement = teamSwitcher.value.$el.querySelector(".toggle-container > .toggle");
    if (playerTeam.value === game.value.firstTeam.name) {
        toggleElement.style.borderColor = game.value.firstTeam.color;
        toggleElement.style.backgroundColor = game.value.firstTeam.color;
    } else {
        toggleElement.style.borderColor = game.value.secondTeam.color;
        toggleElement.style.backgroundColor = game.value.secondTeam.color;
    }
};

watch(playerTeam, changeSwitchColor);

onMounted(() => changeSwitchColor());
</script>