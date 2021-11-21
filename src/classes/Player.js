import { getProp } from "@/helpers/functions/Class";

class Player {
    constructor(player = null) {
        this._id = getProp(player, "_id");
        this.name = getProp(player, "name");
        this.team = getProp(player, "team");
        this.createdAt = getProp(player, "createdAt", new Date(), createdAt => new Date(createdAt));
        this.updatedAt = getProp(player, "updatedAt", new Date(), updatedAt => new Date(updatedAt));
    }
}

export default Player;