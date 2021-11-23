import VueCountdown from "@chenfengyuan/vue-countdown";
import VueRouter from "./vue-router";
import "./bootstrap";
import { setupSentry } from "./sentry";
import VueGoodTablePlugin from "vue-good-table-next";
import Vuei18n from "./vue-i18n";
import VSelect from "vue-select";
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
    app.use(VueGoodTablePlugin);
    app.use(Vuei18n);
    app.use(VueToggleButton);
    setupVueMeta(app);
    setupVueToastification(app);
    app.use(TimesUpAPI);
    app.component(VueCountdown.name, VueCountdown);
    app.component("VSelect", VSelect);
}