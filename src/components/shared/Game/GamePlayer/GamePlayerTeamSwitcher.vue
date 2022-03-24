<template>
    <VueFormToggleButton ref="TeamSwitcher" v-model="playerTeam"
                         :false-value="game.secondTeam.name" :true-value="game.firstTeam.name"/>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Player from "@/classes/Player";

export default {
    name: "GamePlayerTeamSwitcher",
    props: {
        player: {
            type: Player,
            required: true,
        },
    },
    setup() {
        const store = useStore();
        return { game: computed(() => store.state.game.game) };
    },
    computed: {
        playerTeam: {
            get() {
                return this.player.team;
            },
            async set(team) {
                await this.$store.dispatch("game/updateGamePlayerById", { _id: this.player._id, data: { team } });
            },
        },
    },
    watch: {
        playerTeam() {
            this.changeSwitchColor();
        },
    },
    mounted() {
        this.changeSwitchColor();
    },
    methods: {
        changeSwitchColor() {
            const toggleElement = this.$refs.TeamSwitcher.$el.querySelector(".toggle-container > .toggle");
            if (this.playerTeam === this.game.firstTeam.name) {
                toggleElement.style.borderColor = this.game.firstTeam.color;
                toggleElement.style.backgroundColor = this.game.firstTeam.color;
            } else {
                toggleElement.style.borderColor = this.game.secondTeam.color;
                toggleElement.style.backgroundColor = this.game.secondTeam.color;
            }
        },
    },
};
</script>