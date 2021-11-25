<template>
    <div id="input-error-message" class="input-error-message my-1">
        <div v-if="text">
            <i class="fa fa-exclamation-circle me-1"/>
            <span v-html="text"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "InputErrorMessage",
    props: {
        text: {
            type: String,
            default: "",
        },
    },
};
</script>

<style lang="scss" scoped>
    .input-error-message {
        min-height: 24px;
        color: red;
    }
</style>