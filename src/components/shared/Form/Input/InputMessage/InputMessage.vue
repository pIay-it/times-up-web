<template>
    <div id="input-message" class="input-message d-flex align-items-center">
        <transition name="translate-down-fade" mode="out-in">
            <InputErrorMessage v-if="errorMessage" key="error-message" :text="errorMessage"/>
            <InputSuccessMessage v-else-if="isValid && successMessage" key="success-message" :text="successMessage"/>
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
        isValid: {
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
    },
};
</script>

<style lang="scss" scoped>
    .input-message {
        min-height: 24px;
        font-size: 14px;
    }
</style>