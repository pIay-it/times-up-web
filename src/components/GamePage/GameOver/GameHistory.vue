<template>
    <div id="game-history" class="h-100 d-flex flex-column">
        <PageTitle v-html="$t('GameHistory.gameHistory')"/>
        <div id="game-history-content" class="flex-grow-1">
            CONTENT
        </div>
        <TimesUpFooter>
            <a href="#" class="times-up-anchor" @click.prevent="$emit('show-game-summary')">
                <i class="fa-solid fa-chevron-left fa-3x"/>
            </a>
        </TimesUpFooter>
    </div>
</template>

<script>
import PageTitle from "@/components/shared/Title/PageTitle";
import TimesUpFooter from "@/components/shared/Nav/TimesUpFooter";

export default {
    name: "GameHistory",
    components: { TimesUpFooter, PageTitle },
    emits: { "show-game-summary": () => true },
};
</script>