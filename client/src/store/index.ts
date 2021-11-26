import { store } from 'quasar/wrappers';
import Vuex, { Store } from 'vuex';
import { ComponentsStateInterface } from '../modules/wgo/store/ComponentsState/state';
import ComponentsStateModule, {
  componentsNamespace
} from '../modules/wgo/store/ComponentsState';

import { GithubStateInterface } from '../modules/finance';
import { getGithubModule, githubNamespace } from '../modules/finance';

import {
  agvComponentsModule,
  agvComponentsNamespace,
  agvEventsModule,
  agvEventsNamespace,
  agvInscriptionsModule,
  agvInscriptionsNamespace,
  agvPollsModule,
  agvPollsNamespace
} from '../modules/agv/store';
import { AGVComponentsStateInterface } from '../modules/agv/store/AGVComponentsState/state';
import { AGVEventsStateInterface } from 'src/modules/agv/store/AGVEvents/state';
import { AGVPollsStateInterface } from 'src/modules/agv/store/AGVPolls/state';
import { AGVInscriptionsStateInterface } from 'src/modules/agv/store/AGVInscriptions/state';
import { UserStateInterface } from 'src/modules/wgo/store/User/state';
import { MediaStateInterface } from 'src/modules/wgo/store/Media/state';
import { EmailStateInterface } from 'src/modules/wgo/store/Email/state';
import {
  emailModule,
  emailNamespace,
  languageModule,
  languageNamespace,
  mediaModule,
  mediaNamespace,
  seoModule,
  seoNamespace,
  userModule,
  userNamespace,
  wgoContactModule,
  wgoContactNamespace
} from 'src/modules/wgo/store';
import { LanguageStateInterface } from 'src/modules/wgo/store/Language/state';
import { SeoStateInterface } from 'src/modules/wgo/store/Seo/state';
import { CasinaModelsStateInterface } from 'src/modules/casina/store/CasinaModels/state';
import {
  casinaModelsModule,
  casinaModelsNamespace
} from 'src/modules/casina/store';

import { ContactStateInterface } from 'src/modules/casina/store/Contact/state';
import {
  contactNamespace,
  contactModule
} from './../modules/casina/store/Contact/index';
import { WGOContactStateInterface } from 'src/modules/wgo/store/Contact/state';

const GithubModule = getGithubModule(<StateInterface>{});

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  user: UserStateInterface;
  component: ComponentsStateInterface;
  media: MediaStateInterface;
  email: EmailStateInterface;
  language: LanguageStateInterface;
  seo: SeoStateInterface;
  github: GithubStateInterface;
  agvComponents: AGVComponentsStateInterface;
  agvEvents: AGVEventsStateInterface;
  agvPolls: AGVPollsStateInterface;
  agvInscriptions: AGVInscriptionsStateInterface;
  contact: ContactStateInterface;
  casinaModels: CasinaModelsStateInterface;
  wgoContact: WGOContactStateInterface;
}

let StoreVar: Store<StateInterface>;

export default store(function({ Vue }) {
  Vue.use(Vuex);

  StoreVar = new Vuex.Store<StateInterface>({
    modules: {
      [userNamespace]: userModule,
      [componentsNamespace]: ComponentsStateModule,
      [mediaNamespace]: mediaModule,
      [emailNamespace]: emailModule,
      [languageNamespace]: languageModule,
      [seoNamespace]: seoModule,
      [githubNamespace]: GithubModule,
      [agvComponentsNamespace]: agvComponentsModule,
      [agvEventsNamespace]: agvEventsModule,
      [agvPollsNamespace]: agvPollsModule,
      [agvInscriptionsNamespace]: agvInscriptionsModule,
      [contactNamespace]: contactModule,
      [casinaModelsNamespace]: casinaModelsModule,
      [wgoContactNamespace]: wgoContactModule 
    },

    strict: !!process.env.DEBUGGING
  });

  return StoreVar;
});
