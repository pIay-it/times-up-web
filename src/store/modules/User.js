import User from "@/classes/User";

export default {
    namespaced: true,
    state: { user: new User() },
    getters: {
        user(state) {
            return state.user;
        },
    },
    mutations: {
        setUser(state, user) {
            state.user = new User(user);
        },
        setIsLogged(state, isLogged) {
            state.user.isLogged = isLogged;
        },
        setAuthMode(state, authMode) {
            state.user.authMode = authMode;
        },
    },
    actions: {
        setUser({ commit }, user) {
            commit("setUser", user);
        },
        setIsLogged({ commit }, isLogged) {
            commit("setIsLogged", isLogged);
        },
    },
};