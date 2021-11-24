<template>
    <div id="cards-manager-modal" ref="cardsManagerModal" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-html="modalTitleText"/>
                </div>
                <form @submit.prevent="submit">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label" for="card-label" v-html="$t('CardsManagerModal.label')"/>
                            <RedAsterisk/>
                            <input id="card-label" ref="cardLabelInput" v-model="card.label" required class="form-control"
                                   :placeholder="$t('Form.required')" :disabled="isSubmitting"/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" v-html="$t('CardsManagerModal.categories')"/>
                            <RedAsterisk/>
                            <VSelect id="card-categories" :options="cardCategories" :close-on-select="false"
                                     :placeholder="$t('Form.required')" label="category" multiple :value="card.categories"
                                     :filter="filterByCategoryLabel" :disabled="isSubmitting" @update:model-value="setCardCategories"
                                     @option:deselected="unsetCardCategory">
                                <template #selected-option="{ category, displayedLabel }">
                                    <div class="d-flex align-items-center">
                                        <CardCategoryIcon :category="category" class="me-1"/>
                                        <span class="me-1" v-html="displayedLabel"/>
                                    </div>
                                </template>
                                <template #option="{ category, displayedLabel }">
                                    <div class="d-flex align-items-center me-2">
                                        <CardCategoryIcon :category="category" class="me-1"/>
                                        <span v-html="displayedLabel"/>
                                    </div>
                                </template>
                                <template #no-options>
                                    <i class="fa fa-ban me-2"/>
                                    <span v-html="noOptionsText"/>
                                </template>
                            </VSelect>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="card-label" v-html="$t('CardsManagerModal.difficulty')"/>
                            <RedAsterisk/>
                            <div class="d-flex justify-content-center">
                                <div class="btn-group" role="group">
                                    <input id="card-easy-difficulty" v-model="card.difficulty" type="radio" class="btn-check" name="difficulty"
                                           :value="1" :disabled="isSubmitting"/>
                                    <label class="btn btn-outline-success" for="card-easy-difficulty">
                                        <CardDifficultyIcon :difficulty="1" class="me-2"/>
                                        <span v-html="$t('CardsManagerModal.easy')"/>
                                    </label>
                                    <input id="card-medium-difficulty" v-model="card.difficulty" type="radio" class="btn-check" name="difficulty"
                                           :value="2" :disabled="isSubmitting"/>
                                    <label class="btn btn-outline-primary" for="card-medium-difficulty">
                                        <CardDifficultyIcon :difficulty="2" class="me-2"/>
                                        <span v-html="$t('CardsManagerModal.medium')"/>
                                    </label>
                                    <input id="card-hard-difficulty" v-model="card.difficulty" type="radio" class="btn-check" name="difficulty"
                                           :value="3" :disabled="isSubmitting"/>
                                    <label class="btn btn-outline-danger" for="card-hard-difficulty">
                                        <CardDifficultyIcon :difficulty="3" class="me-2"/>
                                        <span v-html="$t('CardsManagerModal.hard')"/>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="card-description" v-html="$t('CardsManagerModal.description')"/>
                            <input id="card-description" v-model="card.description" class="form-control"
                                   :placeholder="$t('Form.optional')" :disabled="isSubmitting"/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="card-image-url" v-html="$t('CardsManagerModal.imageURL')"/>
                            <input id="card-image-url" v-model="card.imageURL" class="form-control"
                                   :placeholder="$t('Form.optional')" :disabled="isSubmitting"/>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" :disabled="isSubmitting"
                                v-html="$t('CardsManagerModal.close')"/>
                        <SubmitButton :is-loading="isSubmitting" classes="btn btn-primary">
                            {{ modalSubmitButtonText }}
                        </SubmitButton>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from "bootstrap";
import Fuse from "fuse.js";
import Card from "@/classes/Card";
import { getCardCategories } from "@/helpers/functions/Card";
import CardCategoryIcon from "@/components/shared/Card/Category/CardCategoryIcon";
import RedAsterisk from "@/components/shared/Form/RedAsterisk";
import { sortAlphabeticallyByKey } from "@/helpers/functions/Array";
import SubmitButton from "@/components/shared/Form/SubmitButton";
import useErrorManager from "@/composables/Error/useErrorManager";
import CardDifficultyIcon from "@/components/shared/Card/Difficulty/CardDifficultyIcon";

export default {
    name: "CardsManagerModal",
    components: { CardDifficultyIcon, SubmitButton, RedAsterisk, CardCategoryIcon },
    emits: { "card-created": card => card instanceof Card },
    setup() {
        const { displayError } = useErrorManager();
        return { displayError };
    },
    data() {
        return {
            modal: undefined,
            card: new Card(),
            isSubmitting: false,
        };
    },
    computed: {
        mode() {
            return this.card.doesExistInDB ? "update" : "create";
        },
        modalTitleText() {
            return this.mode === "create" ? this.$t("CardsManagerModal.createCard") : this.$t("CardsManagerModal.updateCard");
        },
        modalSubmitButtonText() {
            return this.mode === "create" ? this.$t("CardsManagerModal.create") : this.$t("CardsManagerModal.update");
        },
        cardCategories() {
            const categories = getCardCategories();
            let filteredCategories = categories.filter(category => !this.card.categories.includes(category));
            filteredCategories = filteredCategories.map(category => ({
                category,
                displayedLabel: this.$t(`CardCategory.${category}`),
            }));
            sortAlphabeticallyByKey(filteredCategories, "displayedLabel");
            return filteredCategories;
        },
        noOptionsText() {
            return this.cardCategories.length ? this.$t("CardsManagerModal.noMatchingCategory") : this.$t("CardsManagerModal.noMoreCategory");
        },
    },
    mounted() {
        this.modal = new Modal(this.$refs.cardsManagerModal);
    },
    errorCaptured(err) {
        if (err instanceof TypeError && err.stack?.includes("vue-select")) {
            // TODO: Remove when fixed on v-select beta
            // eslint-disable-next-line no-console
            console.log("v-select beta error, remember to update the npm module later");
            return false;
        }
        throw err;
    },
    methods: {
        show(card = null) {
            card ||= { difficulty: 1 };
            this.card = new Card(card);
            this.modal.show();
            setTimeout(() => this.$refs.cardLabelInput.focus(), 500);
        },
        hide() {
            this.modal.hide();
        },
        setCardCategories(categories) {
            this.card.categories = categories.map(({ category }) => category);
        },
        unsetCardCategory({ category }) {
            this.card.unsetCardCategory(category);
        },
        filterByCategoryLabel(list, search) {
            const fuse = new Fuse(list, {
                keys: ["displayedLabel"],
                shouldSort: true,
                threshold: 0.3,
            });
            return search.length ? fuse.search(search).map(({ item }) => item) : fuse.list;
        },
        async createCard() {
            const { data: newCard } = await this.$timesUpAPI.createCard(this.card);
            this.$emit("card-created", new Card(newCard));
        },
        /*
         * Async updateCard() {
         *
         * },
         */
        async submit() {
            try {
                this.isSubmitting = true;
                if (this.mode === "create") {
                    await this.createCard();
                } else {
                    // Await this.updateCard();
                }
                this.hide();
            } catch (err) {
                this.displayError(err);
            } finally {
                this.isSubmitting = false;
            }
        },
    },
};
</script>