<template>
  <Dialog
    :open="open"
    icon="settings"
    :title="getLabel(translations.TITLE_DIALOG)"
    :persistent="true"
    :showClose="true"
    maxWidth="900px"
    @close="close"
  >
    <q-card flat square class="q-pa-none">
      <q-form @submit="setSetting" class="q-pa-none">
        <q-card-section class="row q-pa-none">
          <div class="col-12">
            <q-input
              square
              outlined
              readonly
              class="q-my-sm q-mx-sm"
              v-model="settings.type_settings"
              required
              :label="getLabel(translations.COLUMN_TYPE_SETTINGS)"
            />
          </div>
          <div class="col-12">
            <q-input
              square
              outlined
              readonly
              class="q-my-sm q-mx-sm"
              v-model="keyValue"
              required
              :label="getLabel(translations.COLUMN_SETTING)"
            />
          </div>
          <div class="col-12">
            <q-input
              v-if="!isPasswordField()"
              autofocus
              square
              outlined
              class="q-my-sm q-mx-sm"
              v-model="settings.value"
              required
              :label="getLabel(translations.COLUMN_VALUE)"
            />
            <InputSecret
              v-if="isPasswordField()"
              class="q-my-md q-mx-sm"
              v-model="settings.value"
              :required="true"
              :label="getLabel(translations.COLUMN_VALUE)"
              :hideBtnSpace="true"
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
            :label="getLabel(tranBase.SAVE)"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { ISettingsModel } from "../../models";
import Dialog from "../../../core/components/Dialog/Dialog.vue";
import { TranslationStore } from "../../../translation/models/TranslationStore";
import { BaseTranslateComponent } from "../../../core/components/BaseComponents";
import { translations } from "../../models/translations";
import { translations as tranBase } from "../../../core/models";
import { SettingsService } from "../../services/SettingsService";
import InputSecret from "../../../core/components/InputSecret/InputSecret.vue";

export default defineComponent({
  name: "SettingsDialog",
  props: {
    open: { type: Boolean, default: false },
    stting: {
      type: Object as PropType<ISettingsModel>,
      default: {} as ISettingsModel,
    },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
  },
  components: {
    Dialog,
    InputSecret,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    const keyValue = "";
    return {
      settings: {} as ISettingsModel,
      getLabel: (name: string) => getLabel(this.tranStore, name),
      translations,
      tranBase,
      keyValue,
      settingsService: new SettingsService(),
    };
  },
  methods: {
    async setSetting() {
      const input = {
        key: this.settings.key,
        type_settings: this.settings.type_settings,
        value: this.settings.value,
      };
      const result = await this.settingsService.postSettings(input);
      if (result) {
        this.$emit(
          "success",
          this.isPasswordField() ? "" : this.settings.value,
          this.getLabel(this.translations.SET_SUCCESS)
        );
        this.close();
      }
    },
    isPasswordField() {
      return this.settings.key.toLowerCase().indexOf("password") !== -1;
    },
    close() {
      this.$emit("close");
    },
  },
  emits: ["close", "success"],
  watch: {
    stting() {
      this.settings = { ...this.stting };
      this.keyValue =
        this.getLabel(`WGO_SETTINGS_${this.stting.key}`) +
        ` (${this.stting.key})`;
    },
  },
});
</script>

<style scoped>
.btn_width_fix {
  min-width: 100px;
}
</style>
