import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { usePlugins } from "@/plugins";
import "./assets/scss/styles.scss";

const timesUpApp = createApp(App);
usePlugins(timesUpApp);
store.$app = timesUpApp;
timesUpApp.use(store);
timesUpApp.mount("#app");