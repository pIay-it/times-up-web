<template>
    <div v-if="column === 'categories'">
        <CardCategoryPillBadge v-for="category of formattedValue" :key="category" :category="category" class="m-1"/>
    </div>
    <div v-else-if="column === 'difficulty'" class="text-center">
        <CardDifficultyPillBadge :difficulty="formattedValue"/>
    </div>
    <NotDefinedText v-else-if="column === `description`" :value="formattedValue"/>
    <div v-else-if="column === `imageURL`">
        <NotDefinedText v-if="!formattedValue" :value="formattedValue"/>
        <div v-else class="text-center">
            <CardImage :image-url="formattedValue"/>
        </div>
    </div>
    <div v-else-if="column === `actions`" class="d-flex justify-content-center">
        <DeleteCardButton :card="props.row" @card-deleted="emitCardDeleted"/>
    </div>
    <span v-else v-html="formattedValue"/>
</template>

<script>
import NotDefinedText from "@/components/shared/misc/NotDefinedText";
import DeleteCardButton from "@/components/CardsManagerPage/CardsManagerTable/CardsManagerTableCell/DeleteCardButton";
import Card from "@/classes/Card";
import CardDifficultyPillBadge from "@/components/shared/Card/Difficulty/CardDifficultyPillBadge";
import CardCategoryPillBadge from "@/components/shared/Card/Category/CardCategoryPillBadge";
import CardImage from "@/components/shared/Card/Image/CardImage";

export default {
    name: "CardsManagerTableCell",
    components: { CardImage, CardCategoryPillBadge, CardDifficultyPillBadge, DeleteCardButton, NotDefinedText },
    props: {
        props: {
            type: Object,
            required: true,
        },
    },
    emits: { "card-deleted": card => card instanceof Card },
    computed: {
        column() {
            return this.props.column.field;
        },
        formattedValue() {
            return this.props.formattedRow[this.column];
        },
    },
    methods: {
        emitCardDeleted(card) {
            this.$emit("card-deleted", card);
        },
    },
};
</script>