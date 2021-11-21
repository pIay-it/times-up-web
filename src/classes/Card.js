import { getProp } from "@/helpers/functions/Class";

class Card {
    constructor(card = null) {
        this._id = getProp(card, "_id");
        this.label = getProp(card, "label");
        this.status = getProp(card, "status");
        this.categories = getProp(card, "categories", []);
        this.difficulty = getProp(card, "difficulty");
        this.timeToGuess = getProp(card, "timeToGuess");
        this.description = getProp(card, "description");
        this.imageURL = getProp(card, "imageURL");
        this.createdAt = getProp(card, "createdAt", new Date(), createdAt => new Date(createdAt));
        this.updatedAt = getProp(card, "updatedAt", new Date(), updatedAt => new Date(updatedAt));
    }

    get isToGuess() {
        return this.status === "to-guess";
    }

    get isDiscarded() {
        return this.status === "discarded";
    }

    get isSkipped() {
        return this.status === "skipped";
    }

    get isGuessed() {
        return this.status === "guessed";
    }
}

export default Card;