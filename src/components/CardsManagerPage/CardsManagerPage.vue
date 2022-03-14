<template>
    <div id="cards-manager-page">
        <transition mode="out-in" name="fade">
            <DefaultLoader v-if="isFetchingCards" key="fetching-cards" class="h-100" :text="$t('CardsManagerPage.fetchingCards')"/>
            <div v-else-if="cards" id="cards-manager" key="cards-manager">
                <h2 class="d-flex align-items-center justify-content-center nuevo-litho-font">
                    <i class="fa fa-address-card me-2"/>
                    <span v-html="$t('CardsManagerPage.cardsManager')"/>
                </h2>
                <hr/>
                <CardsManagerTable :cards="cards" @show-cards-manager-modal="showCardsManagerModal" @card-deleted="deleteCard"/>
                <CardsManagerModal ref="cardsManagerPage" :cards="cards" @card-created="addCard" @card-updated="updateCard"/>
            </div>
            <APIError v-else key="cards" class="h-100" @retry="fetchCards"/>
        </transition>
        <div class="text-center py-3">
            <BackButton to="/"/>
        </div>
    </div>
</template>

<script>
import DefaultLoader from "@/components/shared/Loader/DefaultLoader";
import APIError from "@/components/shared/Error/APIError";
import CardsManagerModal from "@/components/CardsManagerPage/CardsManagerModal/CardsManagerModal";
import CardsManagerTable from "@/components/CardsManagerPage/CardsManagerTable/CardsManagerTable";
import useError from "@/composables/Error/useError";
import Card from "@/classes/Card";
import BackButton from "@/components/shared/Button/BackButton";

export default {
    name: "CardsManagerPage",
    components: { BackButton, CardsManagerTable, CardsManagerModal, APIError, DefaultLoader },
    setup() {
        const { displayError } = useError();
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

<style>
    #cards-manager {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        text-shadow: none;
    }
</style>