// import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createSSRApp } from "vue";

// createApp(App).mount('#app')
createSSRApp(App).mount("#app");
