<template>
  <div class="q-pa-md" style="width: 100%">
    <q-card flat bordered class="bg-grey-1">
      <q-card-section class="q-pb-sm">
        <div class="row" style="width: 100%">
          <div class="row items-center justify-between q-table">
            <div class="col-12 col-sm-auto no-wrap">
              <div class="q-table__title ellipsis">Modelli</div>
            </div>
            <div class="flex justify-end col-12 col-sm-auto row">
              <div
                v-if="objectToken.length"
                class="col-12 col-sm-auto q-ml-sm q-mb-sm"
              >
                <q-btn-dropdown
                  unelevated
                  color="primary"
                  label="Tokens"
                  class="fit"
                >
                  <q-list>
                    <q-item
                      v-for="(item, key) in objectToken"
                      :key="'tempateeditor-' + key"
                      clickable
                      v-close-popup
                      @click="() => writeToken(item)"
                    >
                      <q-item-section>
                        <q-item-label>{{ item }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </div>
              <div class="col-12 col-sm-auto q-ml-sm q-mb-sm">
                <q-btn
                  unelevated
                  color="primary"
                  icon="save"
                  label="Salva"
                  class="fit"
                  no-caps
                  @click="onSave"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-sm">
        <QCKEditor v-model="template.body" ref="editor" height="65vh" />
      </q-card-section>
      <Loader :loading="loading" />
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { BaseTranslateComponent } from "../../../core/components/BaseComponents";
import { TemplateService } from "../../services/TemplateService";
import { translations } from "../../../../models/template/translations";
import QCKEditor from "../../../core/components/CKEditor/QCKEditor.vue";
import Loader from "../../../core/components/Loader/Loader.vue";
import { TranslationStore } from "../../../translation/store/TranslationStore";
import { ITemplateResponse } from "../../../../models/template";

export default defineComponent({
  props: {
    type: {
      type: String,
      default: "",
    },
    objectToken: { type: Array as PropType<string[]>, default: [] },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
  },
  components: {
    QCKEditor,
    Loader,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    return {
      loading: false,
      getLabel: (name: string) => getLabel(this.tranStore, name),
      template: <ITemplateResponse>{
        id: 0,
        title: "",
        body: "",
        documentType: this.type,
      },
    };
  },
  methods: {
    async loadTemplate() {
      if (this.type) {
        this.loading = true;
        const templateService = new TemplateService();
        const template = await templateService.getTemplateByType(this.type);
        this.loading = false;
        if (template) {
          this.template = {
            id: template.id,
            body: template.body,
            title: template.title,
            documentType: template.documentType,
          };
          return;
        }
      }
      this.template = {
        id: 0,
        body: "",
        documentType: "",
        title: "",
      };
    },
    async onSave() {
      const templateService = new TemplateService();
      if (await templateService.setTemplate(this.template)) {
        this.$emit("success", this.getLabel(translations.TRUE));
      } else {
        this.$emit("fail", this.getLabel(translations.FALSE));
      }
    },
    writeToken(text: string) {
      const model = (this.$refs.editor as any).$refs.editor.$_instance.model;

      model.change((writer: any) => {
        writer.insertText(
          `${text}`,
          model.document.selection.getFirstPosition()
        );
      });
    },
  },
  emits: ["fail", "success"],
  watch: {
    type() {
      void this.loadTemplate();
    },
  },
  async mounted() {
    await this.loadTemplate();
  },
});
</script>