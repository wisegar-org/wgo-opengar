<template>
  <div class="row">
    <div class="col-12 col-sm-12 col-md-6 q-pa-sm q-pb-lg">
      <q-input
        :value="user.login"
        outlined
        readonly
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_USERNAME"
        dense
        stacked-label
      >
        <template v-slot:prepend>
          <q-avatar>
            <img :src="user.avatar_url" />
          </q-avatar>
        </template>
      </q-input>
    </div>
    <div class="col-12 col-sm-12 col-md-6 q-pa-sm q-pb-lg">
      <q-input
        :value="user.name"
        readonly
        outlined
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_NAME"
        dense
        stacked-label
      />
    </div>
    <div class="col-12 col-sm-12 col-md-6 q-pa-sm">
      <q-input
        :value="user.pay_by_hours"
        readonly
        outlined
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_PAY_BY_HOURS"
        dense
        :error="!user.pay_by_hours"
        stacked-label
      />
    </div>
    <!-- <div class="col-12 col-sm-12 col-md-6 q-pa-sm">
      <q-input
        :value="user.pay_to_internet"
        readonly
        outlined
        label="Pay to Internet"
        dense
        :error="!user.pay_to_internet"
        stacked-label
      />
    </div> -->
    <div v-if="!!user.card_number" class="col-12 col-sm-12 col-md-6 q-pa-sm">
      <q-input
        :value="user.card_number"
        readonly
        outlined
        :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_CARD_NUMBER"
        dense
        stacked-label
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import {
  languageGetters,
  languageNamespace,
} from '../../../../../wgo/store/Language';
import { CollaboratorRecord } from '@wisegar-org/wgo-base-models/build/models';
import { ITranslationFinanceAccountingKeys } from '../../TranslationsKeys';

@Component({})
export default class ShowInfoCollaboratorStep extends Vue {
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationFinanceAccountingKeys;
  @Prop({ required: true }) user!: CollaboratorRecord;
}
</script>
