<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <Table :title="translations.TITLE" :data="tableData" :schema="schema" :height="componentHeight"> </Table>
    <SendEmployMailDialog :tranStore="tranStore" :open="open" @close="closeEmployMailDialog" />
    <SendDocumentStepper
      :tranStore="tranStore"
      :open="openWizard"
      :user="selectedUser"
      @close="closeWizardSendDocument"
    />
  </div>
</template>

<script lang="ts" src="./EmployeesList.ts" />
