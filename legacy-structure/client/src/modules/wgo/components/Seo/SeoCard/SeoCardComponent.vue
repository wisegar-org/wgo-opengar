<template>
  <div v-if="metaData.length > 0">
    <q-card flat bordered class="my-card">
      <q-card-section class="q-py-sm">
        <div class="text-subtitle1" style="text-align: center;">
          {{ translationContent.WGO_SEO_META_CARD_TITLE_LABEL }}
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-section class="q-py-sm">
        <div
          v-for="(item, key) in metaData"
          :key="key"
          class="row justify-center"
        >
          <div class="col-auto q-px-sm">{{ item.name + ':' }}</div>
          <div class="col-auto q-px-sm">{{ item.value }}</div>
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-actions class="q-py-sm justify-center">
        <q-btn
          unelevated
          icon="edit"
          color="primary"
          class="cursor-pointer"
          @click="() => (showEditMedaData = true)"
        />
        <q-btn
          unelevated
          icon="delete"
          class="cursor-pointer"
          color="primary"
          @click="onDelete"
        />
      </q-card-actions>
    </q-card>
    <SeoEditorDialog
      :metaData="metaData"
      :showModal="showEditMedaData"
      :close="() => (showEditMedaData = false)"
      :save="onChange"
    />
  </div>
</template>

<script lang="ts">
import { languageGetters, languageNamespace } from '../../../store/Language';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { ITranslationSeoKeys } from '../TranslationsKeys';
import SeoEditorDialog from './../SeoEditor/SeoEditorDialog.vue';

@Component({
  components: {
    SeoEditorDialog
  }
})
export default class SeoCardComponent extends Vue {
  @Prop() metaData!: { name: string; value: string }[];
  @Prop() onChange!: (metaData: { name: string; value: string }[]) => unknown;
  @Prop() onDelete!: () => unknown;
  showEditMedaData = false;

  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationSeoKeys;
}
</script>
