import Player from "@/classes/Player";
import { getProp } from "@/helpers/functions/Class";
import GameSummaryScore from "@/classes/GameSummaryScore";

class GameSummary {
    constructor(gameSummary = null) {
        this.rounds = getProp(gameSummary, "rounds", []);
        this.finalScores = getProp(gameSummary, "finalScores", [], finalScores => finalScores.map(finalScore => new GameSummaryScore(finalScore)));
        this.winners = {
            players: getProp(gameSummary, "winners.players", [], players => players.map(player => new Player(player))),
            teams: getProp(gameSummary, "winners.teams", []),
        };
    }

    get winningPlayers() {
        return this.winners.players?.length ? this.winners.players : undefined;
    }

    get winningTeams() {
        return this.winners.teams?.length ? this.winners.teams : undefined;
    }

    get winningTeam() {
        return this.winningTeams?.length ? this.winningTeams[0] : undefined;
    }

    get isTieBetweenTeams() {
        return this.winningTeams?.length > 1;
    }

    getRoundSummary(roundNumber) {
        return this.rounds.find(({ number }) => number === roundNumber);
    }

    getRoundTeamScore(roundNumber, team) {
        const summaryRound = this.getRoundSummary(roundNumber);
        return summaryRound?.getTeamScore(team);
    }

    getTeamFinalScore(team) {
        const teamFinalScore = this.finalScores.find(finalScore => finalScore.team === team);
        return teamFinalScore?.score;
    }

    getRoundWinningTeams(roundNumber) {
        const summaryRound = this.getRoundSummary(roundNumber);
        const highestScore = Math.max(...summaryRound.scores.map(({ score }) => score));
        return summaryRound.scores.reduce((acc, { score, team }) => score === highestScore ? [...acc, team] : acc, []);
    }
}

export default GameSummary;