<template>
  <Dialog
    :open="open"
    icon="send"
    :title="getLabel(translations.WIZARD_IMPORT_TITLE)"
    :persistent="true"
    :showClose="true"
    :fullWidth="true"
    :fullHeight="false"
    @close="close"
  >
    <q-stepper v-model="step" header-nav animated class="fit" flat>
      <ImportEmployeesUploadStep
        :title="getLabel(translations.WIZARD_IMPORT_UPLOAD_TITLE)"
        :name="steps.uploadStep"
        :done="step > steps.uploadStep"
        :header-nav="step < steps.infoStep"
        :step="steps.uploadStep"
        :currentStep="step"
        :files="files"
        @moveStep="processDocs"
        @changeFiles="changeFiles"
        :tranStore="tranStore"
      />
      <ImportEmployeesValidStep
        :title="getLabel(translations.WIZARD_IMPORT_CONFIRM_TITLE)"
        :name="steps.confirmStep"
        :done="step > steps.confirmStep"
        :header-nav="step > steps.confirmStep && step < steps.infoStep"
        :step="steps.confirmStep"
        :currentStep="step"
        @moveStep="importedEmployee"
        :tranStore="tranStore"
        :files="files"
        :employees="employeeList"
      />
      <ImportEmployeesInfoStep
        :title="getLabel(translations.WIZARD_IMPORT_INFO_TITLE)"
        :name="steps.infoStep"
        :done="step > steps.infoStep"
        :header-nav="false"
        :step="steps.infoStep"
        :currentStep="step"
        @finish="onSuccessClose"
        :tranStore="tranStore"
        :employees="employeeImported"
      />
    </q-stepper>
  </Dialog>
</template>

<script lang="ts" src="./ImportEmployeesStepper.ts" />
