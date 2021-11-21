import Player from "@/classes/Player";
import { getProp } from "@/helpers/functions/Class";

class GameQueue {
    constructor(gameQueue = null) {
        this._id = getProp(gameQueue, "_id");
        this.team = getProp(gameQueue, "team");
        this.players = getProp(gameQueue, "players", [], players => players.map(player => new Player(player)));
    }
}

export default GameQueue;