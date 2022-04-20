<template>
    <div id="cards-manager-page">
        <Transition mode="out-in" name="fade">
            <DefaultLoader v-if="isFetchingCards" key="fetching-cards" class="h-100" :text="$t('CardsManagerPage.fetchingCards')"/>
            <div v-else-if="cards" id="cards-manager" key="cards-manager">
                <h2 class="d-flex align-items-center justify-content-center nuevo-litho-font">
                    <i class="fa fa-address-card me-2"/>
                    <span v-html="$t('CardsManagerPage.cardsManager')"/>
                </h2>
                <hr/>
                <CardsManagerTable :cards="cards" @show-cards-manager-modal="showCardsManagerModal" @card-deleted="deleteCard"/>
                <CardsManagerModal ref="cardsManagerModal" :cards="cards" @card-created="addCard" @card-updated="updateCard"/>
            </div>
            <APIError v-else key="cards" class="h-100" @retry="fetchCards"/>
        </Transition>
        <div class="text-center py-3">
            <BackButton to="/"/>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import DefaultLoader from "@/components/shared/Loader/DefaultLoader";
import APIError from "@/components/shared/Error/APIError";
import CardsManagerModal from "@/components/CardsManagerPage/CardsManagerModal/CardsManagerModal";
import CardsManagerTable from "@/components/CardsManagerPage/CardsManagerTable/CardsManagerTable";
import BackButton from "@/components/shared/Button/BackButton";
import useError from "@/composables/Error/useError";
import useTimesUpAPI from "@/composables/API/useTimesUpAPI";
import Card from "@/classes/Card";

const { timesUpAPI } = useTimesUpAPI();
const { displayError } = useError();

const cards = ref(undefined);
const cardsManagerModal = ref(null);
const isFetchingCards = ref(true);

const fetchCards = async() => {
    try {
        isFetchingCards.value = true;
        const { data: fetchedCards } = await timesUpAPI.getCards();
        cards.value = fetchedCards.map(card => new Card(card));
    } catch (err) {
        cards.value = null;
        displayError(err);
    } finally {
        isFetchingCards.value = false;
    }
};
const showCardsManagerModal = card => cardsManagerModal.value.show(card);
const addCard = newCard => cards.value.push(newCard);
const updateCard = updatedCard => {
    const cardIndex = cards.value.findIndex(({ _id }) => _id === updatedCard._id);
    if (cardIndex !== -1) {
        cards.value.splice(cardIndex, 1, new Card(updatedCard));
    }
};
const deleteCard = deletedCard => {
    const cardIndex = cards.value.findIndex(({ _id }) => _id === deletedCard._id);
    if (cardIndex !== -1) {
        cards.value.splice(cardIndex, 1);
    }
};

fetchCards();
</script>

<style>
    #cards-manager {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        text-shadow: none;
    }
</style>