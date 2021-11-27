<template>
    <div class="invalid-feedback">
        <i class="fa fa-exclamation-circle me-1"/>
        <span v-html="text"/>
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
    .invalid-feedback {
        display: block !important;
    }
</style>