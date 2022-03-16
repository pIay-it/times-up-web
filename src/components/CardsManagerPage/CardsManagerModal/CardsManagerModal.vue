<template>
    <div id="cards-manager-modal" ref="cardsManagerModal" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-html="modalTitleText"/>
                </div>
                <VForm #default="{ isSubmitting }" :validation-schema="formSchema" @submit="submit" @invalid-submit="submitError">
                    <div class="modal-body">
                        <TextInput ref="labelTextInput" :label="$t('CardsManagerModal.label')" :is-required="true" name="label"
                                   :is-disabled="isSubmitting" :success-message="labelInputSuccessMessage"
                                   :success-message-type="labelInputSuccessMessageType" @change="setLabel"/>
                        <div>
                            <label class="form-label" v-html="$t('CardsManagerModal.categories')"/>
                            <RedAsterisk/>
                            <VField v-model="categories" name="categories" type="text" class="d-none" :disabled="true"/>
                            <VSelect id="card-categories" v-model="selectedCardCategories" :options="selectableCategories"
                                     :close-on-select="false" :placeholder="$t('Form.required')" label="category" multiple
                                     :filter="filterByCategoryLabel" :disabled="isSubmitting" :class="categoriesSelectClasses"
                                     @close="setCategoriesTouched(true)" @deselected="setCategoriesTouched(true)">
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
                            <InputMessage :is-shown="!!categoriesErrorMessage" :error-message="categoriesErrorMessage"
                                          :is-input-valid="!categoriesErrorMessage"/>
                        </div>
                        <div class="mb-2">
                            <label class="form-label" for="card-easy-difficulty" v-html="$t('CardsManagerModal.difficulty')"/>
                            <RedAsterisk/>
                            <VField v-model="difficulty" name="difficulty" type="number" class="d-none" :disabled="true"/>
                            <div class="d-flex justify-content-center">
                                <div class="btn-group" role="group">
                                    <input id="card-easy-difficulty" v-model="difficulty" type="radio" class="btn-check" name="difficulty"
                                           :value="1" :disabled="isSubmitting"/>
                                    <label class="btn btn-outline-success" for="card-easy-difficulty">
                                        <CardDifficultyIcon :difficulty="1" class="me-2"/>
                                        <span v-html="$t('CardsManagerModal.easy')"/>
                                    </label>
                                    <input id="card-medium-difficulty" v-model="difficulty" type="radio" class="btn-check" name="difficulty"
                                           :value="2" :disabled="isSubmitting"/>
                                    <label class="btn btn-outline-primary" for="card-medium-difficulty">
                                        <CardDifficultyIcon :difficulty="2" class="me-2"/>
                                        <span v-html="$t('CardsManagerModal.medium')"/>
                                    </label>
                                    <input id="card-hard-difficulty" v-model="difficulty" type="radio" class="btn-check" name="difficulty"
                                           :value="3" :disabled="isSubmitting"/>
                                    <label class="btn btn-outline-danger" for="card-hard-difficulty">
                                        <CardDifficultyIcon :difficulty="3" class="me-2"/>
                                        <span v-html="$t('CardsManagerModal.hard')"/>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <TextInput ref="descriptionTextInput" :label="$t('CardsManagerModal.description')" name="description"
                                   :is-disabled="isSubmitting"/>
                        <div class="d-flex align-items-center">
                            <TextInput ref="imageURLTextInput" :label="$t('CardsManagerModal.imageURL')" name="imageURL"
                                       :is-disabled="isSubmitting" class="w-100" @change="setImageURL"/>
                            <div id="card-image-preview-container" class="d-flex justify-content-center">
                                <CardImage :image-url="imageURL" :max-height="80" :max-width="80" class="ms-3"/>
                            </div>
                        </div>
                        <CardImageFinder ref="cardImageFinder" @image-url-selected="imageSelectedFromCardImageFinder"/>
                    </div>
                    <div class="modal-footer">
                        <div class="me-auto">
                            <CardsManagerModalResetButton :mode="mode" @click.prevent="resetForm"/>
                        </div>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" :disabled="isSubmitting"
                                v-html="$t('CardsManagerModal.close')"/>
                        <SubmitButton :is-loading="isSubmitting" classes="btn btn-primary">
                            {{ modalSubmitButtonText }}
                        </SubmitButton>
                    </div>
                </VForm>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import Fuse from "fuse.js";
