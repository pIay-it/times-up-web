<template>
    <div id="input-message" class="input-message d-flex align-items-center">
        <transition name="translate-from-top" mode="out-in">
            <InputErrorMessage v-if="isShown && !isInputValid && errorMessage" key="error-message" :text="errorMessage"
                               :class="{ 'text-white': isMessageWhite }"/>
            <InputSuccessMessage v-else-if="isShown && isInputValid && successMessage" key="success-message" :text="successMessage"
                                 :type="successMessageType" :class="{ 'text-white': isMessageWhite }"/>
        </transition>
    </div>
</template>

<script>
import InputErrorMessage from "@/components/shared/Form/Input/InputMessage/InputErrorMessage";
import InputSuccessMessage from "@/components/shared/Form/Input/InputMessage/InputSuccessMessage";

export default {
    name: "InputMessage",
    components: { InputSuccessMessage, InputErrorMessage },
    props: {
        isShown: {
            type: Boolean,
            required: true,
        },
        isInputValid: {
            type: Boolean,
            required: true,
        },
        errorMessage: {
            type: String,
            default: "",
        },
        successMessage: {
            type: String,
            default: "",
        },
        successMessageType: {
            type: String,
            default: "success",
        },
        isMessageWhite: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .input-message {
        min-height: 24px;
        font-size: 14px;
    }
</style>