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
    <div v-else-if="column === `createdAt`" v-html="getFormattedDate(formattedValue)"/>
    <div v-else-if="column === `actions`" class="d-flex justify-content-center">
        <button v-tooltip="$t('CardsManagerTableCell.updateCard')" type="button" class="btn btn-sm btn-warning me-1 text-white"
                @click.prevent="emitShowCardsManagerModal">
            <i class="fa fa-pen mx-1"/>
        </button>
        <DeleteCardButton :card="props.props.row" @card-deleted="emitCardDeleted"/>
    </div>
    <span v-else v-html="formattedValue"/>
</template>

<script setup>
import { computed, defineEmits, defineProps } from "vue";
import NotDefinedText from "@/components/shared/misc/NotDefinedText";
import DeleteCardButton from "@/components/CardsManagerPage/CardsManagerTable/CardsManagerTableCell/DeleteCardButton";
import CardDifficultyPillBadge from "@/components/shared/Card/Difficulty/CardDifficultyPillBadge";
import CardCategoryPillBadge from "@/components/shared/Card/Category/CardCategoryPillBadge";
import CardImage from "@/components/shared/Card/Image/CardImage";
import Card from "@/classes/Card";
import { getFormattedDate } from "@/helpers/functions/Date";

const props = defineProps({
    props: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits({
    "show-cards-manager-modal": card => card instanceof Card,
    "card-deleted": card => card instanceof Card,
});

const column = computed(() => props.props.column.field);
const formattedValue = computed(() => props.props.formattedRow[column.value]);

const emitShowCardsManagerModal = () => {
    emit("show-cards-manager-modal", new Card(props.props.row));
};
const emitCardDeleted = card => emit("card-deleted", card);
</script>