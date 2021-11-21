import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { usePlugins } from "@/plugins";
import "./assets/scss/styles.scss";

const timesUpApp = createApp(App);
usePlugins(timesUpApp);
timesUpApp.use(store).mount("#app");