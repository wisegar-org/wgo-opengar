<template>
  <q-step>
    <q-item-section class="text-left">
      {{ getLabel(translations.WIZARD_SD_INFO_MESSAGE) }}
    </q-item-section>
    <q-stepper-navigation>
      <q-btn @click="doneStep" color="primary" :label="getLabel(transBase.CLOSE)" />
    </q-stepper-navigation>
  </q-step>
</template>

<script lang="ts" src="./SendDocumentInfoStep.ts" />
