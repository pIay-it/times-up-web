import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";

export default function useError() {
    const Toast = useToast();
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
            Toast.error(t(`Error.API.${response.data.type}`));
        } else {
            Toast.error(t("Error.unknown"));
            throw error;
        }
    }
    return { displayError, isAPIErrorType };
}