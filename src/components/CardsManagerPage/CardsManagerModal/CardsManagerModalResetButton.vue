<template>
    <button id="cards-manager-modal-reset-button" v-tooltip="resetButtonTooltipText" type="button"
            class="btn btn-outline-secondary btn-sm" v-html="resetButtonText"/>
</template>

<script>
export default {
    name: "CardsManagerModalResetButton",
    props: {
        mode: {
            type: String,
            required: true,
        },
    },
    computed: {
        resetButtonText() {
            if (this.mode === "create") {
                return this.$t("CardsManagerModalResetButton.clearFormValues");
            }
            return this.$t("CardsManagerModalResetButton.restoreFormValues");
        },
        resetButtonTooltipText() {
            if (this.mode === "create") {
                return this.$t("CardsManagerModalResetButton.eraseAllFormValues");
            }
            return this.$t("CardsManagerModalResetButton.restoreFormValuesFromCard");
        },
    },
};
</script>