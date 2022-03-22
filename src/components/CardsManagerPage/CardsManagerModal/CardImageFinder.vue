<template>
    <div id="card-image-find">
        <div class="input-group mb-2">
            <span class="input-group-text">
                <i class="fa fa-magnifying-glass"/>
            </span>
            <input v-model="search" type="text" class="form-control" :placeholder="$t('CardImageFinder.searchForCardImage')"/>
        </div>
        <transition id="card-image-finder-results-container" tag="div" mode="out-in" name="translate-from-top">
            <div v-if="!cleanSearch" key="waiting-for-input" class="text-muted fst-italic small d-flex align-items-center">
                <i class="fa fa-chevron-up me-3"/>
                <span v-html="$t('CardImageFinder.searchForImageByTypingRequest')"/>
            </div>
            <div v-else-if="isFetchingImages" key="loading" class="d-flex justify-content-center align-items-center">
                <DefaultLoader :text="$t('CardImageFinder.loadingImages')" :icon-size="32" :text-size="20"/>
            </div>
            <div v-else-if="images.length" id="card-image-finder-results" key="results" class="d-flex align-items-center">
                <div v-for="image of images" :key="image.URL">
                    <VTooltip>
                        <CardImage class="mx-1 cursor-pointer" :max-width="50" :max-height="50" :image-url="image.URL"
                                   @click="selectImageURL(image.URL)"/>
                        <template #popper>
                            <div class="text-center" v-html="image.title"/>
                            <div class="d-flex justify-content-center align-items-center">
                                <span v-html="$t('CardImageFinder.foundOn')"/>
                                <img :src="getImageSourceLogo(image.source)" class="ms-2 image-source-logo" alt="Source logo"/>
                            </div>
                            <hr class="my-1"/>
                            <div class="text-center">
                                <CardImage :max-width="100" :max-height="100" :image-url="image.URL" class="my-1 bg-white"/>
                            </div>
                        </template>
                    </VTooltip>
                </div>
            </div>
            <div v-else key="no-results" class="d-flex align-items-center justify-content-center text-muted">
                <i class="fa fa-question fa-2x me-2"/>
                <span v-html="$t('CardImageFinder.noResultFound')"/>
            </div>
        </transition>
    </div>
</template>

<script>
import uniqid from "uniqid";
import useError from "@/composables/Error/useError";
import CardImage from "@/components/shared/Card/Image/CardImage";
import DefaultLoader from "@/components/shared/Loader/DefaultLoader";
import { timeout } from "@/helpers/functions/Misc";
import wikipediaLogo from "@/assets/png/logos/wikipedia.png";
import flickrLogo from "@/assets/png/logos/flickr.png";

export default {
    name: "CardImageFinder",
    components: { DefaultLoader, CardImage },
    emits: { "image-url-selected": URL => typeof URL === "string" },
    setup() {
        const { displayError } = useError();
        return { displayError };
    },
    data() {
        return {
            images: [],
            search: "",
            isFetchingImages: false,
            requestId: undefined,
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
                await this.getImages();
            }
        },
    },
    methods: {
        async getImages() {
            const search = this.cleanSearch;
            const requestId = uniqid();
            this.requestId = requestId;
            this.isFetchingImages = true;
            await timeout(1000);
            if (requestId !== this.requestId) {
                return;
            }
            try {
                const { data } = await this.$timesUpAPI.getImages({ search });
                this.images = data;
            } catch (err) {
                this.displayError(err);
            } finally {
                this.isFetchingImages = false;
            }
        },
        getImageSourceLogo(source) {
            return source === "flickr" ? flickrLogo : wikipediaLogo;
        },
        selectImageURL(imageURL) {
            this.$emit("image-url-selected", imageURL);
        },
        reset() {
            this.search = "";
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

    .image-source-logo {
        max-height: 20px;
    }
</style>