<template>
    <RouterLink id="back-button" v-tooltip="$t('BackButton.back')" :to="to" type="button">
        <i class="fa-solid fa-chevron-left fa-3x"/>
    </RouterLink>
</template>

<script>
export default {
    name: "BackButton",
    props: {
        to: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    #back-button {
        text-decoration: none;
        color: white;
    }
</style>