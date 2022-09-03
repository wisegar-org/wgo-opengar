<template>
  <q-step :name="name" :title="title">
    <q-item-section>
      <Table :title="translations.WIZARD_IMPORT_CONFIRM_TABLE_TITLE" :data="employeeList" :schema="schema" />
      <ImportEmployeeEditorDialog
        @success="saveEmployee"
        @close="() => (showEditDialog = false)"
        :open="showEditDialog"
        :tranStore="tranStore"
        :employee="selectedEmployee"
      />
    </q-item-section>

    <q-stepper-navigation>
      <q-btn @click="onConfirm" color="primary" :label="getLabel(transBase.CONFIRM)" />
      <q-btn flat @click="backStep" color="primary" :label="getLabel(transBase.GO_BACK)" class="q-ml-sm" />
    </q-stepper-navigation>
  </q-step>
</template>

<script lang="ts" src="./ImportEmployeesValidStep.ts" />
