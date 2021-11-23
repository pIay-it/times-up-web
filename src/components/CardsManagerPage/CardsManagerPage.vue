<template>
    <div id="cards-manager-page">
        <transition mode="out-in" name="fade">
            <DefaultLoader v-if="isFetchingCards" key="fetching-cards" class="h-100" :text="$t('CardsManagerPage.fetchingCards')"/>
            <div v-else-if="cards" key="cards-manager" class="h-100">
                <h2 class="d-flex align-items-center justify-content-center">
                    <i class="fa fa-address-card text-info me-2"/>
                    <span v-html="$t('CardsManagerPage.cardsManager')"/>
                </h2>
                <hr/>
                <VueGoodTable :columns="columns" :rows="cards">
                    <template #table-actions>
                        <button type="button" class="btn btn-primary me-2" @click.prevent="showCardsManagerModal">
                            <i class="fa fa-plus-circle me-2"/>
                            <span v-html="$t('CardsManagerPage.addCard')"/>
                        </button>
                    </template>
                    <template #emptystate>
                        <div class="d-flex justify-content-center align-items-center">
                            <i class="fa fa-address-card me-2"/>
                            <span v-html="$t('CardsManagerPage.noCardsYet')"/>
                        </div>
                    </template>
                </VueGoodTable>
            </div>
            <APIError v-else key="cards" class="h-100" @retry="fetchCards"/>
        </transition>
        <CardsManagerModal ref="cardsManagerPage"/>
    </div>
</template>

<script>
import DefaultLoader from "@/components/shared/Loader/DefaultLoader";
import APIError from "@/components/shared/Error/APIError";
import CardsManagerModal from "@/components/CardsManagerPage/CardsManagerModal";
import useErrorManager from "@/composables/Error/useErrorManager";
import Card from "@/classes/Card";

export default {
    name: "CardsManagerPage",
    components: { CardsManagerModal, APIError, DefaultLoader },
    setup() {
        const { displayError } = useErrorManager();
        return { displayError };
    },
    data() {
        return {
            cards: undefined,
            isFetchingCards: true,
        };
    },
    computed: {
        columns() {
            return [
                {
                    label: this.$t("CardsManagerPage.label"),
                    field: "label",
                }, {
                    label: this.$t("CardsManagerPage.categories"),
                    sortable: false,
                    field: "categories",
                }, {
                    label: this.$t("CardsManagerPage.difficulty"),
                    field: "difficulty",
                }, {
                    label: this.$t("CardsManagerPage.description"),
                    sortable: false,
                    field: "description",
                }, {
                    label: this.$t("CardsManagerPage.imageURL"),
                    sortable: false,
                    field: "imageURL",
                }, {
                    label: this.$t("CardsManagerPage.actions"),
                    sortable: false,
                    field: "actions",
                },
            ];
        },
    },
    async created() {
        await this.fetchCards();
    },
    methods: {
        async fetchCards() {
            try {
                this.isFetchingCards = true;
                const { data: cards } = await this.$timesUpAPI.getCards();
                this.cards = cards.map(card => new Card(card));
            } catch (err) {
                this.displayError(err);
            } finally {
                this.isFetchingCards = false;
            }
        },
        showCardsManagerModal() {
            this.$refs.cardsManagerPage.show();
        },
    },
};
</script>