<template>
  <q-btn-dropdown class="dropdown-user" flat size="sm" color="white" no-caps>
    <template v-if="selected" v-slot:label>
      <div class="row items-center no-wrap">
        <q-icon v-if="selected.logo" left>
          <q-img :src="selected.logo.url" :ratio="9 / 6" />
        </q-icon>
        <div class="text-center">
          {{ selected.code }}
        </div>
      </div>
    </template>
    <div class="row no-wrap">
      <div class="column full-width">
        <q-list>
          <template v-for="(item, index) in languages">
            <q-item
              clickable
              v-close-popup
              @click="
                () => {
                  selectLanguage(item);
                }
              "
              :key="item.code + index"
            >
              <q-item-section avatar v-if="item.logo && item.logo.url">
                <q-img :src="item.logo.url" :ratio="9 / 5" style="width: 80%" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.code }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </div>
    </div>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { ILanguageConfig } from '../../../../../i18n';
import { Action, Getter, Mutation } from 'vuex-class';
import {
  languageActions,
  languageGetters,
  languageMutations,
  languageNamespace,
} from '../../../store/Language';
import { LanguageResponseGql } from '../../../../../graphql';
import { userActions, userGetters, userNamespace } from '../../../store/User';
import { UserLogged } from '@wisegar-org/wgo-base-models/build/models';
import { coreUIMutationsKeys } from '../../../store/ComponentsState/mutations';
import { componentsNamespace } from '../../../store';

@Component({})
export default class LanguageSelect extends Vue {
  @Action(languageActions.loadAndSetLanguage, { namespace: languageNamespace })
  setLanguageSite!: (lang: number) => Promise<boolean>;
  @Action(languageActions.loadAllLanguage, { namespace: languageNamespace })
  loadData!: (force: boolean) => Promise<LanguageResponseGql[]>;
  @Action(languageActions.loadAllRegisterTranslations, {
    namespace: languageNamespace,
  })
  loadAllRegisterTranslations!: () => Promise<boolean>;
  @Getter(languageGetters.getEnabledLanguages, { namespace: languageNamespace })
  languages!: LanguageResponseGql[];
  @Getter(languageGetters.getLanguage, { namespace: languageNamespace })
  language!: LanguageResponseGql;
  @Mutation(languageMutations.setLanguage, { namespace: languageNamespace })
  setLanguage!: (lang: LanguageResponseGql) => Promise<unknown>;
  @Getter(userGetters.getLoggedUser, { namespace: userNamespace })
  userLogged!: UserLogged;
  @Action(userActions.setUserLanguage, { namespace: userNamespace })
  setUserLanguage!: (user: unknown) => Promise<unknown>;
  @Mutation(coreUIMutationsKeys.setInnerLoading, {
    namespace: componentsNamespace,
  })
  setInnerLoading!: (loading: boolean) => void;
  @Prop() languagesConfig!: ILanguageConfig;

  selected: LanguageResponseGql | null = null;

  async selectLanguage(record: LanguageResponseGql) {
    if (!this.selected || this.selected.code !== record.code) {
      this.setInnerLoading(true);
      await this.setLanguage(record);
      await this.setUserLanguage({
        uuid: this.userLogged ? this.userLogged.uuid : '0',
        langId: record.id,
      });
      await this.loadAllRegisterTranslations();

      this.setInnerLoading(false);
    }
  }

  @Watch('userLogged')
  async setLanguageByUser() {
    await this.setLanguageSite(
      this.userLogged ? this.userLogged.languageId : 0
    );
    this.selected = this.language;
  }

  @Watch('language')
  setLanguageSlected() {
    this.selected = this.language;
  }

  async mounted() {
    await this.loadData(false);
    await this.setLanguageByUser();
  }
}
</script>
