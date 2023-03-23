<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    :title="getTitle()"
    :close="() => onClose()"
    icon="filter_alt"
    styleDialog="width: 800px; max-width: 80vw"
  >
    <template slot="content">
      <div class="row col-12 q-pa-sm">
        <InputText
          class="col-12 col-sm-6 q-pa-sm"
          v-model="filtersEdit.name"
          :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_NAME"
        />
        <InputSelect
          class="col-12 col-sm-6 q-pa-sm"
          v-model="selectedStatus"
          :label="translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_STATUS"
          :optionsSelect="statusOptions"
        />
      </div>
    </template>
    <template slot="buttons">
      <q-btn
        unelevated
        color="primary"
        :label="translationContent.WGO_CLOSE_BTN"
        icon="close"
        @click="close"
        class="col-12 col-md-3 q-mt-sm"
      />
      <q-btn
        unelevated
        color="primary"
        :label="translationContent.WGO_CLEAN_BTN"
        icon="cached"
        @click="onResetFilter"
        class="col-12 col-md-3 q-mt-sm"
      />
      <q-btn
        unelevated
        color="primary"
        :label="translationContent.WGO_APPLY_BTN"
        icon="save"
        @click="onApplyFilter"
        class="col-12 col-md-3 q-mt-sm"
      />
    </template>
  </Dialog>
</template>

<script lang="ts" src="./AccountingFilterDialog.ts" />
