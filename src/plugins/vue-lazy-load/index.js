import VueLazyLoad from "vue3-lazyload";
import loading from "@/assets/gif/image-loader.gif";
import error from "@/assets/png/image-not-found.png";

export function setupVueLazyload(app) {
    app.use(VueLazyLoad, {
        loading,
        error,
    });
}