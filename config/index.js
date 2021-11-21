import { addTrailingSlash } from "@/helpers/functions/String";

export default {
    app: {
        baseURL: addTrailingSlash(process.env.VUE_APP_BASE_URL),
        i18n: {
            locale: process.env.VUE_APP_I18N_LOCALE || "fr",
            fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "fr",
        },
    },
    API: {
        timesUp: {
            baseURL: process.env.VUE_APP_TIMES_UP_API_BASE_URL,
            basicAuth: {
                username: process.env.VUE_APP_BASIC_AUTH_USERNAME,
                password: process.env.VUE_APP_BASIC_AUTH_PASSWORD,
            },
        },
    },
    sentry: {
        isEnabled: process.env.VUE_APP_IS_SENTRY_ENABLED === "true",
        projectId: process.env.VUE_APP_SENTRY_PROJECT_ID,
        key: process.env.VUE_APP_SENTRY_KEY,
    },
};