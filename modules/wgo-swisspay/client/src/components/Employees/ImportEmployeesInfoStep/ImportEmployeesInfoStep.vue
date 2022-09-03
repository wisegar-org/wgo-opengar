<template>
  <q-step :name="name" :title="title">
    <q-item-section>
      <Table :title="translations.WIZARD_IMPORT_INFO_TABLE_TITLE" :data="employees" :schema="schema" />
    </q-item-section>

    <q-stepper-navigation>
      <q-btn @click="doneStep" color="primary" :label="getLabel(tranBase.CLOSE)" />
    </q-stepper-navigation>
  </q-step>
</template>

<script lang="ts" src="./ImportEmployeesInfoStep.ts" />
