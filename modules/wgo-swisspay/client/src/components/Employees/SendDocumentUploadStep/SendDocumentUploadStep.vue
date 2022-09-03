<template>
  <q-step :name="name" :title="title">
    <q-item-section>
      <q-uploader
        class="fit"
        @added="addFile"
        @removed="removeFile"
        :auto-upload="false"
        label="Upload jaja"
        style="min-height: 200px"
        ref="uploaderEmployee"
        accept=".pdf"
        flat
        bordered
        multiple
      >
        <template v-slot:header="scope">
          <div class="row no-wrap items-center q-pa-sm q-gutter-xs flex justify-between">
            <div class="q-uploader__title">{{ getLabel(translations.WIZARD_SD_UPLOAD_UPLOAD_LB) }}</div>
            <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" @click="scope.pickFiles" dense flat>
              <q-uploader-add-trigger />
              <q-tooltip>{{ getLabel(transBase.ADD) }}</q-tooltip>
            </q-btn>
          </div>
        </template>

        <template v-slot:list="scope">
          <q-list separator>
            <q-item v-for="file in scope.files" :key="file.__key" bordered class="flex justify-between">
              <q-item-section class="text-left">
                <q-item-label class="full-width ellipsis">
                  {{ file.name }}
                </q-item-label>
                <q-item-label caption>
                  {{ file.__sizeLabel }}
                </q-item-label>
              </q-item-section>
              <q-item-section top side>
                <q-btn class="gt-xs" flat dense round icon="delete" @click="scope.removeFile(file)" />
              </q-item-section>
            </q-item>
          </q-list>
        </template>
      </q-uploader>
    </q-item-section>
    <q-stepper-navigation>
      <q-btn @click="doneStep" color="primary" :label="getLabel(transBase.CONTINUE)" :disabled="files.length === 0" />
    </q-stepper-navigation>
  </q-step>
</template>

<script lang="ts" src="./SendDocumentUploadStep.ts" />
