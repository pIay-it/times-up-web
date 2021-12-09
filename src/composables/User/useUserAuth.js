import { inject } from "vue";
import { useStore } from "vuex";

export default function useUserAuth() {
    const store = useStore();
    const timesUpAPI = inject("timesUpAPI");
    const localStorageUserTokenKey = "times-up-jwt";

    function getJWT() {
        return localStorage.getItem(localStorageUserTokenKey);
    }

    async function checkUserAuthentication() {
        let JWT = getJWT();
        if (!JWT) {
            const { data } = await timesUpAPI.registerAnonymously();
            JWT = data.token;
            localStorage.setItem(localStorageUserTokenKey, JWT);
        }
        timesUpAPI.setJSONWebToken(JWT);
        await store.dispatch("user/setIsLogged", true);
    }

    return { checkUserAuthentication };
}