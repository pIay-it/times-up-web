<template>
    <span :class="textClasses">
        {{ text }}
    </span>
</template>

<script>
export default {
    name: "NotDefinedText",
    props: {
        value: {
            type: undefined,
            required: true,
        },
    },
    computed: {
        text() {
            return this.value ? this.value : this.$t("NotDefinedText.notDefined");
        },
        textClasses() {
            return { "fst-italic text-muted": !this.value };
        },
    },
};
</script>