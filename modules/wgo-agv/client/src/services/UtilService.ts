import { openURL } from "quasar";

export const UtilService = {
  openNewTab(evt: Event, url: string) {
    evt.preventDefault();
    if (location.href.includes("/#")) {
      openURL(`/#${url}`);
    } else {
      openURL(url);
    }
  },
};
