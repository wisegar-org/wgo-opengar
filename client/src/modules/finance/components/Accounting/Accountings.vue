<template>
  <div class="q-pa-none" style="width: 100%">
    <AccountingList
      :accountings="filterAccounting"
      :columns="columns"
      :filterStr="filterStr"
      :loading="loading"
      :headerButtons="headerButtons"
      :editAccounting="openEditor"
      :confirmAccounting="goToConfirmAccount"
      :cancelAccounting="showDeleteConfirmDialog"
      :sendAccounting="sendEmailAccounting"
      :previewAccounting="loadAccountiPreview"
      :exportAccounting="exportPdf"
    >
      <template slot="addButton">
        <q-btn
          unelevated
          v-if="userLogged && userLogged.isAdmin"
          color="primary"
          icon="settings"
          class="q-ml-xs"
          no-caps
          size="sm"
          :label="
            translationContent.WGO_FINANCE_ACCOUNTING_ACCOUNTING_TEMPLATE_BTN
          "
          @click="goToAccountingTemplate"
        />
      </template>
      <template slot="filterLabel">
        <wgo-exp-list-filter-lab
          :filterStr="filterStr"
          :cleanFilter="() => applyFilter(emptyFilter)"
          :openFilter="() => (showFilter = true)"
        />
      </template>
    </AccountingList>
    <AccountingEditorDialog
      :showModal="showAccountingEditor"
      :close="() => (showAccountingEditor = false)"
      :accounting="accountingSelected"
    />
    <AccountingConfirmDialog
      :showModal="showAccountingConfirm"
      :close="() => (showAccountingConfirm = false)"
      :accounting="accountingSelected"
    />
    <ConfirmDialog
      icon="delete"
      :showModal="showDeleteConfirm"
      :cancelButton="translationContent.WGO_CLOSE_BTN"
      :okButton="translationContent.WGO_DELETE_BTN"
      :text="translationContent.WGO_FINANCE_ACCOUNTING_CANCEL_ACCOUNTING_TEXT"
      :onConfirm="deleteAccount"
      :onClose="() => (showDeleteConfirm = false)"
    />
    <AccountingFilterDialog
      :showModal="showFilter"
      :close="() => (showFilter = false)"
      :filters="filters"
      :title="
        translationContent.WGO_FINANCE_COLLABORATOR_FILTER_TITLE || 'Filter'
      "
      icon="filter_alt"
      :applyFilter="applyFilter"
    />
  </div>
</template>

<script lang="ts" src="./Accountings.ts" />

<style scoped>
.q-toolbar {
  padding: 0px;
}
</style>
