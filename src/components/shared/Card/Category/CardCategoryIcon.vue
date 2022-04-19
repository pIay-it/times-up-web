<template>
    <div id="card-category-icon-container" class="text-center">
        <i id="card-category-icon" :class="categoryIconClasses"/>
    </div>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
    category: {
        type: String,
        required: true,
    },
});

const categoryIconClasses = computed(() => ({
    [`${props.category}-card-category-color`]: true,
    "fa fa-user-astronaut": props.category === "personality",
    "fa fa-robot": props.category === "character",
    "fa fa-bag-shopping": props.category === "activity",
    "fa fa-lightbulb": props.category === "object",
    "fa fa-utensils": props.category === "food",
    "fa fa-seedling": props.category === "nature",
    "fa fa-map-pin": props.category === "place",
    "fa fa-clock": props.category === "event",
    "fa fa-palette": props.category === "art",
    "fa fa-microscope": props.category === "technology",
    "fa fa-shirt": props.category === "clothes",
    "fa fa-film": props.category === "movie",
    "fa fa-tv": props.category === "tv-series",
    "fa fa-book-open": props.category === "book",
    "fa fa-gamepad": props.category === "video-game",
    "fa fa-paint-brush": props.category === "painting",
    "fa fa-masks-theater": props.category === "theatre-play",
    "fa fa-pen-ruler": props.category === "sculpture",
    "fa-brands fa-fort-awesome": props.category === "architecture",
    "fa fa-music": props.category === "music",
    "fa fa-cat": props.category === "animal",
    "fa fa-basketball": props.category === "sport",
    "fa fa-user-doctor": props.category === "job",
}));
</script>

<style lang="scss" scoped>
    #card-category-icon-container {
        min-width: 20px;
    }
</style>