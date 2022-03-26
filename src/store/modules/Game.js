import Game from "@/classes/Game";
import Player from "@/classes/Player";

export default {
    namespaced: true,
    state: {
        game: new Game(),
        isFetching: false,
        isCreating: false,
        isUpdating: false,
    },
    getters: {
        game(state) {
            return state.game;
        },
        isFetchingGame(state) {
            return state.isFetching;
        },
        isCreatingGame(state) {
            return state.isCreating;
        },
        isUpdatingGame(state) {
            return state.isUpdating;
        },
    },
    mutations: {
        setGame(state, game) {
            state.game = new Game(game);
        },
        resetGame(state) {
            state.game = new Game();
        },
        updateGameCardById(state, { _id, data }) {
            state.game.updateCardById(_id, data);
        },
        addGamePlayer(state, player) {
            state.game.addPlayer(new Player(player));
        },
        updateGamePlayerById(state, { _id, data }) {
            state.game.updatePlayerById(_id, data);
        },
        removeGamePlayerByName(state, playerName) {
            state.game.removePlayerByName(playerName);
        },
        removeAllGamePlayers(state) {
            state.game.removeAllPlayers();
        },
        setIsFetchingGame(state, isFetchingGame) {
            state.isFetching = isFetchingGame;
        },
        setIsCreatingGame(state, isCreating) {
            state.isCreating = isCreating;
        },
        setIsUpdatingGame(state, isUpdating) {
            state.isUpdating = isUpdating;
        },
    },
    actions: {
        setGame({ commit }, game) {
            commit("setGame", game);
        },
        resetGame({ commit }) {
            commit("resetGame");
        },
        updateGameCardById({ commit }, payload) {
            commit("updateGameCardById", payload);
        },
        addGamePlayer({ commit }, player) {
            commit("addGamePlayer", player);
        },
        updateGamePlayerById({ commit }, payload) {
            commit("updateGamePlayerById", payload);
        },
        removeGamePlayerByName({ commit }, name) {
            commit("removeGamePlayerByName", name);
        },
        removeAllGamePlayers({ commit }) {
            commit("removeAllGamePlayers", name);
        },
        setIsFetchingGame({ commit }, isFetchingGame) {
            commit("setIsFetchingGame", isFetchingGame);
        },
        setIsCreatingGame({ commit }, isCreatingGame) {
            commit("setIsCreatingGame", isCreatingGame);
        },
        setIsUpdatingGame({ commit }, isUpdatingGame) {
            commit("setIsUpdatingGame", isUpdatingGame);
        },
    },
};