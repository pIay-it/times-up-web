<template>
    <VueGoodTable id="cards-manager-table" :columns="columns" :rows="cards" line-numbers
                  :pagination-options="paginationOptions" :search-options="searchOptions" :sort-options="sortOptions">
        <template #table-actions>
            <button type="button" class="btn btn-primary me-2" @click.prevent="emitShowCardsManagerModal(null)">
                <i class="fa fa-plus-circle me-2"/>
                <span v-html="$t('CardsManagerTable.addCard')"/>
            </button>
        </template>
        <template #emptystate>
            <div class="d-flex justify-content-center align-items-center">
                <i class="fa fa-address-card me-2"/>
                <span v-html="$t('CardsManagerTable.noCardsToDisplay')"/>
            </div>
        </template>
        <template #table-row="props">
            <CardsManagerTableCell :props="props" @show-cards-manager-modal="emitShowCardsManagerModal" @card-deleted="emitCardDeleted"/>
        </template>
    </VueGoodTable>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";
import { useI18n } from "vue-i18n";
import Fuse from "fuse.js";
import CardsManagerTableCell from "@/components/CardsManagerPage/CardsManagerTable/CardsManagerTableCell/CardsManagerTableCell";
import Card from "@/classes/Card";

defineProps({
    cards: {
        type: Array,
        required: true,
        validator: cards => cards.every(card => card instanceof Card),
    },
});

const emit = defineEmits({
    "show-cards-manager-modal": card => card === null || card instanceof Card,
    "card-deleted": card => card instanceof Card,
});

const { t } = useI18n();

const columns = [
    {
        label: t("CardsManagerTable.label"),
        field: "label",
    }, {
        label: t("CardsManagerTable.categories"),
        sortable: false,
        field: "categories",
    }, {
        label: t("CardsManagerTable.difficulty"),
        field: "difficulty",
    }, {
        label: t("CardsManagerTable.description"),
        sortable: false,
        field: "description",
    }, {
        label: t("CardsManagerTable.imageURL"),
        sortable: false,
        field: "imageURL",
    }, {
        label: t("CardsManagerTable.createdAt"),
        field: "createdAt",
    }, {
        label: t("CardsManagerTable.actions"),
        sortable: false,
        field: "actions",
    },
];
const paginationOptions = {
    enabled: true,
    perPageDropdown: [5, 10, 50, 100, 500],
    prevLabel: t("VueGoodTable.prev"),
    nextLabel: t("VueGoodTable.next"),
    allLabel: t("VueGoodTable.all"),
    ofLabel: t("VueGoodTable.of"),
    rowsPerPageLabel: t("CardsManagerTable.cardsPerPage"),
    infoFn: params => t("CardsManagerTable.pageOfWithTotalCards", params),
};
const searchForCards = (row, col, cellValue, searchTerm) => {
    if (col.field === "label") {
        const fuse = new Fuse([cellValue], {
            threshold: 0.3,
            shouldSort: false,
        });
        const result = fuse.search(searchTerm);
        return !!result.length;
    }
    return false;
};
const searchOptions = {
    enabled: true,
    placeholder: t("CardsManagerTable.searchForCards"),
    searchFn: searchForCards,
};
const sortOptions = {
    enabled: true,
    initialSortBy: { field: "createdAt", type: "desc" },
};

const emitShowCardsManagerModal = card => emit("show-cards-manager-modal", card);
const emitCardDeleted = card => emit("card-deleted", card);
</script>