import { decode as decodeJWT } from "jsonwebtoken";

export default function useUserAuth() {
    function checkTokenAndAuth() {
        const localStorageTokenKey = "times-up-jwt";
        const JWT = localStorage.getItem(localStorageTokenKey);
        if (JWT) {
            const decodedJWT = decodeJWT(JWT);
            if (decodedJWT) {
                localStorage.setItem(localStorageTokenKey, JWT);
                this.$timesUpAPI.setJSONWebToken(JWT);
                this.$store.dispatch("user/setIsLogged", true);
            }
        }
        this.$store.dispatch("user/setIsLogged", false);
    }

    return { checkTokenAndAuth };
}