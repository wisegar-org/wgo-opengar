<template>
  <Dialog
    :open="open"
    icon="translate"
    title="Translation"
    :persistent="true"
    :showClose="true"
    maxWidth="900px"
    @close="close"
  >
    <q-card flat square class="q-pa-none">
      <q-form @submit="saveTranslation" class="q-pa-none">
        <q-card-section class="row q-pa-none">
          <div class="col-12 fit">
            <SimpleLanguageSelector
              :languages="langStore.allLangs"
              :selected="lang"
              @select="selectLang"
              class="fit text-start"
            />
          </div>
          <div class="col-12">
            <q-input
              square
              outlined
              class="q-my-sm q-mx-sm"
              v-model="translationList[lang.id].key"
              required
              :readonly="!!translation.key"
              :label="
                translationsContent.WGO_USERS_COLUMN_USERNAME_LABEL || 'Code'
              "
            />
          </div>
          <div class="col-12">
            <q-input
              square
              outlined
              class="q-my-sm q-mx-sm"
              v-model="translationList[lang.id].value"
              required
              :label="
                translationsContent.WGO_USERS_COLUMN_USERNAME_LABEL || 'Value'
              "
            />
          </div>
        </q-card-section>
        <q-card-actions align="center" vertical class="row q-pa-sm q-py-md">
          <q-btn
            unelevated
            dense
            color="primary"
            align="around"
            class="btn_width_fix col-12 col-sm-4"
            :label="translationsContent.WGO_REGISTER_LABEL || 'Save'"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { ITranslationModel } from "../../models";
import Dialog from "../../../core/components/Dialog/Dialog.vue";
import { TranslationStore } from "../../models/TranslationStore";
import { LanguageStore } from "../../../language/models/LanguageStore";
import SimpleLanguageSelector from "../../../language/components/SimpleLanguageSelector/SimpleLanguageSelector.vue";
import { ILanguageModel } from "../../../language/models";

export default defineComponent({
  name: "TranslationDialog",
  props: {
    open: { type: Boolean, default: false },
    translation: {
      type: Object as PropType<ITranslationModel>,
      default: {} as ITranslationModel,
    },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    langStore: { type: Object as PropType<LanguageStore>, required: true },
  },
  components: {
    Dialog,
    SimpleLanguageSelector,
  },
  data() {
    return {
      translationList: {} as { [key: string]: ITranslationModel },
      translationsContent: {},
      lang: this.langStore.selectedLang,
    };
  },
  methods: {
    async selectLang(lang: ILanguageModel) {
      if (!this.translationList[lang.id]) {
        const translation = await this.tranStore.getTranslationByLanguage(
          lang.id,
          this.translation.key
        );
        this.translationList[lang.id] = {
          id: this.translation.key,
          key: this.translation.key,
          value: translation,
          languageId: lang.id,
        };
      }
      this.lang = lang;
    },
    async saveTranslation() {
      const input = Object.values(this.translationList).map(
        (trans) =>
          ({
            key: trans.key,
            value: trans.value,
            languageId: trans.languageId,
          } as any)
      );
      const result = await this.tranStore.setTranslation({
        translations: input,
      });
      if (result) {
        this.tranStore.translations[this.translation.key] =
          this.translationList[this.translation.languageId];
        this.tranStore.translationsValue[this.translation.key] =
          this.translationList[this.translation.languageId].value;
        this.$emit("onSet");
        this.close();
      }
    },
    close() {
      this.$emit("close");
    },
  },
  emits: ["onSet"],
  watch: {
    translation() {
      if (this.translation && this.translation.languageId) {
        this.translationList = {
          [this.translation.languageId]: { ...this.translation },
        };
        this.selectLang(this.langStore.selectedLang);
      }
    },
  },
});
</script>

<style scoped>
.btn_width_fix {
  min-width: 100px;
}
</style>
