import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";

export default function useError() {
    const { t } = useI18n();
    const DefaultConfirmSwal = Swal.mixin({
        text: t("SweetAlert.actionIsIrreversible"),
        confirmButtonText: t("SweetAlert.confirm"),
        cancelButtonText: t("SweetAlert.cancel"),
        heightAuto: false,
        returnFocus: false,
        showCancelButton: true,
    });
    return { DefaultConfirmSwal };
}