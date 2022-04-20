<template>
    <Transition name="fade" mode="out-in">
        <div v-show="isCountdownRunning" id="fullscreen-countdown-container">
            <ve-progress :progress="countdownProgress" animation="default 400 0">
                <template #default>
                    <Transition mode="out-in" name="translate-from-top" class="countdown-value-container">
                        <span :key="countdown" class="countdown-value" v-html="countdown"/>
                    </Transition>
                </template>
            </ve-progress>
        </div>
    </Transition>
</template>

<script setup>
import { computed } from "vue";
import useFullScreenCountdown from "@/composables/FullScreenCountdown/useFullScreenCountdown";

const { countdown, lastCountdown, isCountdownRunning } = useFullScreenCountdown();

const countdownProgress = computed(() => lastCountdown.value ? 100 - countdown.value * 100 / lastCountdown.value : 0);
</script>

<style lang="scss" scoped>
    #fullscreen-countdown-container {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        background: rgba(0, 0, 0, 0.75);

        .countdown-value-container {
            height: unset !important;
        }

        .countdown-value {
            margin-top: -350px;
            font-size: 3rem;
        }
    }
</style>