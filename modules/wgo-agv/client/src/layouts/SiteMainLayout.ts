import { defineComponent } from "vue";
import HeaderComponent from "../components/Layouts/Header/Header.vue";
import FooterComponent from "../components/Layouts/Footer/Footer.vue";
import Logo from "../components/Layouts/Logo/Logo.vue";

export default defineComponent({
  name: "SiteMainLayout",
  components: {
    HeaderComponent,
    FooterComponent,
    Logo,
  },
});
