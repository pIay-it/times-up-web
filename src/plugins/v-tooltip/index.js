import VTooltipPlugin from "v-tooltip";

export function setupVTooltip(app) {
    app.use(VTooltipPlugin, {
        themes: {
            "tooltip": { delay: { show: 0 } },
            "card-helper-tooltip": {
                $extend: "tooltip",
                delay: { show: 0, hide: 0 },
            },
        },
    });
}