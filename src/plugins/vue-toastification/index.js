import Toast, { useToast } from "vue-toastification";

export default {
    install: app => {
        app.use(Toast, {
            position: "bottom-right",
            timeout: 3000,
        });
        app.config.globalProperties.$toast = useToast();
    },
};