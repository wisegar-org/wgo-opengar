<template>
  <div class="row">
    <div class="col-12 col-md-6">
      <q-input
        square
        outlined
        readonly
        dense
        class="q-my-sm q-mx-sm"
        :model-value="emailMedia.name"
        :label="getLabel(translations.COLUMN_NAME)"
      />
    </div>
    <div class="col-12 col-md-6">
      <q-input
        square
        outlined
        readonly
        dense
        class="q-my-sm q-mx-sm"
        :model-value="emailMedia.senderTo"
        :label="getLabel(translations.COLUMN_SENDER_TO)"
      />
    </div>
    <div class="col-12 col-md-6">
      <q-input
        square
        outlined
        readonly
        dense
        class="q-my-sm q-mx-sm"
        :model-value="getLabel(translations.COLUMN_FILE_EXT)"
        :label="'File Ext'"
      />
    </div>
    <div class="col-12 col-md-6">
      <q-input
        square
        outlined
        readonly
        dense
        class="q-my-sm q-mx-sm"
        :model-value="emailMedia.contentType"
        :label="getLabel(translations.COLUMN_CONTENT_TYPE)"
      />
    </div>
    <div class="col-12 col-md-6">
      <q-input
        square
        outlined
        readonly
        dense
        class="q-my-sm q-mx-sm"
        :model-value="emailMedia.size"
        :label="getLabel(translations.COLUMN_SIZE)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IEmailMediaModel } from '../../../../../src/models/EmailModel';
import { BaseTranslateComponent } from '../../../wgo-base/core/components/BaseComponents';
import { TranslationStore } from '../../../wgo-base/translation/models/TranslationStore';
import { translations } from '../translations';
import { useTranslationStore } from '../../../stores/translationStore';

export default defineComponent({
  name: 'EmailDetailsMediaTab',
  props: {
    emailMedia: {
      type: Object as PropType<IEmailMediaModel>,
      default: {},
    },
  },
  setup() {
    const tranStore = useTranslationStore();
    const { getLabel } = new BaseTranslateComponent();
    return {
      translations,
      getLabel: (name: string) => getLabel(tranStore.translationStore as TranslationStore, name),
    };
  },
});
</script>
