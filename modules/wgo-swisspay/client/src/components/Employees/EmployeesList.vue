<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <q-btn color="primary" @click="addEmployee">
      <q-icon name="add" />
      <span>{{ getLabelFromName(translations.ADD_EMPLOYEE_BTN) }}</span>
    </q-btn>
    <Table :title="translations.TITLE" :data="tableData" :schema="schema" :height="componentHeight"> </Table>
  </div>
</template>

<script lang="ts" src="./EmployeesList.ts" />
