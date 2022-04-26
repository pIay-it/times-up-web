<template>
    <div id="cards-manager-modal" ref="cardsManagerModal" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-html="modalTitleText"/>
                </div>
                <VForm #default="{ isSubmitting }" :validation-schema="formSchema" @submit="submit" @invalid-submit="submitError">
                    <div class="modal-body">
                        <TextInput ref="labelTextInput" :label="$t('CardsManagerModal.label')" is-required name="label"
                                   :is-disabled="isSubmitting" :success-message="labelInputSuccessMessage"
                                   :success-message-type="labelInputSuccessMessageType" @change="setLabel"/>
                        <div>
                            <label class="form-label" v-html="$t('CardsManagerModal.categories')"/>
                            <RedAsterisk/>
                            <VField v-model="categories" name="categories" type="text" class="d-none" disabled/>
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
                            <VField v-model="difficulty" name="difficulty" type="number" class="d-none" disabled/>
                            <div class="d-flex justify-content-center">
                                <div class="btn-group" role="group">
                                    <input id="card-easy-difficulty" v-model="difficulty" type="radio" class="btn-check" name="difficulty"
                                           :value="1" :disabled="isSubmitting"/>
                                    <label class="btn btn-outline-success" for="card-easy-difficulty">
                                        <CardDifficultyIcon :difficulty="CARD_DIFFICULTY.EASY" class="me-2"/>
                                        <span v-html="$t('CardsManagerModal.easy')"/>
                                    </label>
                                    <input id="card-medium-difficulty" v-model="difficulty" type="radio" class="btn-check" name="difficulty"
                                           :value="2" :disabled="isSubmitting"/>
                                    <label class="btn btn-outline-primary" for="card-medium-difficulty">
                                        <CardDifficultyIcon :difficulty="CARD_DIFFICULTY.MEDIUM" class="me-2"/>
                                        <span v-html="$t('CardsManagerModal.medium')"/>
                                    </label>
                                    <input id="card-hard-difficulty" v-model="difficulty" type="radio" class="btn-check" name="difficulty"
                                           :value="3" :disabled="isSubmitting"/>
                                    <label class="btn btn-outline-danger" for="card-hard-difficulty">
                                        <CardDifficultyIcon :difficulty="CARD_DIFFICULTY.HARD" class="me-2"/>
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

<script setup>
import { computed, defineEmits, defineProps, onErrorCaptured, ref, defineExpose } from "vue";
import Fuse from "fuse.js";
import { useField } from "vee-validate";
import { object as createSchema, string as checkString, array as checkArray, number as checkNumber } from "yup";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
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
import useSweetAlert from "@/composables/SweetAlert/useSweetAlert";
import useTimesUpAPI from "@/composables/API/useTimesUpAPI";
import Card from "@/classes/Card";
import { CARD_DIFFICULTY } from "@/helpers/constants/Card";
import { sortAlphabeticallyByKey } from "@/helpers/functions/Array";
import { getCardCategories } from "@/helpers/functions/Card";

const props = defineProps({
    cards: {
        type: Array,
        required: true,
        validator: cards => cards.every(card => card instanceof Card),
    },
});

const emit = defineEmits({
    "card-created": card => card instanceof Card,
    "card-updated": card => card instanceof Card,
});

const { displayError } = useError();
const { DefaultConfirmSwal } = useSweetAlert();
const cardsManagerModal = ref(null);
const { showModal, hideModal, lockModal, unlockModal } = useBootstrapModal(cardsManagerModal);
const { t } = useI18n();
const Toast = useToast();
const { timesUpAPI } = useTimesUpAPI();
const { value: categories, setTouched: setCategoriesTouched, meta: metaCategories } = useField("categories", undefined, { initialValue: [] });
const { value: difficulty } = useField("difficulty", undefined, { initialValue: 1 });

const i18nKey = "CardsManagerModal";
const formSchema = createSchema().shape({
    label: checkString().trim().required().label(t(`${i18nKey}.theCardLabel`)),
    categories: checkArray().min(1).required(),
    difficulty: checkNumber(),
    description: checkString().optional().trim(),
    imageURL: checkString().optional().trim().url().label(t(`${i18nKey}.theCardImageURL`)),
});
const label = ref(undefined);
const imageURL = ref(undefined);
const cardImageFinder = ref(null);
const labelTextInput = ref(null);
const descriptionTextInput = ref(null);
const imageURLTextInput = ref(null);
const card = ref(new Card());

