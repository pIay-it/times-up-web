<template>
    <div id="times-up-footer" class="mt-3 w-100 d-flex justify-content-center align-items-center">
        <Transition mode="out-in" name="translate-from-top">
            <div v-if="!isLoading" id="times-up-footer-content" key="times-up-footer-content"
                 class="d-flex justify-content-around align-items-center flex-grow-1">
                <slot/>
            </div>
            <DefaultLoader v-else key="times-up-footer-loader" :text="loadingText"/>
        </Transition>
    </div>
</template>

<script>
import DefaultLoader from "@/components/shared/Loader/DefaultLoader";

export default {
    name: "TimesUpFooter",
    components: { DefaultLoader },
    props: {
        isLoading: {
            type: Boolean,
            default: false,
        },
        loadingText: {
            type: String,
            default: "",
        },
    },
};
</script>

<style lang="scss">
    #times-up-footer {
        height: 80px;

        #times-up-footer-content {
            & > * {
                width: 100px;
                text-align: center;
            }
        }
    }
</style>