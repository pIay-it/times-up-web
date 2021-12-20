import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";

export default function useError() {
    const toast = useToast();
    const { t } = useI18n();

    function isAPIError(error) {
        return !!error?.response?.data?.HTTPCode;
    }

    function isAPIErrorType(error, type) {
        return error?.response?.data?.type === type;
    }

    function displayError(error) {
        if (isAPIError(error)) {
            const { response } = error;
            toast.error(t(`Error.API.${response.data.type}`));
        } else {
            toast.error(t("Error.unknown"));
            throw error;
        }
    }
    return { displayError, isAPIErrorType };
}