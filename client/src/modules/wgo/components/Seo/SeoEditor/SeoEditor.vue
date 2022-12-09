<template>
  <div class="q-pa-md" style="width: 100%">
    <q-table
      bordered
      flat
      title=""
      :data="data"
      :columns="columns"
      row-key="nameSeo"
      :rows-per-page-label="translationContent.WGO_RECORD_PER_PAGE_LABEL"
    >
      <template v-slot:top>
        <q-toolbar class="q-pa-none">
          <q-toolbar-title>{{
            translationContent.WGO_SEO_META_CARD_TITLE_LABEL
          }}</q-toolbar-title>
          <q-separator />
          <q-btn
            unelevated
            color="primary"
            icon="add"
            @click="() => addNewRecord()"
            class="q-ml-sm"
            no-caps
          />
        </q-toolbar>
      </template>
      <template v-slot:body-cell-nameSeo="props">
        <q-td :props="props">
          {{
            props.row.name || translationContent.WGO_SEO_COLUMN_EMPTY_VALE_LABEL
          }}
          <q-popup-edit
            v-model="props.row.name"
            :title="translationContent.WGO_SEO_COLUMN_NAME_LABEL"
            buttons
          >
            <q-select
              filled
              dense
              v-model="props.row.name"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="options"
              @input-value="(val) => (props.row.name = val)"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-valueSeo="props">
        <q-td :props="props">
          {{
            props.row.value ||
            translationContent.WGO_SEO_COLUMN_EMPTY_VALE_LABEL
          }}
          <q-popup-edit
            v-model="props.row.value"
            :title="translationContent.WGO_SEO_COLUMN_VALUE_LABEL"
            buttons
          >
            <q-input
              v-model="props.row.value"
              dense
              autofocus
              counter
              type="area"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-buttonsSeo="props">
        <q-td :props="props">
          <div>
            <q-btn
              unelevated
              color="primary"
              icon="delete"
              @click="() => deletePropTag(props.rowIndex)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
    <div class="flex justify-center q-pt-md">
      <q-btn
        unelevated
        icon="close"
        color="primary"
        class="q-mx-sm"
        :label="translationContent.WGO_CLOSE_BTN"
        @click="close"
      />
      <q-btn
        unelevated
        icon="save"
        color="primary"
        class="q-mx-sm"
        :label="
          metaData
            ? translationContent.WGO_SAVE_BTN
            : translationContent.WGO_ADD_BTN
        "
        @click="saveClick"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { ColumnsSeo } from '../ColumnsSeo';
import { ITranslationSeoKeys } from '../TranslationsKeys';
import {
  componentsActionsKeys,
  componentsNamespace,
} from '../../../store/ComponentsState';
import { BoolDictionary, INotify } from '@wisegar-org/wgo-base-models/build/';
import { languageGetters, languageNamespace } from '../../../store/Language';

@Component({})
export default class SeoEditor extends Vue {
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationSeoKeys;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;
  @Prop() metaData!: {
    name: string;
    value: string;
  }[];
  @Prop() close!: () => void;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Prop() save!: (data: { name: string; value: string }[]) => void;
  columns = ColumnsSeo;
  data: { name: string; value: string }[] = [{ name: '', value: '' }];
  options = ['name', 'content'];

  constructor() {
    super();
    if (this.metaData) this.data = this.metaData.map((item) => ({ ...item }));
  }

  addNewRecord() {
    this.data.push({
      name: '',
      value: '',
    });
  }

  deletePropTag(index: number) {
    this.data.splice(index, 1);
  }

  saveClick() {
    const keys: BoolDictionary = {};
    const data: { name: string; value: string }[] = [];
    this.data.forEach((item) => {
      if (!!item.name && !(item.name in keys)) {
        keys[item.name] = true;
        data.push(item);
      }
    });
    if (data.length > 0) {
      this.save(data);
      this.close();
    } else {
      this.notify({
        message: this.translationContent.WGO_SEO_FAIL_ADD_META_ACTION,
        type: 'negative',
      });
    }
  }
}
</script>
