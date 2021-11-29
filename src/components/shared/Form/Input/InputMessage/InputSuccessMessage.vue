<template>
    <div id="input-success-message" class="valid-feedback" :class="messageClasses">
        <i class="me-1" :class="messageIconClasses"/>
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
        type: {
            type: String,
            default: "success",
        },
    },
    computed: {
        messageClasses() {
            return { "info-feedback": this.type === "info" };
        },
        messageIconClasses() {
            return {
                "fa fa-check-circle": this.type === "success",
                "fa fa-circle-info": this.type === "info",
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .valid-feedback {
        display: block !important;
    }

    .info-feedback {
        color: #0500b1;
    }
</style>