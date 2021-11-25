<template>
    <VueGoodTable id="cards-manager-table" :columns="columns" :rows="cards" :line-numbers="true"
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

<script>
import Fuse from "fuse.js";
import Card from "@/classes/Card";
import CardsManagerTableCell from "@/components/CardsManagerPage/CardsManagerTable/CardsManagerTableCell/CardsManagerTableCell";

export default {
    name: "CardsManagerTable",
    components: { CardsManagerTableCell },
    props: {
        cards: {
            type: Array,
            required: true,
            validator: cards => cards.every(card => card instanceof Card),
        },
    },
    emits: {
        "show-cards-manager-modal": () => true,
        "card-deleted": card => card instanceof Card,
    },
    computed: {
        columns() {
            return [
                {
                    label: this.$t("CardsManagerTable.label"),
                    field: "label",
                }, {
                    label: this.$t("CardsManagerTable.categories"),
                    sortable: false,
                    field: "categories",
                }, {
                    label: this.$t("CardsManagerTable.difficulty"),
                    field: "difficulty",
                }, {
                    label: this.$t("CardsManagerTable.description"),
                    sortable: false,
                    field: "description",
                }, {
                    label: this.$t("CardsManagerTable.imageURL"),
                    sortable: false,
                    field: "imageURL",
                }, {
                    label: this.$t("CardsManagerTable.actions"),
                    sortable: false,
                    field: "actions",
                },
            ];
        },
        paginationOptions() {
            return {
                enabled: true,
                perPageDropdown: [5, 10, 50, 100, 500],
                prevLabel: this.$t("VueGoodTable.prev"),
                nextLabel: this.$t("VueGoodTable.next"),
                allLabel: this.$t("VueGoodTable.all"),
                ofLabel: this.$t("VueGoodTable.of"),
                rowsPerPageLabel: this.$t("CardsManagerTable.cardsPerPage"),
                infoFn: params => this.$t("CardsManagerTable.pageOfWithTotalCards", params),
            };
        },
        searchOptions() {
            return {
                enabled: true,
                placeholder: this.$t("CardsManagerTable.searchForCards"),
                searchFn: this.searchForCards,
            };
        },
        sortOptions() {
            return {
                enabled: true,
                initialSortBy: { field: "label", type: "asc" },
            };
        },
    },
    methods: {
        emitShowCardsManagerModal(card) {
            this.$emit("show-cards-manager-modal", card);
        },
        emitCardDeleted(card) {
            this.$emit("card-deleted", card);
        },
        searchForCards(row, col, cellValue, searchTerm) {
            if (col.field === "label") {
                const fuse = new Fuse([cellValue], {
                    threshold: 0.3,
                    shouldSort: false,
                });
                const result = fuse.search(searchTerm);
                return !!result.length;
            }
            return false;
        },
    },
};
</script>