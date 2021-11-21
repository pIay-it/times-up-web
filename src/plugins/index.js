import VueCountdown from "@chenfengyuan/vue-countdown";
import VueRouter from "./vue-router";
import "./bootstrap";
import { setupSentry } from "./sentry";
import Vuei18n from "./vue-i18n";
import VueToggleButton from "vue-js-toggle-button";
import { setupVueToastification } from "./vue-toastification";
import Config from "../../config";

export function usePlugins(app) {
    if (Config.sentry.isEnabled) {
        setupSentry(app, VueRouter);
    }
    app.use(VueRouter);
    app.use(Vuei18n);
    app.use(VueToggleButton);
    setupVueToastification(app);
    app.component(VueCountdown.name, VueCountdown);
}