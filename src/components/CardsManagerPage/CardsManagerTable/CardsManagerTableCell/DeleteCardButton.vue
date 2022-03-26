<template>
    <SubmitButton v-tooltip="$t('DeleteCardButton.deleteCard')" classes="btn btn-sm btn-danger" :is-loading="isDeleting"
                  :loader-size="21" @click.prevent="deleteCard">
        <i class="fa fa-trash mx-1"/>
    </SubmitButton>
</template>

<script>
import SubmitButton from "@/components/shared/Form/SubmitButton";
import useError from "@/composables/Error/useError";
import useSweetAlert from "@/composables/SweetAlert/useSweetAlert";
import Card from "@/classes/Card";

export default {
    name: "DeleteCardButton",
    components: { SubmitButton },
    props: {
        card: {
            type: Object,
            required: true,
        },
    },
    emits: { "card-deleted": card => card instanceof Card },
    setup() {
        const { displayError } = useError();
        const { DefaultConfirmSwal } = useSweetAlert();
        return { displayError, DefaultConfirmSwal };
    },
    data() {
        return { isDeleting: false };
    },
    methods: {
        confirmDeleteCard() {
            return this.DefaultConfirmSwal.fire({
                title: this.$t("DeleteCardButton.areYouSure"),
                icon: "warning",
            });
        },
        async deleteCard() {
            try {
                this.isDeleting = true;
                const { isConfirmed } = await this.confirmDeleteCard();
                if (isConfirmed) {
                    await this.$timesUpAPI.deleteCard(this.card._id);
                    this.$toast.success(this.$t("DeleteCardButton.cardDeleted"));
                    this.$emit("card-deleted", new Card(this.card));
                }
            } catch (e) {
                this.displayError(e);
            } finally {
                this.isDeleting = false;
            }
        },
    },
};
</script>