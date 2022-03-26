<template>
    <div id="btn-container">
        <button :class="[classes, { disabled: isLoading || disabled }]"
                :disabled="isLoading || disabled" class="d-flex justify-content-center align-items-center"
                type="submit" @click="click">
            <Transition mode="out-in" name="fade">
                <div v-if="!isLoading" key="text">
                    <slot/>
                </div>
                <DualRingSpinner v-else key="isLoading" :size="loaderSize" color="white"/>
            </Transition>
        </button>
    </div>
</template>

<script>
import DualRingSpinner from "@/components/shared/Loader/DualRingSpinner";

export default {
    name: "SubmitButton",
    components: { DualRingSpinner },
    props: {
        classes: {
            type: String,
            default: "",
        },
        isLoading: {
            type: Boolean,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        loaderSize: {
            type: Number,
            default: 24,
        },
    },
    emits: { click: () => true },
    methods: {
        click(e) {
            if (!this.isLoading) {
                this.$emit("click", e);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    #btn-container {
        button {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .disabled {
        cursor: default !important;
        pointer-events: none;
    }
</style>