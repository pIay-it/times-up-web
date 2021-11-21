import { createI18n } from "vue-i18n";

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
    locale: process.env.VUE_APP_I18N_LOCALE || "fr",
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "fr",
    globalInjection: true,
    messages: loadLocaleMessages(),
});