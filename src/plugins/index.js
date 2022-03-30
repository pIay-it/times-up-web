import VueCountdown from "@chenfengyuan/vue-countdown";
import VueFormToggleButton from "@vueform/toggle";
import VueRouter from "./vue-router";
import "./bootstrap";
import { setupSentry } from "./sentry";
import VueGoodTablePlugin from "vue-good-table-next";
import VueEllipseProgress from "vue-ellipse-progress";
import Vuei18n from "./vue-i18n";
import VSelect from "vue-select";
import { setupVeeValidate } from "./vee-validate";
import { setupVTooltip } from "@/plugins/v-tooltip";
import { setupVueMeta } from "@/plugins/vue-meta";
import { setupVueLazyload } from "./vue-lazy-load";
import VueToastification from "./vue-toastification";
import "./yup";
import TimesUpAPI from "./APIs/TimesUpAPI";
import Config from "../../config";

export function usePlugins(app) {
    if (Config.sentry.isEnabled) {
        setupSentry(app, VueRouter);
    }

    app.use(VueRouter);
    app.use(VueGoodTablePlugin);
    app.use(VueEllipseProgress);
    app.use(Vuei18n);
    setupVeeValidate(app);
    setupVTooltip(app);
    setupVueMeta(app);
    setupVueLazyload(app);
    app.use(VueToastification);
    app.use(TimesUpAPI);

    app.component("VueFormToggleButton", VueFormToggleButton);
    app.component(VueCountdown.name, VueCountdown);
    app.component("VSelect", VSelect);
}