<template>
    <div id="card-category-icon-container" class="text-center">
        <i id="card-category-icon" :class="categoryClasses"/>
    </div>
</template>

<script>
export default {
    name: "CardCategoryIcon",
    props: {
        category: {
            type: String,
            required: true,
        },
    },
    computed: {
        categoryClasses() {
            return {
                "fa fa-user-astronaut text-success": this.category === "personality",
                "fa fa-robot": this.category === "character",
                "fa fa-bag-shopping": this.category === "activity",
                "fa fa-lightbulb": this.category === "object",
                "fa fa-utensils": this.category === "food",
                "fa fa-seedling": this.category === "nature",
                "fa fa-map-pin": this.category === "place",
                "fa fa-clock": this.category === "event",
                "fa fa-palette": this.category === "art",
                "fa fa-microscope": this.category === "technology",
                "fa fa-shirt": this.category === "clothes",
                "fa fa-film": this.category === "movie",
                "fa fa-tv": this.category === "tv-series",
                "fa fa-book-open": this.category === "book",
                "fa fa-gamepad": this.category === "video-game",
                "fa fa-paint-brush": this.category === "painting",
                "fa fa-masks-theater": this.category === "theatre-play",
                "fa fa-pen-ruler": this.category === "sculpture",
                "fa-brands fa-fort-awesome": this.category === "architecture",
                "fa fa-music": this.category === "music",
                "fa fa-cat": this.category === "animal",
                "fa fa-basketball": this.category === "sport",
                "fa fa-user-doctor": this.category === "job",
            };
        },
    },
};
</script>

<style scoped>
    #card-category-icon-container {
        min-width: 20px;
    }
</style>