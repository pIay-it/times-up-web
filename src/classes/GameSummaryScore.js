import Player from "@/classes/Player";
import { getProp } from "@/helpers/functions/Class";

class GameSummaryScore {
    constructor(gameSummaryScore = null) {
        this._id = getProp(gameSummaryScore, "_id");
        this.players = getProp(gameSummaryScore, "players", [], players => players.map(player => new Player(player)));
        this.team = getProp(gameSummaryScore, "team", []);
        this.score = getProp(gameSummaryScore, "score");
    }
}

export default GameSummaryScore;