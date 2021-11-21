import { addTrailingSlash } from "@/helpers/functions/String";

export default {
    app: { baseURL: addTrailingSlash(process.env.VUE_APP_BASE_URL) },
    sentry: {
        isEnabled: process.env.VUE_APP_IS_SENTRY_ENABLED === "true",
        projectId: process.env.VUE_APP_SENTRY_PROJECT_ID,
        key: process.env.VUE_APP_SENTRY_KEY,
    },
};