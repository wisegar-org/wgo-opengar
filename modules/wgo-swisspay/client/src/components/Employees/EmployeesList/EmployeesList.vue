<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <Table :title="translations.TITLE" :data="tableData" :schema="schema" :height="componentHeight"> </Table>
    <SendEmployeeMailDialog
      :tranStore="tranStore"
      :open="open"
      @close="closeEmployMailDialog"
      @createUser="createUser"
    />
    <SendDocumentStepper
      :tranStore="tranStore"
      :open="openWizard"
      :user="selectedUser"
      @close="closeWizardSendDocument"
    />
    <ImportEmployeesStepper
      :tranStore="tranStore"
      :open="openImportWizard"
      @close="closeImportWizard"
      @success="loadEmployees"
    />
    <ImportEmployeeEditorDialog
      @success="saveEmployee"
      @close="closeEmployeeEditor"
      :open="openEmployeeEditor"
      :tranStore="tranStore"
      :employee="newEmployee"
    />
  </div>
</template>

<script lang="ts" src="./EmployeesList.ts" />
