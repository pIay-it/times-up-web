<template>
    <button id="cards-manager-modal-reset-button" v-tooltip="resetButtonTooltipText" type="button"
            class="btn btn-outline-secondary btn-sm" v-html="resetButtonText"/>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
    mode: {
        type: String,
        required: true,
    },
});

const { t } = useI18n();

const resetButtonText = computed(() => {
    if (props.mode === "create") {
        return t("CardsManagerModalResetButton.clearFormValues");
    }
    return t("CardsManagerModalResetButton.restoreFormValues");
});
const resetButtonTooltipText = computed(() => {
    if (props.mode === "create") {
        return t("CardsManagerModalResetButton.eraseAllFormValues");
    }
    return t("CardsManagerModalResetButton.restoreFormValuesFromCard");
});
</script>