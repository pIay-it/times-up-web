<template>
    <div id="card-image-find">
        <input v-model="search" type="text" class="form-control mb-2"/>
        <transition id="card-image-finder-results-container" tag="div" mode="out-in" name="translate-down-fade">
            <div v-if="cleanSearch" id="card-image-finder-results" key="results" class="d-flex align-items-center">
                <div v-for="imageURL of imagesURLFound" :key="imageURL">
                    <CardImage class="mx-1" :max-width="50" :max-height="50" :image-url="imageURL" @click="selectImageURL(imageURL)"/>
                </div>
            </div>
            <div v-else key="waiting-for-input" class="text-muted fst-italic small d-flex align-items-center">
                <i class="fa fa-chevron-up me-3"/>
                <span v-html="$t('CardImageFinder.searchForImageByTypingRequest')"/>
            </div>
        </transition>
    </div>
</template>

<script>
import Axios from "axios";
import { stringify } from "qs";
import useErrorManager from "@/composables/Error/useErrorManager";
import CardImage from "@/components/shared/Card/Image/CardImage";

export default {
    name: "CardImageFinder",
    components: { CardImage },
    emits: { "image-url-selected": URL => typeof URL === "string" },
    setup() {
        const { displayError } = useErrorManager();
        return { displayError };
    },
    data() {
        return {
            imagesURLFound: [],
            search: "",
        };
    },
    computed: {
        cleanSearch() {
            return this.search.trim();
        },
    },
    watch: {
        async search(newSearch, oldSearch) {
            if (this.cleanSearch && oldSearch.trim() !== newSearch.trim()) {
                await this.getImagesOnWikipedia();
            }
        },
    },
    methods: {
        async getImagesOnWikipedia() {
            try {
                const queryString = stringify({ q: this.search, limit: 20 });
                const { data } = await Axios.get(`https://fr.wikipedia.org/w/rest.php/v1/search/title?${queryString}`);
                this.imagesURLFound = data.pages.reduce((acc, page) => {
                    if (page?.thumbnail && !acc.includes(page?.thumbnail.url)) {
                        return [...acc, `https:${page?.thumbnail.url}`];
                    }
                    return acc;
                }, []);
            } catch (err) {
                this.displayError(err);
            }
        },
        selectImageURL(imageURL) {
            this.$emit("image-url-selected", imageURL);
        },
    },
};
</script>

<style lang="scss" scoped>
    #card-image-finder-results-container {
        min-height: 60px;
        width: 100%;
        overflow-x: auto;
    }
</style>