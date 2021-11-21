import Player from "@/classes/Player";
import Card from "@/classes/Card";
import GameQueue from "@/classes/GameQueue";
import GameHistory from "@/classes/GameHistory";
import GameSummary from "@/classes/GameSummary";
import GameOptions from "@/classes/GameOptions";
import { getProp } from "@/helpers/functions/Class";

class Game {
    constructor(game = null) {
        this._id = getProp(game, "_id");
        this.players = getProp(game, "players", [], players => players.map(player => new Player(player)));
        this.cards = getProp(game, "cards", [], cards => cards.map(card => new Card(card)));
        this.status = getProp(game, "status");
        this.round = getProp(game, "round");
        this.turn = getProp(game, "turn");
        this.speaker = getProp(game, "speaker", new Player(), player => new Player(player));
        this.guesser = getProp(game, "guesser", new Player(), player => new Player(player));
        this.queue = getProp(game, "queue", [], queueEntries => queueEntries.map(entry => new GameQueue(entry)));
        this.history = getProp(game, "history", [], historyEntries => historyEntries.map(entry => new GameHistory(entry)));
        this.summary = getProp(game, "summary", new GameSummary(), summary => new GameSummary(summary));
        this.options = getProp(game, "options", new GameOptions(), options => new GameOptions(options));
        this.createdAt = getProp(game, "createdAt", new Date(), createdAt => new Date(createdAt));
        this.updatedAt = getProp(game, "updatedAt", new Date(), updatedAt => new Date(updatedAt));
    }

    get playerTeams() {
        if (!this.players || !this.players.length) {
            return undefined;
        }
        return this.players.reduce((acc, { team }) => !acc.includes(team) ? [...acc, team] : acc, []);
    }

    get currentToGuessCard() {
        return this.cards?.length ? this.cards[0] : undefined;
    }

    get nextToGuessCard() {
        return this.cards?.find(({ isToGuess }) => isToGuess);
    }

    get isTurnOver() {
        return !this.nextToGuessCard;
    }

    get isPreparing() {
        return this.status === "preparing";
    }

    get isPlaying() {
        return this.status === "playing";
    }

    get isCanceled() {
        return this.status === "canceled";
    }

    get isOver() {
        return this.status === "over";
    }

    get nextSpeaker() {
        return this.queue?.length && this.queue[0].players.length ? this.queue[0].players[0] : undefined;
    }

    get isStarting() {
        return this.isPlaying && this.round === 1 && this.turn === 1;
    }

    get lastPlay() {
        return this.history?.length ? this.history[0] : undefined;
    }

    get isNewRound() {
        return this.lastPlay?.round !== this.round;
    }

    get winningPlayers() {
        return this.isOver && this.summary.winningPlayers ? this.summary.winningPlayers : undefined;
    }

    get winningTeams() {
        return this.isOver && this.summary.winningTeams ? this.summary.winningTeams : undefined;
    }

    get winningTeam() {
        return this.isOver && this.summary.winningTeam ? this.summary.winningTeam : undefined;
    }

    get isTieBetweenTeams() {
        return this.isOver && this.summary.isTieBetweenTeams;
    }

    getPlayerWithId(id) {
        return this.players?.find(({ _id }) => id === _id);
    }

    getCardWithId(id) {
        return this.cards?.find(({ _id }) => id === _id);
    }

    getRoundTeamScore(roundNumber, team) {
        return this.summary.getRoundTeamScore(roundNumber, team);
    }

    getTeamFinalScore(team) {
        const teamFinalScore = this.summary.getTeamFinalScore(team);
        return this.isOver && teamFinalScore !== undefined ? teamFinalScore : undefined;
    }
}

export default Game;