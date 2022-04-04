import { createStore } from "vuex";
import Game from "./modules/Game";
import User from "./modules/User";
import FullscreenCountdown from "./modules/FullscreenCountdown";

const store = createStore({ modules: { game: Game, user: User, fullscreenCountdown: FullscreenCountdown } });

export default store;