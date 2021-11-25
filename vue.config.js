const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,

    pluginOptions: {
        i18n: {
            locale: "fr",
            fallbackLocale: "fr",
            localeDir: "locales",
            enableLegacy: false,
            runtimeOnly: false,
            compositionOnly: false,
            fullInstall: true,
        },
    },
});