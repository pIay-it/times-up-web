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
        this.teams = getProp(game, "teams", [], teams => teams.map(team => ({
            name: getProp(team, "name"),
            color: getProp(team, "color"),
        })));
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

    get isCreated() {
        return !!this._id;
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
        return (this.round === 1 || this.lastPlay?.round !== this.round) && this.turn === 1;
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

    get firstTeam() {
        return this.teams.length ? this.teams[0] : null;
    }

    get secondTeam() {
        return this.teams.length ? this.teams[1] : null;
    }

    get lastRoundNumber() {
        return this.isPlaying ? this.round - 1 : this.round;
    }

    doesTeamHaveEnoughPlayers(team) {
        return this.getPlayersInTeam(team).length >= 2;
    }

    doesAllTeamsHaveEnoughPlayers() {
        return this.teams.every(({ name }) => this.doesTeamHaveEnoughPlayers(name));
    }

    getMissingPlayerCountInTeam(team) {
        return 2 - this.getPlayersInTeam(team).length;
    }

    getTeamWithName(teamName) {
        return this.teams.find(({ name }) => name === teamName);
    }

    getPlayerWithId(id) {
        return this.players?.find(({ _id }) => _id === id);
    }

    getPlayerWithName(playerName) {
        return this.players?.find(({ name }) => name === playerName);
    }

    getPlayersInTeam(teamName) {
        return this.players.filter(({ team }) => team === teamName);
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

    updatePlayerById(playerId, dataToUpdate) {
        const idx = this.players.findIndex(({ _id }) => _id === playerId);
        if (idx !== -1) {
            const playerToUpdate = this.players[idx];
            this.players.splice(idx, 1, new Player({ ...playerToUpdate, ...dataToUpdate }));
        }
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

    getRoundTurns(roundNumber) {
        return this.history.filter(({ round }) => roundNumber === round);
    }

    getRoundSummary(roundNumber) {
        return this.summary.getRoundSummary(roundNumber);
    }

    getRoundTeamScore(roundNumber, team) {
        return this.summary.getRoundTeamScore(roundNumber, team);
    }

    getRoundWinningTeams(roundNumber) {
        return this.summary.getRoundWinningTeams(roundNumber);
    }

    getTeamFinalScore(team) {
        const teamFinalScore = this?.summary?.getTeamFinalScore(team);
        return this?.isOver && teamFinalScore !== undefined ? teamFinalScore : undefined;
    }
}

export default Game;