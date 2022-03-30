<template>
    <Transition name="fade" mode="out-in">
        <div v-show="isCountdownRunning" id="fullscreen-countdown-container">
            <ve-progress :progress="countdownProgress" animation="default 200 0"/>
        </div>
    </Transition>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
    name: "FullScreenCountdown",
    setup() {
        const store = useStore();
        return {
            countdown: computed(() => store.state.fullscreenCountdown.countdown),
            lastCountdown: computed(() => store.state.fullscreenCountdown.lastCountdown),
            isCountdownRunning: computed(() => store.state.fullscreenCountdown.isRunning),
        };
    },
    computed: {
        countdownProgress() {
            return 100 - this.countdown * 100 / this.lastCountdown;
        },
    },
};
</script>

<style lang="scss" scoped>
    #fullscreen-countdown-container {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        background: rgba(0, 0, 0, 0.6);
    }
</style>