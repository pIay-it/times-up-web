import { getProp } from "@/helpers/functions/Class";

class User {
    constructor(user = null) {
        this._id = getProp(user, "_id");
        this.authMode = getProp(user, "authMode");
        this.isLogged = getProp(user, "isLogged");
    }
}

export default User;