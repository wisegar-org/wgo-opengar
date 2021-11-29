<template>
  <div :style="style">
    <div class="row">
      <q-btn-dropdown unelevated color="primary" :style="style">
        <template v-if="selected" v-slot:label>
          <div class="row" :style="style">
            <q-icon v-if="selected.logo" left>
              <q-img :src="selected.logo.url" :ratio="9 / 6" />
            </q-icon>
            <div class="text-center q-pl-sm">
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
                    <q-img
                      :src="item.logo.url"
                      :ratio="9 / 5"
                      style="width: 80%"
                    />
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
    </div>
  </div>
</template>

<script lang="ts">
import { LanguageResponseGql } from '../../../../../graphql';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../../../store/Language';

@Component({})
export default class LanguageSimpleSelect extends Vue {
  @Action(languageActions.loadAllLanguage, { namespace: languageNamespace })
  loadData!: (force: boolean) => Promise<unknown>;
  @Getter(languageGetters.getEnabledLanguages, { namespace: languageNamespace })
  languages!: LanguageResponseGql[];

  @Prop() langSelected!: (lang: LanguageResponseGql) => unknown;
  @Prop() language!: LanguageResponseGql;
  @Prop({ default: false }) fullWidth!: boolean;

  style = !!this.fullWidth ? 'width: 100%;' : '';
  selected: LanguageResponseGql | null = this.language || null;

  selectLanguage(lang: LanguageResponseGql) {
    this.selected = lang;
    if (this.langSelected) this.langSelected(lang);
  }

  @Watch('language')
  changeLanguage() {
    this.selected = this.language;
  }

  async mounted() {
    await this.loadData(false);
    if (!this.selected && this.languages.length) {
      this.selectLanguage(this.languages[0]);
    }
  }
}
</script>
