import { createMetaManager } from "vue-meta";

export function setupVueMeta(app) {
    const metaManager = createMetaManager();
    app.use(metaManager);
}