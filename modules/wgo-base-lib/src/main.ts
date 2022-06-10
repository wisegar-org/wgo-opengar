import { createApp } from "vue";
import App from "./App.vue";

const myV3App = createApp(App);
// myV3App.component("SomeComponent", SomeComponent);
// // myV3App.use(SomePlugin).use(router);
myV3App.mount("#app");
