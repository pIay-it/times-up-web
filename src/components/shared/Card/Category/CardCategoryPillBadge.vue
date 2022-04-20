<template>
    <div id="card-category-pill-badge" v-tooltip="badgeTooltipText"
         class="card-category-pill-badge badge rounded-pill bg-light small-shadow cursor-default" :class="badgeClasses">
        <div class="d-flex">
            <CardCategoryIcon :category="category" class="me-1"/>
            <span class="text-dark" v-html="badgeText"/>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useI18n } from "vue-i18n";
import CardCategoryIcon from "@/components/shared/Card/Category/CardCategoryIcon";

const props = defineProps({
    category: {
        type: String,
        required: true,
    },
});

const { t } = useI18n();

const badgeClasses = computed(() => ({ [`${props.category}-card-category-border-color`]: true }));
const badgeText = computed(() => t(`CardCategory.${props.category}.label`));
const badgeTooltipText = computed(() => t(`CardCategory.${props.category}.description`));
</script>

<style lang="scss" scoped>
    .card-category-pill-badge {
        border: 1px solid transparent;
    }
</style>