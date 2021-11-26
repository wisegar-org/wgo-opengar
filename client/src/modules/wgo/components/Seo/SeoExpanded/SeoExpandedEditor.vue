<template>
  <Expanded
    :label="`${translationContent.WGO_SEO_META_EDITOR_PROP_LABEL}: ${prop}`"
    :icon="icon"
  >
    <template slot="content">
      <q-input
        square
        outlined
        class="q-ma-sm"
        lazy-rules="ondemand"
        :autofocus="true"
        :label="translationContent.WGO_SEO_CONTENT_META_LABEL"
        standout="bg-primary text-white"
        dense
        v-model="metaValue"
        counter
        :type="getType()"
      />
    </template>
  </Expanded>
  <!-- <q-expansion-item
    popup
    :group="groupName"
    :icon="icon"
    :label="`${translationContent.WGO_SEO_META_EDITOR_PROP_LABEL}: ${prop}`"
  >
    <q-separator />
    <q-card>
      <q-card-section class="q-pa-none">
        <div>
          <q-input
            square
            outlined
            class="q-ma-sm"
            lazy-rules="ondemand"
            :autofocus="true"
            :label="translationContent.WGO_SEO_CONTENT_META_LABEL"
            standout="bg-primary text-white"
            dense
            v-model="metaValue"
            counter
            :type="getType()"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item> -->
</template>

<script lang="ts">
import { SeoMetaResponseGql } from 'src/graphql';
import {
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { ITranslationSeoKeys } from '../TranslationsKeys';
import Expanded from '../../Expanded/Expanded.vue';

@Component({
  components: {
    Expanded
  }
})
export default class SeoExpandedEditor extends Vue {
  @Prop() groupName!: string;
  @Prop() icon!: string;
  @Prop() meta!: SeoMetaResponseGql;
  @Prop() prop!: string;
  @Prop() onChange!: (value: string) => unknown;

  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationSeoKeys;

  metaValue = this.meta.content;

  getType() {
    return this.meta.type ? this.meta.type : 'text';
  }

  @Watch('metaValue')
  changeContent() {
    this.onChange(this.metaValue);
  }
}
</script>
