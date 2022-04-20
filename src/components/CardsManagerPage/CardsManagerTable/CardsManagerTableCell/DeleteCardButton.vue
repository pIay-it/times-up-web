<template>
    <SubmitButton v-tooltip="$t('DeleteCardButton.deleteCard')" classes="btn btn-sm btn-danger" :is-loading="isDeleting"
                  :loader-size="21" @click.prevent="deleteCard">
        <i class="fa fa-trash mx-1"/>
    </SubmitButton>
</template>

<script setup>
import { defineEmits, defineProps, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import SubmitButton from "@/components/shared/Form/SubmitButton";
import useError from "@/composables/Error/useError";
import useSweetAlert from "@/composables/SweetAlert/useSweetAlert";
import useTimesUpAPI from "@/composables/API/useTimesUpAPI";
import Card from "@/classes/Card";

const { displayError } = useError();
const { DefaultConfirmSwal } = useSweetAlert();
const { t } = useI18n();
const Toast = useToast();
const { timesUpAPI } = useTimesUpAPI();

const emit = defineEmits({ "card-deleted": card => card instanceof Card });

const props = defineProps({
    card: {
        type: Object,
        required: true,
    },
});

const isDeleting = ref(false);

const confirmDeleteCard = () => DefaultConfirmSwal.fire({
    title: t("DeleteCardButton.areYouSure"),
    icon: "warning",
});
const deleteCard = async() => {
    try {
        isDeleting.value = true;
        const { isConfirmed } = await confirmDeleteCard();
        if (isConfirmed) {
            await timesUpAPI.deleteCard(props.card._id);
            Toast.success(t("DeleteCardButton.cardDeleted"));
            emit("card-deleted", new Card(props.card));
        }
    } catch (e) {
        displayError(e);
    } finally {
        isDeleting.value = false;
    }
};
</script>