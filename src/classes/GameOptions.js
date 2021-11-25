import { getCardCategories } from "@/helpers/functions/Card";
import { getProp } from "@/helpers/functions/Class";

class GameOptions {
    constructor(gameOptions = null) {
        this.players = { areTeamUp: getProp(gameOptions, "players.areTeamUp", true) };
        this.cards = {
            count: getProp(gameOptions, "cards.count", 40),
            categories: getProp(gameOptions, "cards.categories", getCardCategories()),
            difficulties: getProp(gameOptions, "cards.difficulties", [1, 2, 3]),
            helpers: { areDisplayed: getProp(gameOptions, "cards.helpers.areDisplayed", true) },
        };
        this.rounds = {
            count: getProp(gameOptions, "rounds.count", 3),
            turns: { timeLimit: getProp(gameOptions, "rounds.turns.timeLimit", 30) },
        };
    }

    get arePlayersTeamUp() {
        return this.players.areTeamUp;
    }

    get cardsCount() {
        return this.cards.count;
    }

    get cardsCategories() {
        return this.cards.categories;
    }

    get cardsDifficulties() {
        return this.cards.difficulties;
    }

    get areCardsHelpersDisplayed() {
        return this.cards.helpers.areDisplayed;
    }

    get roundsCount() {
        return this.rounds.count;
    }

    get roundsTurnsTimeLimit() {
        return this.rounds.turns.timeLimit;
    }
}

export default GameOptions;