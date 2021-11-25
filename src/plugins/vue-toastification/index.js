import Toast from "vue-toastification";

export function setupVueToastification(app) {
    app.use(Toast, {
        position: "bottom-right",
        timeout: 3000,
    });
}