<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <q-card class="my-card">
      <q-card-section class="bg-primary text-white" align="center">
        <div class="text-h6">{{ getLabelFromName(translations.ADD_EMPLOYEE_MESSAGE_TITLE) }}</div>
        <div class="text-subtitle2">{{ getLabelFromName(translations.ADD_EMPLOYEE_MESSAGE_SUBTITLE) }}</div>
      </q-card-section>
      <q-separator />

      <q-card-actions align="center">
        <q-btn color="primary" @click="addEmployee" flat>
          <span>{{ getLabelFromName(translations.ADD_EMPLOYEE_ACCEPT_BTN) }}</span>
        </q-btn>
        <q-btn color="red" @click="cancelEmployee" flat>
          <span>{{ getLabelFromName(translations.ADD_EMPLOYEE_CANCEL_BTN) }}</span>
        </q-btn>
      </q-card-actions>
    </q-card>
    <h5></h5>
  </div>
</template>

<script lang="ts" src="./AddEmployee.ts" />