const mode = computed(() => card.value.doesExistInDB ? "update" : "create");
const modalTitleText = computed(() => mode.value === "create" ? t(`${i18nKey}.createCard`) : t(`${i18nKey}.updateCard`));
const modalSubmitButtonText = computed(() => mode.value === "create" ? t(`${i18nKey}.create`) : t(`${i18nKey}.update`));
const getFormattedCardCategoriesForSelect = categoriesToFormat => categoriesToFormat.map(category => ({
    category,
    displayedLabel: t(`CardCategory.${category}.label`),
}));
const selectableCategories = computed(() => {
    const cardCategories = getCardCategories();
    let filteredCategories = cardCategories.filter(category => !categories.value.includes(category));
    filteredCategories = getFormattedCardCategoriesForSelect(filteredCategories);
    sortAlphabeticallyByKey(filteredCategories, "displayedLabel");
    return filteredCategories;
});
const selectedCardCategories = computed({
    get: () => getFormattedCardCategoriesForSelect(categories.value),
    set: newCategories => (categories.value = newCategories.map(({ category }) => category)),
});
const isCategoriesInputValid = computed(() => categories.value.length);
const categoriesErrorMessage = computed(() => {
    if (!isCategoriesInputValid.value && metaCategories.touched) {
        return t(`${i18nKey}.oneCategoryRequired`);
    }
    return undefined;
});
const categoriesSelectClasses = computed(() => ({
    "is-valid": isCategoriesInputValid.value && metaCategories.touched,
    "is-invalid": !isCategoriesInputValid.value && metaCategories.touched,
}));
const noOptionsText = computed(() => selectableCategories.value.length ? t(`${i18nKey}.noMatchingCategory`) : t(`${i18nKey}.noMoreCategory`));
const lookAlikeCards = computed(() => {
    const fuse = new Fuse(props.cards, {
        keys: ["label"],
        threshold: 0.2,
        minMatchCharLength: 3,
        shouldSort: false,
    });
    return label.value?.length ? fuse.search(label.value).map(({ item }) => item) : props.cards;
});
const doesCardLabelLookAlikeAnotherOne = computed(() => lookAlikeCards.value.length &&
    (lookAlikeCards.value.length !== 1 || lookAlikeCards.value[0]._id !== card.value._id));
const labelInputSuccessMessageType = computed(() => doesCardLabelLookAlikeAnotherOne.value ? "info" : "success");
const labelInputSuccessMessage = computed(() => {
    if (doesCardLabelLookAlikeAnotherOne.value) {
        return t(`${i18nKey}.someCardsLookAlike`, { label: lookAlikeCards.value[0].label });
    }
    return t(`${i18nKey}.thisCardIsUnique`);
});

onErrorCaptured(err => {
    if (err instanceof TypeError && err.stack?.includes("vue-select")) {
        // TODO: Remove when fixed on v-select beta
        // eslint-disable-next-line no-console
        console.log("v-select beta error, remember to update the npm module later");
        return false;
    }
    throw err;
});

const resetForm = () => {
    if (mode.value === "create") {
        labelTextInput.value.reset();
        categories.value = [];
        setCategoriesTouched(false);
        difficulty.value = CARD_DIFFICULTY.EASY;
        descriptionTextInput.value.reset();
        imageURLTextInput.value.reset();
        label.value = undefined;
        imageURL.value = undefined;
    } else {
        labelTextInput.value.setValue(card.value.label);
        categories.value = [...card.value.categories];
        setCategoriesTouched(true);
        difficulty.value = card.value.difficulty;
        descriptionTextInput.value.setValue(card.value.description);
        imageURLTextInput.value.setValue(card.value.imageURL);
        label.value = card.value.label;
        imageURL.value = card.value.imageURL;
    }
    cardImageFinder.value.reset();
    labelTextInput.value.focus();
};
const show = (cardToEdit = null) => {
    card.value = new Card(cardToEdit);
    cardImageFinder.value.reset();
    resetForm();
    showModal(() => labelTextInput.value.focus());
};
const filterByCategoryLabel = (list, search) => {
    const fuse = new Fuse(list, {
        keys: ["displayedLabel"],
        shouldSort: true,
        threshold: 0.3,
    });
    return search.length ? fuse.search(search).map(({ item }) => item) : fuse.list;
};
const createCard = async formValues => {
    const { data: newCard } = await timesUpAPI.createCard(formValues);
    emit("card-created", new Card(newCard));
    Toast.success(t(`${i18nKey}.cardCreated`));
};
const updateCard = async formValues => {
    const { data: updatedCard } = await timesUpAPI.updateCard(card.value._id, formValues);
    emit("card-updated", new Card(updatedCard));
    Toast.success(t(`${i18nKey}.cardUpdated`));
};
const confirmSubmit = () => DefaultConfirmSwal.fire({
    title: t(`${i18nKey}.${mode.value}EvenIfCardLooksAlike`),
    text: t("SweetAlert.youCanChangeThatAfterwards"),
    icon: "warning",
});
const submit = async formValues => {
    formValues = formSchema.cast(formValues);
    if (doesCardLabelLookAlikeAnotherOne.value) {
        const { isConfirmed } = await confirmSubmit();
        if (!isConfirmed) {
            return;
        }
    }
    try {
        lockModal();
        if (mode.value === "create") {
            await createCard(formValues);
        } else {
            await updateCard(formValues);
        }
        hideModal();
    } catch (err) {
        displayError(err);
    } finally {
        unlockModal();
    }
};
const submitError = () => setCategoriesTouched(true);
const setLabel = newLabel => {
    label.value = newLabel;
    cardImageFinder.value.setSearch(newLabel);
};
const setImageURL = newImageURL => (imageURL.value = newImageURL);
const imageSelectedFromCardImageFinder = selectedImageURL => {
    imageURLTextInput.value.setValue(selectedImageURL);
    imageURL.value = selectedImageURL;
};
defineExpose({ show });
</script>

<style lang="scss" scoped>
    #card-image-preview-container {
        width: 100px;
    }
</style>