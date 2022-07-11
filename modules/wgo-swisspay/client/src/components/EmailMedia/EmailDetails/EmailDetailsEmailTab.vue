<template>
  <div class="row">
    <div class="col-12 col-md-6">
      <q-input
        square
        outlined
        readonly
        dense
        class="q-my-sm q-mx-sm"
        :model-value="email.from"
        :label="getLabel(translations.COLUMN_SENDER_FORM)"
      />
    </div>
    <div class="col-12 col-md-6">
      <q-input
        square
        outlined
        readonly
        dense
        class="q-my-sm q-mx-sm"
        :model-value="email.to"
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
        :model-value="email.subject"
        :autofocus="true"
        :label="getLabel(translations.COLUMN_SUBJECT)"
      />
    </div>
    <div class="col-12 col-md-6">
      <q-input
        square
        outlined
        readonly
        dense
        class="q-my-sm q-mx-sm"
        :model-value="date"
        :label="getLabel(translations.COLUMN_DATE)"
      />
    </div>
    <div class="col-12">
      <q-input
        square
        outlined
        readonly
        dense
        autogrow
        class="q-my-sm q-mx-sm"
        :model-value="email.text"
        :autofocus="true"
        :label="getLabel(translations.COLUMN_BODY)"
      />
    </div>
    <div class="col-12">
      <q-list bordered class="q-ma-sm text-left">
        <q-item-label header>{{ getLabel(translations.COLUMN_ATTACHMENTS) }}</q-item-label>
        <q-item v-for="(attch, index) in email.attachments || []" :key="`email_details_${index}_${attch.id}`">
          <q-item-section avatar>
            <q-icon color="primary" name="attach_email" />
          </q-item-section>
          <q-item-section>{{ attch.name }}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IEmailModel } from '../../../../../src/models/EmailModel';
import { BaseTranslateComponent } from '../../../../../../wgo-base/core/components/BaseComponents';
import { TranslationStore } from '../../../../../../wgo-base/translation/models/TranslationStore';
import { translations } from '../translations';
import { useTranslationStore } from '../../../stores/translationStore';
import { UtilService } from '../../../../../../wgo-base/core/services/UtilService';

export default defineComponent({
  name: 'EmailDetailsEmailTab',
  props: {
    email: {
      type: Object as PropType<IEmailModel>,
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
  computed: {
    date() {
      return UtilService.parseDate(this.email.date);
    },
  },
});
</script>
