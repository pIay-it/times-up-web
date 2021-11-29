<template>
    <div class="text-input">
        <label class="form-label" :for="name" v-html="label"/>
        <RedAsterisk v-if="isRequired"/>
        <input :id="name" ref="input" :name="name" type="text" :value="inputValue" :placeholder="placeholderText" class="form-control"
               :class="inputClasses" :disabled="isDisabled" @input="onChange" @blur="onBlur"/>
        <InputMessage :is-shown="isTouchedOrDirty" :is-valid="meta.valid" :error-message="errorMessage" :success-message="successMessage"
                      :success-message-type="successMessageType"/>
    </div>
</template>

<script>
import { useField } from "vee-validate";
import InputMessage from "@/components/shared/Form/Input/InputMessage/InputMessage";
import RedAsterisk from "@/components/shared/Form/RedAsterisk";

export default {
    name: "TextInput",
    components: { RedAsterisk, InputMessage },
    props: {
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
    },
    emits: { change: () => true, blur: () => true },
    setup(props) {
        const options = { initialValue: props.value };
        const {
            value: inputValue,
            errorMessage,
            handleBlur,
            handleChange,
            meta,
            resetField: reset,
            validate,
        } = useField(props.name, undefined, options);
        return { handleChange, handleBlur, errorMessage, inputValue, meta, reset, validate };
    },
    computed: {
        placeholderText() {
            if (this.placeholder) {
                return this.placeholder;
            }
            return this.isRequired ? this.$t("Form.required") : this.$t("Form.optional");
        },
        isTouchedOrDirty() {
            const { dirty, touched } = this.meta;
            return dirty || touched;
        },
        inputClasses() {
            const { valid } = this.meta;
            return {
                "is-valid": this.isTouchedOrDirty && valid,
                "is-invalid": this.isTouchedOrDirty && !valid,
            };
        },
    },
    methods: {
        focus() {
            this.$refs.input.focus();
        },
        setValue(value) {
            this.inputValue = value;
        },
        getValue() {
            return this.inputValue;
        },
        onChange(value) {
            this.handleChange(value);
            this.$emit("change", this.inputValue);
        },
        onBlur(event) {
            this.$emit("blur", event);
            this.validate();
            this.handleBlur(event);
        },
    },
};
</script>