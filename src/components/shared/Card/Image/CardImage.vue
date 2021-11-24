<template>
    <img id="card-image" class="card-image small-shadow" :src="imageUrl" alt="Card Image Helper"/>
</template>

<script>
export default {
    name: "CardImage",
    props: {
        imageUrl: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .card-image {
        max-width: 100px;
        max-height: 100px;
        border: 1px solid #727272;
        border-radius: 15px;
    }
</style>