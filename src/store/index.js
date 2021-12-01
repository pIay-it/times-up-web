import { createStore } from "vuex";
import Game from "./modules/Game";

const store = createStore({ modules: { game: Game } });

export default store;