import Game from "@/classes/Game";
import Player from "@/classes/Player";

export default {
    namespaced: true,
    state: {
        game: new Game(),
        isFetching: false,
    },
    getters: {
        game(state) {
            return state.game;
        },
        isFetchingGame(state) {
            return state.isFetching;
        },
    },
    mutations: {
        setGame(state, game) {
            state.game = new Game(game);
        },
        addGamePlayer(state, player) {
            state.game.addPlayer(new Player(player));
        },
        removeGamePlayerByName(state, playerName) {
            state.game.removePlayerByName(playerName);
        },
        setIsFetchingGame(state, isFetchingGame) {
            state.isFetching = isFetchingGame;
        },
    },
    actions: {
        setGame({ commit }, game) {
            commit("setGame", game);
        },
        addGamePlayer({ commit }, player) {
            commit("addGamePlayer", player);
        },
        removeGamePlayerByName({ commit }, name) {
            commit("removeGamePlayerByName", name);
        },
        setIsFetchingGame({ commit }, isFetchingGame) {
            commit("setIsFetchingGame", isFetchingGame);
        },
    },
};