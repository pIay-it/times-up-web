<template>
    <a id="play-it-button" href="#" type="button" class="d-flex align-items-center justify-content-center">
        <InlineSVG :src="PlayITButtonSVG" height="75" width="100"/>
    </a>
</template>

<script setup>
import PlayITButtonSVG from "@/assets/svg/play-it/play-it-button.svg";
</script>

<style lang="scss">
    #play-it-button {
        transition: all 0.5s ease;
    }

    .cant-start-game-button {
        filter: grayscale(1);
    }
</style>