<template>
    <div class="text-input">
        <label class="form-label" :for="name" v-html="label"/>
        <RedAsterisk v-if="isRequired"/>
        <input :id="name" ref="input" :name="name" type="text" :value="inputValue" :placeholder="placeholderText" class="form-control"
               :class="inputClasses" :disabled="isDisabled" @input="onChange" @blur="onBlur"/>
        <InputMessage :is-shown="isTouchedOrDirty" :is-input-valid="meta.valid" :error-message="errorMessage" :success-message="successMessage"
                      :success-message-type="successMessageType"/>
    </div>
</template>

<script setup>
import { computed, defineEmits, defineExpose, defineProps, ref } from "vue";
import { useField } from "vee-validate";
import { useI18n } from "vue-i18n";
import InputMessage from "@/components/shared/Form/Input/InputMessage/InputMessage";
import RedAsterisk from "@/components/shared/Form/RedAsterisk";

const emit = defineEmits({
    change: () => true,
    blur: () => true,
});

const props = defineProps({
    value: {
        type: String,
        default: "",
    },
    isRequired: {
        type: Boolean,
        default: false,
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    successMessage: {
        type: String,
        default: "",
    },
    successMessageType: {
        type: String,
        default: "success",
    },
    placeholder: {
        type: String,
        default: "",
    },
});

const input = ref(null);
const options = { initialValue: props.value };
const { errorMessage, handleBlur, handleChange, meta, validate, resetField: reset, value: inputValue } = useField(props.name, undefined, options);
const { t } = useI18n();

const placeholderText = computed(() => {
    if (props.placeholder) {
        return props.placeholder;
    }
    return props.isRequired ? t("Form.required") : t("Form.optional");
});
const isTouchedOrDirty = computed(() => {
    const { dirty, touched } = meta;
    return dirty || touched;
});
const inputClasses = computed(() => {
    const { valid } = meta;
    return {
        "is-valid": isTouchedOrDirty.value && valid,
        "is-invalid": isTouchedOrDirty.value && !valid,
    };
});

const focus = () => input.value.focus();
const setValue = value => (inputValue.value = value);
const getValue = () => inputValue.value;
const onChange = value => {
    handleChange(value);
    emit("change", inputValue.value);
};
const onBlur = event => {
    emit("blur", event);
    validate();
    handleBlur(event);
};
defineExpose({
    focus,
    setValue,
    getValue,
    reset,
});
</script>