import { computed } from "vue";
import { useStore } from "vuex";

export default function useFullScreenCountdown() {
    const store = useStore();

    const countdown = computed(() => store.state.fullscreenCountdown.countdown);
    const lastCountdown = computed(() => store.state.fullscreenCountdown.lastCountdown);
    const isCountdownRunning = computed(() => store.state.fullscreenCountdown.isRunning);
    return {
        countdown,
        lastCountdown,
        isCountdownRunning,
    };
}