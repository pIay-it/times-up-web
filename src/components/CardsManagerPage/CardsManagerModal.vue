<template>
    <div id="cards-manager-modal" ref="cardsManagerModal" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-html="modalTitleText"/>
                </div>
                <form @submit.prevent>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label" for="card-label" v-html="$t('CardsManagerModal.label')"/>
                            <RedAsterisk/>
                            <input id="card-label" ref="cardLabelInput" v-model="card.label" required class="form-control"
                                   :placeholder="$t('Form.required')" :disabled="isSubmitting"/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="card-categories" v-html="$t('CardsManagerModal.categories')"/>
                            <RedAsterisk/>
                            <VSelect id="card-categories" :options="cardCategories" :close-on-select="false"
                                     :placeholder="$t('Form.required')" label="category" multiple :value="card.categories"
                                     :disabled="isSubmitting" @update:model-value="setCardCategories" @option:deselected="unsetCardCategory">
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
                            </VSelect>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" v-html="$t('CardsManagerModal.close')"/>
                        <button type="button" class="btn btn-primary" v-html="modalSubmitButtonText"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from "bootstrap";
import Card from "@/classes/Card";
import { getCardCategories } from "@/helpers/functions/Card";
import CardCategoryIcon from "@/components/shared/Card/Category/CardCategoryIcon";
import RedAsterisk from "@/components/shared/Form/RedAsterisk";

export default {
    name: "CardsManagerModal",
    components: { RedAsterisk, CardCategoryIcon },
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
            const filteredCategories = categories.filter(category => !this.card.categories.includes(category));
            return filteredCategories.map(category => ({
                category,
                displayedLabel: this.$t(`CardCategory.${category}`),
            }));
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
    },
};
</script>