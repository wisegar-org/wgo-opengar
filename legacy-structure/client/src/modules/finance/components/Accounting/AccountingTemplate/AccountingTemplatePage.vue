<template>
  <q-page class="page-quasar-tiptap-basic">
    <div
      v-if="!!template && !!template.styleTemplate"
      class="q-pa-md"
      style="width: 100%"
    >
      <q-card flat bordered class="my-card bg-grey-1">
        <q-card-section>
          <div class="row items-center justify-between q-table">
            <div class="col-12 col-sm-auto no-wrap">
              <div class="q-table__title ellipsis">
                {{ translationContent.WGO_FINANCE_ACCOUNTING_TEMPLATE_TITLE }}
              </div>
            </div>
            <div
              class="flex q-pb-sm justify-end col-12 col-sm-auto row"
              style="justify-content: flex-end"
            >
              <q-btn
                unelevated
                color="primary"
                icon="preview"
                :label="translationContent.WGO_PREVIEW_BTN"
                class="flex col-12 col-sm-auto q-ml-sm q-mb-sm"
                no-caps
                @click="getPreview"
              />
              <q-btn
                unelevated
                color="primary"
                icon="save"
                :label="translationContent.WGO_SAVE_BTN"
                class="flex col-12 col-sm-auto q-ml-sm q-mb-sm"
                no-caps
                @click="save"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-select
            :label="
              translationContent.WGO_FINANCE_ACCOUNTING_TEMPLATE_TYPE_LABEL
            "
            :options="templateOptions"
            v-model="selectedTemplate"
          />
          <div class="q-pb-lg">
            <q-input
              v-model="template.body"
              filled
              type="textarea"
              :label="translationContent.WGO_FINANCE_ACCOUNTING_TEMPLATE_LABEL"
              :rows="20"
            />
          </div>
          <div>
            <q-input
              v-model="template.styleTemplate.body"
              filled
              type="textarea"
              :label="
                translationContent.WGO_FINANCE_ACCOUNTING_TEMPLATE_STYLE_LABEL
              "
              :rows="20"
            />
          </div>
        </q-card-section>

        <Loader :loading="showLoading" />
        <q-card-actions> </q-card-actions>
      </q-card>
      <q-dialog v-model="showPreview" full-height full-width auto-close>
        <q-card class="column flex full-height full-width">
          <iframe class="col" :srcdoc="content" height="100%" width="100%" />
          <q-btn
            unelevated
            flat
            :label="translationContent.WGO_CLOSE_BTN"
            v-close-popup
          />
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script lang="ts" src="./AccountingTemplatePage.ts" />

<style lang="stylus">
.ck-content {
  height 70vh
}
.page-quasar-tiptap-basic {
  .banner {
    height 100px
  }

  .tiptap {
    border solid 1px #eeeeee
    border-radius 6px
  }

  .editor-scroll-area {
    position absolute
    top 40px
    left 0
    right 0
    bottom 0
    background #f7f8fa
  }
}
</style>
