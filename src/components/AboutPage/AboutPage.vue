<template>
    <div id="about-page" class="d-flex flex-column">
        <div id="about-page-content" class="flex-grow-1">
            <PageTitle v-html="$t('AboutPage.about')"/>
            <h2 class="about-section-title" v-html="$t('AboutPage.gameMasterRole.title')"/>
            <p class="about-section-content" v-html="$t('AboutPage.gameMasterRole.content')"/>
            <h2 class="about-section-title" v-html="$t('AboutPage.timesUpRules.title')"/>
            <h5 class="about-section-subtitle" v-html="$t('AboutPage.timesUpRules.teamComposition.title')"/>
            <p class="about-section-content" v-html="$t('AboutPage.timesUpRules.teamComposition.content')"/>
        </div>
        <TimesUpFooter>
            <BackButton to="/"/>
            <RouterLink to="/game-lobby">
                <PlayITButton/>
            </RouterLink>
        </TimesUpFooter>
    </div>
</template>

<script setup>
import BackButton from "@/components/shared/Button/BackButton";
import PlayITButton from "@/components/shared/Button/PlayITButton";
import PageTitle from "@/components/shared/Title/PageTitle";
import TimesUpFooter from "@/components/shared/Nav/TimesUpFooter";
</script>

<style lang="scss">
    #about-page-content {
        overflow-y: scroll;

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
    }
</style>