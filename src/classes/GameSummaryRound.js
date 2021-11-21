import GameSummaryScore from "@/classes/GameSummaryScore";
import { getProp } from "@/helpers/functions/Class";

class GameSummaryRound {
    constructor(gameSummaryRound = null) {
        this._id = getProp(gameSummaryRound, "_id");
        this.number = getProp(gameSummaryRound, "number");
        this.scores = getProp(gameSummaryRound, "scores", [], scores => scores.map(score => new GameSummaryScore(score)));
    }

    getTeamScore(team) {
        const summaryScore = this.scores?.find(score => score.team === team);
        return summaryScore ? summaryScore.score : undefined;
    }
}

export default GameSummaryRound;