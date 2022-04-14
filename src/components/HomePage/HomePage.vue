<template>
    <div id="home-page" class="d-flex flex-column align-items-center justify-content-center">
        <div class="d-flex justify-content-center h-50">
            <h1 id="home-page-title" class="text-center moms-dinner-font text-uppercase" v-html="$t('HomePage.timesUp')"/>
        </div>
        <div class="d-flex h-50 flex-column justify-content-around align-items-center">
            <RouterLink class="btn-times-up" to="/game-lobby">
                <span v-html="$t('HomePage.playIT')"/>
            </RouterLink>
            <RouterLink id="about-link" class="times-up-anchor mt-2" to="/about">
                <span v-html="$t('HomePage.about')"/>
            </RouterLink>
        </div>
    </div>
</template>

<script>
export default { name: "HomePage" };
</script>

<style lang="scss">
    #home-page-title {
        font-size: 5rem;
    }

    #about-link {
        font-weight: bolder;
        font-size: 1.5rem;
    }
</style>