import { createI18n } from "vue-i18n";
import Config from "../../../config";

function loadLocaleMessages() {
    const locales = require.context("../../locales", true, /[A-Za-z0-9-_,\s]+\.json$/ui);
    const messages = {};
    locales.keys().forEach(key => {
        const matched = key.match(/(?<locale>[A-Za-z0-9-_]+)\./ui);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key).default;
        }
    });
    return messages;
}

export default createI18n({
    legacy: false,
    ...Config.app.i18n,
    globalInjection: true,
    messages: loadLocaleMessages(),
});