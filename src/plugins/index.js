import VueCountdown from "@chenfengyuan/vue-countdown";
import VueRouter from "./vue-router";
import "./bootstrap";
import { setupSentry } from "./sentry";
import Vuei18n from "./vue-i18n";
import VueToggleButton from "vue-js-toggle-button";
import { setupVueMeta } from "@/plugins/vue-meta";
import { setupVueToastification } from "./vue-toastification";
import TimesUpAPI from "./APIs/TimesUpAPI";
import Config from "../../config";

export function usePlugins(app) {
    if (Config.sentry.isEnabled) {
        setupSentry(app, VueRouter);
    }
    app.use(VueRouter);
    app.use(Vuei18n);
    app.use(VueToggleButton);
    setupVueMeta(app);
    setupVueToastification(app);
    app.use(TimesUpAPI);
    app.component(VueCountdown.name, VueCountdown);
}