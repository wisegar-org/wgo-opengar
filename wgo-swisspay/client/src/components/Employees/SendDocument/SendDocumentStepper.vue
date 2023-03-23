<template>
  <Dialog
    :open="open"
    icon="send"
    :title="getLabel(translations.WIZARD_SD_TITLE)"
    :persistent="true"
    :showClose="true"
    :fullWidth="true"
    :fullHeight="false"
    @close="close"
  >
    <q-stepper v-model="step" header-nav animated class="fit" flat>
      <SendDocumentUploadStep
        :title="getLabel(translations.WIZARD_SD_UPLOAD_TITLE)"
        :name="steps.uploadStep"
        :done="step > steps.uploadStep"
        :header-nav="step < steps.infoStep"
        :step="steps.uploadStep"
        :currentStep="step"
        :files="files"
        @moveStep="moveStep"
        @changeFiles="changeFiles"
        :tranStore="tranStore"
      />
      <SendDocumentConfirmStep
        :title="getLabel(translations.WIZARD_SD_CONFIRM_TITLE)"
        :name="steps.confirmStep"
        :done="step > steps.confirmStep"
        :header-nav="step > steps.confirmStep && step < steps.infoStep"
        :step="steps.confirmStep"
        :currentStep="step"
        @moveStep="moveStep"
        :tranStore="tranStore"
        :files="files"
        :user="user"
      />
      <SendDocumentInfoStep
        :title="getLabel(translations.WIZARD_SD_INFO_TITLE)"
        :name="steps.infoStep"
        :done="step > steps.infoStep"
        :header-nav="false"
        :step="steps.infoStep"
        :currentStep="step"
        @finish="close"
        :tranStore="tranStore"
      />
    </q-stepper>
  </Dialog>
</template>

<script lang="ts" src="./SendDocumentStepper.ts" />
