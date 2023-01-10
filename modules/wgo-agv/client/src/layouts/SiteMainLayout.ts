import { defineComponent } from "vue";
import HeaderComponent from "../components/Layouts/Header/HeaderComponent.vue";
import FooterComponent from "../components/Layouts/Footer/FooterComponent.vue";
import LogoComponent from "../components/Layouts/Logo/LogoComponent.vue";

export default defineComponent({
  name: "SiteMainLayout",
  components: {
    HeaderComponent,
    FooterComponent,
    LogoComponent,
  },
});
