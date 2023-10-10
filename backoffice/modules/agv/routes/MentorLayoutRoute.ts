import { RouteRecordRaw } from "vue-router";
import { BancaPageRoute } from "./BancaPageRoute";
import { ComitatoPageRoute } from "./ComitatoPageRoute";
import { HomePageRoute } from "./HomePageRoute";
import { ContattoPageRoute } from "./ContattoPageRoute";
import { CorsiPageRoute } from "./CorsiPageRoute";
import { CorsoDetailsPageRoute } from "./CorsoDetailsPageRoute";
import { EventiPageRoute } from "./EventiPageRoute";
import { EventoDetailsPageRoute } from "./EventoDetailsPageRoute";
import { LinkUtiliPageRoute } from "./LinkUtiliPageRoute";

export const MentorLayoutPathRouter: RouteRecordRaw = {
  path: "/",
  component: () => import("../layouts/MentorLayout.vue"),
  children: [
    HomePageRoute,
    BancaPageRoute,
    ComitatoPageRoute,
    ContattoPageRoute,
    CorsiPageRoute,
    CorsoDetailsPageRoute,
    EventiPageRoute,
    EventoDetailsPageRoute,
    LinkUtiliPageRoute,
  ],
};
