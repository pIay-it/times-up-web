import { createStore } from "vuex";
import Game from "./modules/Game";
import User from "./modules/User";

const store = createStore({ modules: { game: Game, user: User } });

export default store;