import { useField } from "vee-validate";
import { object as createSchema, string as checkString, array as checkArray, number as checkNumber } from "yup";
import CardCategoryIcon from "@/components/shared/Card/Category/CardCategoryIcon";
import RedAsterisk from "@/components/shared/Form/RedAsterisk";
import SubmitButton from "@/components/shared/Form/SubmitButton";
import CardDifficultyIcon from "@/components/shared/Card/Difficulty/CardDifficultyIcon";
import TextInput from "@/components/shared/Form/Input/TextInput";
import InputMessage from "@/components/shared/Form/Input/InputMessage/InputMessage";
import CardsManagerModalResetButton from "@/components/CardsManagerPage/CardsManagerModal/CardsManagerModalResetButton";
import CardImage from "@/components/shared/Card/Image/CardImage";
import CardImageFinder from "@/components/CardsManagerPage/CardsManagerModal/CardImageFinder";
import useError from "@/composables/Error/useError";
import useBootstrapModal from "@/composables/Bootstrap/useBootstrapModal";
import { sortAlphabeticallyByKey } from "@/helpers/functions/Array";
import { getCardCategories } from "@/helpers/functions/Card";
import Card from "@/classes/Card";
import Swal from "sweetalert2";

export default {
    name: "CardsManagerModal",
    components: {
        CardImageFinder,
        CardImage,
        CardsManagerModalResetButton,
        InputMessage,
        TextInput,
        CardDifficultyIcon,
        SubmitButton,
        RedAsterisk,
        CardCategoryIcon,
    },
    props: {
        cards: {
            type: Array,
            required: true,
            validator: cards => cards.every(card => card instanceof Card),
        },
    },
    emits: {
        "card-created": card => card instanceof Card,
        "card-updated": card => card instanceof Card,
    },
    setup() {
        const cardsManagerModal = ref(null);
        const { displayError } = useError();
        const { showModal, hideModal, lockModal, unlockModal } = useBootstrapModal(cardsManagerModal);
        const { value: categories, setTouched: setCategoriesTouched, meta: metaCategories } = useField("categories", undefined, { initialValue: [] });
        const { value: difficulty } = useField("difficulty", undefined, { initialValue: 1 });
        return {
            displayError,
            categories, setCategoriesTouched, metaCategories,
            difficulty,
            cardsManagerModal, showModal, hideModal, lockModal, unlockModal,
        };
    },
    data() {
        return {
            card: new Card(),
            label: undefined,
            imageURL: undefined,
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
        formSchema() {
            return createSchema().shape({
                label: checkString().trim().required().label(this.$t("CardsManagerModal.theCardLabel")),
                categories: checkArray().min(1).required(),
                difficulty: checkNumber(),
                description: checkString().optional().trim(),
                imageURL: checkString().optional().trim().url().label(this.$t("CardsManagerModal.theCardImageURL")),
            });
        },
        selectableCategories() {
            const categories = getCardCategories();
            let filteredCategories = categories.filter(category => !this.categories.includes(category));
            filteredCategories = this.getFormattedCardCategoriesForSelect(filteredCategories);
            sortAlphabeticallyByKey(filteredCategories, "displayedLabel");
            return filteredCategories;
        },
        selectedCardCategories: {
            get() {
                return this.getFormattedCardCategoriesForSelect(this.categories);
            },
            set(categories) {
                this.categories = categories.map(({ category }) => category);
            },
        },
        areCategoriesValid() {
            return this.categories.length;
        },
        categoriesErrorMessage() {
            return !this.areCategoriesValid && this.metaCategories.touched ? this.$t("CardsManagerModal.oneCategoryRequired") : undefined;
        },
        categoriesSelectClasses() {
            return {
                "is-valid": this.areCategoriesValid && this.metaCategories.touched,
                "is-invalid": !this.areCategoriesValid && this.metaCategories.touched,
            };
        },
        noOptionsText() {
            return this.selectableCategories.length ? this.$t("CardsManagerModal.noMatchingCategory") : this.$t("CardsManagerModal.noMoreCategory");
        },
        lookAlikeCards() {
            const fuse = new Fuse(this.cards, {
                keys: ["label"],
                threshold: 0.2,
                minMatchCharLength: 3,
                shouldSort: false,
            });
            return !this.label?.length ? this.cards : fuse.search(this.label).map(({ item }) => item);
        },
        doesCardLabelLookAlikeAnotherOne() {
            return this.lookAlikeCards.length && (this.lookAlikeCards.length !== 1 || this.lookAlikeCards[0]._id !== this.card._id);
        },
        labelInputSuccessMessageType() {
            return this.doesCardLabelLookAlikeAnotherOne ? "info" : "success";
        },
        labelInputSuccessMessage() {
            if (this.doesCardLabelLookAlikeAnotherOne) {
                return this.$t("CardsManagerModal.someCardsLookAlike", { label: this.lookAlikeCards[0].label });
            }
            return this.$t("CardsManagerModal.thisCardIsUnique");
        },
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
            this.$refs.cardImageFinder.reset();
            this.resetForm();
            this.showModal(() => this.$refs.labelTextInput.focus());
        },
        filterByCategoryLabel(list, search) {
            const fuse = new Fuse(list, {
                keys: ["displayedLabel"],
                shouldSort: true,
                threshold: 0.3,
            });
            return search.length ? fuse.search(search).map(({ item }) => item) : fuse.list;
        },
        getFormattedCardCategoriesForSelect(categories) {
            return categories.map(category => ({ category, displayedLabel: this.$t(`CardCategory.${category}.label`) }));
        },
        async createCard(formValues) {
            const { data: newCard } = await this.$timesUpAPI.createCard(formValues);
            this.$emit("card-created", new Card(newCard));
            this.$toast.success(this.$t("CardsManagerModal.cardCreated"));
        },
        async updateCard(formValues) {
            const { data: updatedCard } = await this.$timesUpAPI.updateCard(this.card._id, formValues);
            this.$emit("card-updated", new Card(updatedCard));
            this.$toast.success(this.$t("CardsManagerModal.cardUpdated"));
        },
        confirmSubmit() {
            const titleText = `CardsManagerModal.${this.mode}EvenIfCardLooksAlike`;
            return Swal.fire({
                title: this.$t(titleText),
                text: this.$t("SweetAlert.youCanChangeThatAfterwards"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: this.$t("SweetAlert.confirm"),
                cancelButtonText: this.$t("SweetAlert.cancel"),
                heightAuto: false,
            });
        },
        async submit(formValues) {
            formValues = this.formSchema.cast(formValues);
            if (this.doesCardLabelLookAlikeAnotherOne) {
                const { isConfirmed } = await this.confirmSubmit();
                if (!isConfirmed) {
                    return;
                }
            }
            try {
                this.lockModal();
                if (this.mode === "create") {
                    await this.createCard(formValues);
                } else {
                    await this.updateCard(formValues);
                }
                this.hideModal();
            } catch (err) {
                this.displayError(err);
            } finally {
                this.unlockModal();
            }
        },
        submitError() {
            this.setCategoriesTouched(true);
        },
        resetForm() {
            if (this.mode === "create") {
                this.$refs.labelTextInput.reset();
                this.categories = [];
                this.setCategoriesTouched(false);
                this.difficulty = 1;
                this.$refs.descriptionTextInput.reset();
                this.$refs.imageURLTextInput.reset();
                this.label = undefined;
                this.imageURL = undefined;
            } else {
                this.$refs.labelTextInput.setValue(this.card.label);
                this.categories = [...this.card.categories];
                this.setCategoriesTouched(true);
                this.difficulty = this.card.difficulty;
                this.$refs.descriptionTextInput.setValue(this.card.description);
                this.$refs.imageURLTextInput.setValue(this.card.imageURL);
                this.label = this.card.label;
                this.imageURL = this.card.imageURL;
            }
            this.$refs.cardImageFinder.reset();
            this.$refs.labelTextInput.focus();
        },
        setLabel(label) {
            this.label = label;
        },
        setImageURL(imageURL) {
            this.imageURL = imageURL;
        },
        imageSelectedFromCardImageFinder(imageURL) {
            this.$refs.imageURLTextInput.setValue(imageURL);
            this.imageURL = imageURL;
        },
    },
};
</script>

<style lang="scss" scoped>
    #card-image-preview-container {
        width: 100px;
    }
</style>