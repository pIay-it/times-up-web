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

<script setup>
import { defineProps, defineEmits } from "vue";
import DualRingSpinner from "@/components/shared/Loader/DualRingSpinner";

const emit = defineEmits({ click: () => true });

const props = defineProps({
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
});

const click = event => {
    if (!props.isLoading) {
        emit("click", event);
    }
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