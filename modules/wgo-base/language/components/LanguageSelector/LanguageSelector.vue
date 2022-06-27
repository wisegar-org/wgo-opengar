<template>
  <q-btn-dropdown
    no-caps
    flat
    outline
    unelevated
    icon="language"
    :label="langStore.selectedLang.code"
  >
    <q-list>
      <q-item
        v-for="(item, index) in langStore.allLangs"
        :key="`languageSelector-${index}-${item.id}`"
        @click="() => selectLanguage(item)"
        clickable
        v-close-popup
      >
        <q-item-section>
          <q-item-label>{{ item.code }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { ILanguageModel } from "../../models";
import { LanguageStore } from "../../models/LanguageStore";

export default defineComponent({
  name: "LanguageSelector",
  props: {
    langStore: { type: Object as PropType<LanguageStore>, required: true },
  },
  setup() {},
  methods: {
    selectLanguage(lang: ILanguageModel) {
      this.langStore.selectedLang = lang;
    },
  },
});
</script>
