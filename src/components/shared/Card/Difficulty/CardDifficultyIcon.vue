<template>
    <i :class="difficultyIconClasses"/>
</template>

<script>
export default {
    name: "CardDifficultyIcon",
    props: {
        difficulty: {
            type: Number,
            required: true,
        },
    },
    computed: {
        difficultyIconClasses() {
            return {
                "fa fa-seedling": this.difficulty === 1,
                "fa fa-cloud-rain": this.difficulty === 2,
                "fa fa-fire-flame-curved": this.difficulty === 3,
            };
        },
    },
};
</script>