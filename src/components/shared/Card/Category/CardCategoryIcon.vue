<template>
    <div id="card-category-icon-container" class="text-center">
        <i id="card-category-icon" :class="categoryIconClasses"/>
    </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { CARD_CATEGORY } from "@/helpers/constants/Card";

const props = defineProps({
    category: {
        type: String,
        required: true,
    },
});

const categoryIconClasses = computed(() => ({
    [`${props.category}-card-category-color`]: true,
    "fa fa-user-astronaut": props.category === CARD_CATEGORY.PERSONALITY,
    "fa fa-robot": props.category === CARD_CATEGORY.CHARACTER,
    "fa fa-bag-shopping": props.category === CARD_CATEGORY.ACTIVITY,
    "fa fa-lightbulb": props.category === CARD_CATEGORY.OBJECT,
    "fa fa-utensils": props.category === CARD_CATEGORY.FOOD,
    "fa fa-seedling": props.category === CARD_CATEGORY.NATURE,
    "fa fa-map-pin": props.category === CARD_CATEGORY.PLACE,
    "fa fa-clock": props.category === CARD_CATEGORY.EVENT,
    "fa fa-palette": props.category === CARD_CATEGORY.ART,
    "fa fa-microscope": props.category === CARD_CATEGORY.TECHNOLOGY,
    "fa fa-shirt": props.category === CARD_CATEGORY.CLOTHES,
    "fa fa-film": props.category === CARD_CATEGORY.MOVIE,
    "fa fa-tv": props.category === CARD_CATEGORY.TV_SERIES,
    "fa fa-book-open": props.category === CARD_CATEGORY.BOOK,
    "fa fa-gamepad": props.category === CARD_CATEGORY.VIDEO_GAME,
    "fa fa-paint-brush": props.category === CARD_CATEGORY.PAINTING,
    "fa fa-masks-theater": props.category === CARD_CATEGORY.THEATRE_PLAY,
    "fa fa-pen-ruler": props.category === CARD_CATEGORY.SCULPTURE,
    "fa-brands fa-fort-awesome": props.category === CARD_CATEGORY.ARCHITECTURE,
    "fa fa-music": props.category === CARD_CATEGORY.MUSIC,
    "fa fa-cat": props.category === CARD_CATEGORY.ANIMAL,
    "fa fa-basketball": props.category === CARD_CATEGORY.SPORT,
    "fa fa-user-doctor": props.category === CARD_CATEGORY.JOB,
}));
</script>

<style lang="scss" scoped>
#card-category-icon-container {
    min-width: 20px;
}
</style>