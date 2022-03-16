import Player from "@/classes/Player";
import Card from "@/classes/Card";
import GameQueue from "@/classes/GameQueue";
import GameHistory from "@/classes/GameHistory";
import GameSummary from "@/classes/GameSummary";
import GameOptions from "@/classes/GameOptions";
import { getProp } from "@/helpers/functions/Class";
import { filterOutHTMLTags } from "@/helpers/functions/String";

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

    get hasPlayers() {
        return !!this.players?.length;
    }

    get playerTeams() {
        if (!this.players || !this.players.length) {
            return undefined;
        }
        return this.players.reduce((acc, { team }) => !acc.includes(team) ? [...acc, team] : acc, []);
    }

    get isMaxPlayerReached() {
        return this.players.length >= 20;
    }

    get canStart() {
        return this.players.length >= 4;
    }

    get currentToGuessCard() {
        return this.cards?.find(({ isToGuess }) => isToGuess);
    }

    get roundsTurnsTimeLimit() {
        return this.options.roundsTurnsTimeLimit;
    }

    get isTurnOver() {
        return !this.currentToGuessCard;
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

    get canSkipCard() {
        return this.round !== 1;
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
        return this.players?.find(({ _id }) => _id === id);
    }

    getPlayerWithName(playerName) {
        return this.players?.find(({ name }) => name === playerName);
    }

    isPlayerNameTaken(playerName) {
        playerName = filterOutHTMLTags(playerName).trim();
        return !!this.getPlayerWithName(playerName);
    }

    canAddPlayerWithName(playerName) {
        return !this.isMaxPlayerReached && !this.isPlayerNameTaken(playerName);
    }

    addPlayer(player) {
        if (player.name) {
            player.name = filterOutHTMLTags(player.name).trim();
        }
        this.players.push(new Player(player));
    }

    removePlayerByName(playerName) {
        const idx = this.players.findIndex(({ name }) => name === playerName);
        if (idx !== -1) {
            this.players.splice(idx, 1);
        }
    }

    removeAllPlayers() {
        this.players = [];
    }

    getCardById(id) {
        return this.cards?.find(({ _id }) => id === _id);
    }

    updateCardById(cardId, dataToUpdate) {
        const idx = this.cards.findIndex(({ _id }) => _id === cardId);
        if (idx !== -1) {
            const cardToUpdate = this.cards[idx];
            this.cards.splice(idx, 1, new Card({ ...cardToUpdate, ...dataToUpdate }));
        }
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