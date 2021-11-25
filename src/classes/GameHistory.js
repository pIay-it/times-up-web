import Player from "@/classes/Player";
import Card from "@/classes/Card";
import { getProp } from "@/helpers/functions/Class";

class GameHistory {
    constructor(gameHistory = null) {
        this._id = getProp(gameHistory, "_id");
        this.speaker = getProp(gameHistory, "speaker", new Player(), player => new Player(player));
        this.guesser = getProp(gameHistory, "guesser", new Player(), player => new Player(player));
        this.round = getProp(gameHistory, "round");
        this.turn = getProp(gameHistory, "turn");
        this.cards = getProp(gameHistory, "cards", new Card(), cards => cards.map(card => new Card(card)));
        this.score = getProp(gameHistory, "score");
        this.createdAt = getProp(gameHistory, "createdAt", new Date(), createdAt => new Date(createdAt));
        this.updatedAt = getProp(gameHistory, "updatedAt", new Date(), updatedAt => new Date(updatedAt));
    }
}

export default GameHistory;