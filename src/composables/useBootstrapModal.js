import { onMounted } from "vue";
import { Modal } from "bootstrap";

export default function useBootstrapModal(modalRef) {
    onMounted(() => {
        modalRef = new Modal(modalRef.value);
    });

    function showModal(cb) {
        modalRef.show();
        if (cb) {
            setTimeout(cb, 500);
        }
    }

    function hideModal() {
        modalRef.hide();
    }

    function lockModal() {
        modalRef._config.backdrop = false;
        modalRef._config.keyboard = false;
    }

    function unlockModal() {
        modalRef._config.backdrop = true;
        modalRef._config.keyboard = true;
    }

    return { showModal, hideModal, lockModal, unlockModal };
}