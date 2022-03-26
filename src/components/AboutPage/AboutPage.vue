<template>
    <div id="about-page">
        <PageTitle v-html="$t('AboutPage.about')"/>
        <h2 class="about-section-title" v-html="$t('AboutPage.gameMasterRole.title')"/>
        <p class="about-section-content" v-html="$t('AboutPage.gameMasterRole.content')"/>
        <h2 class="about-section-title" v-html="$t('AboutPage.timesUpRules.title')"/>
        <h5 class="about-section-subtitle" v-html="$t('AboutPage.timesUpRules.teamComposition.title')"/>
        <p class="about-section-content" v-html="$t('AboutPage.timesUpRules.teamComposition.content')"/>
        <div id="about-footer" class="d-flex justify-content-around align-items-center pb-4">
            <BackButton to="/"/>
            <RouterLink to="/game-lobby">
                <PlayITButton/>
            </RouterLink>
        </div>
    </div>
</template>

<script>
import BackButton from "@/components/shared/Button/BackButton";
import PlayITButton from "@/components/shared/Button/PlayITButton";
import PageTitle from "@/components/shared/Title/PageTitle";

export default {
    name: "AboutPage",
    components: { PageTitle, PlayITButton, BackButton },
};
</script>

<style lang="scss">
    .about-section-title {
        font-size: 1.75rem;
        margin-bottom: 2rem;
    }

    .about-section-subtitle {
        font-size: 1.30rem;
        margin-bottom: 1rem;
    }

    .about-section-content {
        margin-bottom: 2rem;
        font-size: 1rem;
    }

    #about-footer {
        height: 80px;
    }
</style>