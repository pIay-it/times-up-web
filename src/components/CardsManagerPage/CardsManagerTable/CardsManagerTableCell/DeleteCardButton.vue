<template>
    <SubmitButton classes="btn btn-sm btn-danger" :is-loading="isDeleting" :loader-size="21" @click.prevent="deleteCard">
        <i class="fa fa-trash mx-1"/>
    </SubmitButton>
</template>

<script>
import Swal from "sweetalert2";
import { useToast } from "vue-toastification";
import Card from "@/classes/Card";
import SubmitButton from "@/components/shared/Form/SubmitButton";
import useErrorManager from "@/composables/Error/useErrorManager";

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
        const toast = useToast();
        const { displayError } = useErrorManager();
        return { displayError, toast };
    },
    data() {
        return { isDeleting: false };
    },
    methods: {
        confirmDeleteCard() {
            return Swal.fire({
                title: this.$t("DeleteCardButton.areYouSure"),
                text: this.$t("SweetAlert.actionIsIrreversible"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: this.$t("SweetAlert.confirm"),
                cancelButtonText: this.$t("SweetAlert.cancel"),
            });
        },
        async deleteCard() {
            try {
                this.isDeleting = true;
                const { isConfirmed } = await this.confirmDeleteCard();
                if (isConfirmed) {
                    await this.$timesUpAPI.deleteCard(this.card._id);
                    this.toast.success(this.$t("DeleteCardButton.cardDeleted"));
                    this.$emit("card-deleted", this.card);
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