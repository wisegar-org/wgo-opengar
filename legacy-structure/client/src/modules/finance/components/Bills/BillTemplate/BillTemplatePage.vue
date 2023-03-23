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
              <div class="q-table__title ellipsis">Bill Template</div>
            </div>
            <div
              class="flex q-pb-sm justify-end col-12 col-sm-auto row"
              style="justify-content: flex-end"
            >
              <q-btn
                unelevated
                color="primary"
                icon="preview"
                label="Preview"
                class="col-12 col-sm-auto q-ml-sm q-mb-sm"
                no-caps
                @click="getPreview"
              />
              <q-btn
                unelevated
                color="primary"
                icon="save"
                label="Save Template"
                class="col-12 col-sm-auto q-ml-sm q-mb-sm"
                no-caps
                @click="save"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-select
            label="Template Type"
            :options="templateOptions"
            v-model="selectedTemplate"
          />
          <LanguageSimpleSelect
            :fullWidth="true"
            :language="language"
            :langSelected="changeLanguage"
          />
          <div class="q-pb-lg">
            <q-input
              v-model="template.body"
              filled
              type="textarea"
              label="Template"
              :rows="20"
            />
          </div>
          <div>
            <q-input
              v-model="template.styleTemplate.body"
              filled
              type="textarea"
              label="Template style"
              :rows="20"
            />
          </div>
        </q-card-section>
        <q-card-actions> </q-card-actions>
      </q-card>
      <q-dialog v-model="showPreview" full-height full-width auto-close>
        <q-card class="column flex full-height full-width">
          <iframe class="col" :srcdoc="content" height="100%" width="100%" />
          <q-btn unelevated flat label="Cancel" v-close-popup />
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script lang="ts" src="./BillTemplatePage.ts" />

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
