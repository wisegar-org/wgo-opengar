/* eslint-disable @typescript-eslint/no-explicit-any */

import HomeComponent from "./components/HomeComponent/HomeComponent.vue";
export default function agv(app: any, router: any, store: any) {
  console.log(app, router, store);
  debugger;
  app.component("home-component", HomeComponent);
}
