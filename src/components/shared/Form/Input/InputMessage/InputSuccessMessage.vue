<template>
    <div id="input-success-message" class="valid-feedback">
        <i class="fa fa-check-circle me-1"/>
        <span v-html="text"/>
    </div>
</template>

<script>
export default {
    name: "InputSuccessMessage",
    props: {
        text: {
            type: String,
            default: "",
        },
    },
};
</script>

<style lang="scss" scoped>
    .valid-feedback {
        display: block !important;
    }
</style>