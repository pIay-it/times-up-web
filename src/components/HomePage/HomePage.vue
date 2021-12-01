<template>
    <div id="home-page" class="d-flex flex-column align-items-center justify-content-center">
        <div>
            <h1 class="text-center moms-dinner-font" v-html="$t('HomePage.timesUp')"/>
            <h1 class="text-center nuevo-litho-font" v-html="$t('HomePage.cardTitle')"/>
        </div>
        <div class="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <RouterLink class="btn btn-primary mb-2 btn-lg" to="/game-lobby">
                <i class="fa fa-gamepad me-2"/>
                <span v-html="$t('HomePage.play')"/>
            </RouterLink>
            <RouterLink class="btn btn-secondary btn-lg" to="/about">
                <i class="fa fa-question me-2"/>
                <span v-html="$t('HomePage.about')"/>
            </RouterLink>
        </div>
        <div>
            HOME FOOTER
        </div>
    </div>
</template>

<script>
export default { name: "HomePage" };
</script>