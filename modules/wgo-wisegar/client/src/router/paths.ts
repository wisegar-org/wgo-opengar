import {
  translationsFinanceIssues,
  translationsIndexContentAdmin,
} from "src/models";
import { AdminBasePath } from "src/wgo-base/core/router";
import { IRouteObject, translations } from "../wgo-base/core/models";
import { FinanceBasePath } from "./paths/finance";

export const Paths: IRouteObject = {
  home: {
    path: "/",
    label: translations.HOME,
    name: "home",
    auth: false,
  },
  adminIndexContent: {
    path: `${AdminBasePath}/indexContent`,
    label: translationsIndexContentAdmin.TITLE,
    name: "adminIndexContent",
    auth: true,
  },
  financeIssues: {
    path: `${FinanceBasePath}/issues`,
    label: translationsFinanceIssues.TITLE,
    name: "financeIssues",
    auth: true,
  },
};
