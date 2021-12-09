import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import User from "@/classes/User";

export default {
    namespaced: true,
    state: { user: new User() },
    getters: {
        user(state) {
            return state.user;
        },
    },
    mutations: {
        setUser(state, user) {
            state.user = new User(user);
        },
        setIsLogged(state, isLogged) {
            state.user.isLogged = isLogged;
        },
        setAuthMode(state, authMode) {
            state.user.authMode = authMode;
        },
    },
    actions: {
        setUser({ commit }, user) {
            commit("setUser", user);
        },
        setIsLogged({ commit }, isLogged) {
            commit("setIsLogged", isLogged);
        },
        async checkUserAuthentication({ getters }) {
            const toast = useToast();
            const { t } = useI18n();
            const router = useRouter();
            if (!getters.isLogged) {
                toast.error(t("Error.unauthorized"));
                await router.push("/");
            }
            return getters.isLogged;
        },
    },
};