import { createStore } from "vuex";
import Game from "./modules/Game";

export default createStore({ modules: { game: Game } });