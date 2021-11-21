import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";
import Config from "../../../config";

export function setupSentry(app, router) {
    Sentry.init({
        app,
        dsn: `https://${Config.sentry.key}@o1048234.ingest.sentry.io/${Config.sentry.projectId}`,
        integrations: [
            new Integrations.BrowserTracing({
                routingInstrumentation: Sentry.vueRouterInstrumentation(router),
                tracingOrigins: ["localhost", Config.app.baseURL, /^\//u],
            }),
        ],
        logErrors: true,
        tracesSampleRate: 1.0,
    });
}