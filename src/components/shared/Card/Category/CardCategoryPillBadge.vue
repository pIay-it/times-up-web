<template>
    <div id="card-category-pill-badge" class="card-category-pill-badge badge rounded-pill bg-light small-shadow" :class="badgeClasses">
        <div class="d-flex">
            <CardCategoryIcon :category="category" class="me-1"/>
            <span class="text-dark" v-html="badgeText"/>
        </div>
    </div>
</template>

<script>
import CardCategoryIcon from "@/components/shared/Card/Category/CardCategoryIcon";

export default {
    name: "CardCategoryPillBadge",
    components: { CardCategoryIcon },
    props: {
        category: {
            type: String,
            required: true,
        },
    },
    computed: {
        badgeClasses() {
            return { [`${this.category}-card-category-border-color`]: true };
        },
        badgeText() {
            return this.$t(`CardCategory.${this.category}`);
        },
    },
};
</script>

<style lang="scss" scoped>
    .card-category-pill-badge {
        border: 1px solid transparent;
    }
</style>