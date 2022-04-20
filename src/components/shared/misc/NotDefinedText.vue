<template>
    <span :class="textClasses">
        {{ text }}
    </span>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
    value: {
        type: undefined,
        required: true,
    },
});

const { t } = useI18n();

const text = computed(() => props.value ? props.value : t("NotDefinedText.notDefined"));
const textClasses = computed(() => ({ "fst-italic text-muted": !props.value }));
</script>