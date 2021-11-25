<template>
    <div id="cards-manager-page">
        <transition mode="out-in" name="fade">
            <DefaultLoader v-if="isFetchingCards" key="fetching-cards" class="h-100" :text="$t('CardsManagerPage.fetchingCards')"/>
            <div v-else-if="cards" key="cards-manager" class="h-100">
                <h2 class="d-flex align-items-center justify-content-center">
                    <i class="fa fa-address-card text-primary me-2"/>
                    <span v-html="$t('CardsManagerPage.cardsManager')"/>
                </h2>
                <hr/>
                <CardsManagerTable :cards="cards" @show-cards-manager-modal="showCardsManagerModal" @card-deleted="deleteCard"/>
            </div>
            <APIError v-else key="cards" class="h-100" @retry="fetchCards"/>
        </transition>
        <CardsManagerModal ref="cardsManagerPage" @card-created="addCard" @card-updated="updateCard"/>
    </div>
</template>

<script>
import DefaultLoader from "@/components/shared/Loader/DefaultLoader";
import APIError from "@/components/shared/Error/APIError";
import CardsManagerModal from "@/components/CardsManagerPage/CardsManagerModal";
import CardsManagerTable from "@/components/CardsManagerPage/CardsManagerTable/CardsManagerTable";
import useErrorManager from "@/composables/Error/useErrorManager";
import Card from "@/classes/Card";

export default {
    name: "CardsManagerPage",
    components: { CardsManagerTable, CardsManagerModal, APIError, DefaultLoader },
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
        showCardsManagerModal(card) {
            this.$refs.cardsManagerPage.show(card);
        },
        addCard(newCard) {
            this.cards.push(newCard);
        },
        updateCard(card) {
            const cardIndex = this.cards.findIndex(({ _id }) => _id === card._id);
            if (cardIndex !== -1) {
                this.cards.splice(cardIndex, 1, new Card(card));
            }
        },
        deleteCard(card) {
            const cardIndex = this.cards.findIndex(({ _id }) => _id === card._id);
            if (cardIndex !== -1) {
                this.cards.splice(cardIndex, 1);
            }
        },
    },
};
</script>