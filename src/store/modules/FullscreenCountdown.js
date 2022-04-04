export default {
    namespaced: true,
    state: {
        countdown: 0,
        lastCountdown: 0,
        isRunning: false,
    },
    getters: {
        countdown(state) {
            return state.countdown;
        },
        lastCountdown(state) {
            return state.lastCountdown;
        },
        isRunning(state) {
            return state.isRunning;
        },
    },
    mutations: {
        setCountdown(state, countdown) {
            state.countdown = countdown;
        },
        setLastCountdown(state, lastCountdown) {
            state.lastCountdown = lastCountdown;
        },
        setIsRunning(state, isRunning) {
            state.isRunning = isRunning;
        },
    },
    actions: {
        launchCountdown({ getters, commit }, { countdown }) {
            return new Promise(resolve => {
                commit("setLastCountdown", countdown);
                commit("setCountdown", countdown);
                commit("setIsRunning", true);
                const interval = setInterval(() => {
                    commit("setCountdown", getters.countdown - 1);
                    if (getters.countdown <= 0) {
                        commit("setIsRunning", false);
                        clearInterval(interval);
                        return resolve();
                    }
                }, 1000);
            });
        },
    },
};