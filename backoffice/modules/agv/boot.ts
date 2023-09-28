/* eslint-disable @typescript-eslint/no-explicit-any */

import ComitatoComponent from "./components/ComitatoComponent/ComitatoComponent.vue";
import ComitatoContactForm from "./components/ComitatoContactForm/ComitatoContactForm.vue";
import ContactComponent from "./components/ContactComponent/ContactComponent.vue";
import ContactForm from "./components/ContactForm/ContactForm.vue";
import HomeComponent from "./components/HomeComponent/HomeComponent.vue";
export default function agv(app: any, router: any, store: any) {
  console.log(app, router, store);
  app.component("home-component", HomeComponent);
  app.component("comitato-component", ComitatoComponent);
  app.component("comitato-contact-form", ComitatoContactForm);
  app.component("contact-form", ContactForm);
  app.component("contact-component", ContactComponent);
}
