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
        <ExpandableListFilterLabel
          :filterStr="filterStr"
          :cleanFilter="() => applyFilter(emptyFilter)"
          :openFilter="() => (showFilter = true)"
        />
      </template>
    </AccountingList>
    <!-- <q-table
      bordered
      flat
      title=""
      :data="accounting"
      :columns="columns"
      row-key="name"
      :loading="loading"
    >
      <template v-slot:top>
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis">
              Accounting
            </div>
          </div>
          <div class="flex q-pb-sm justify-end col-12 col-sm-auto row">
            <q-btn
              unelevated
              v-if="userLogged && userLogged.isAdmin"
              color="primary"
              icon="settings"
              label="Accounting Template"
              class="col-12 col-sm-auto q-ml-sm q-mb-sm"
              no-caps
              @click="goToAccountingTemplate"
            />
          </div>
        </div>
      </template>
      <template v-slot:loading>
        <Loader :loading="true" />
      </template>
      <template v-slot:body-cell-buttons="props">
        <q-td :props="props">
          <div>
            <q-btn unelevated color="primary" icon="more_vert" dense>
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item
                    v-if="
                      userLogged &&
                        userLogged.isAdmin &&
                        showConfirmMenuItem(props.row)
                    "
                    clickable
                    v-close-popup
                    @click="() => goToConfirmAccount(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="monetization_on" />
                    </q-item-section>
                    <q-item-section>Confirm</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item
                    clickable
                    v-close-popup
                    @click="() => goToGithub(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="contacts" />
                    </q-item-section>
                    <q-item-section>Collaborator</q-item-section>
                  </q-item>
                  <q-item
                    v-if="userLogged && userLogged.isAdmin"
                    clickable
                    v-close-popup
                    @click="() => openEditor(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="edit" />
                    </q-item-section>
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="() => openAccountingDetails(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="assignment" />
                    </q-item-section>
                    <q-item-section>Details</q-item-section>
                  </q-item>
                  <q-item
                    v-if="props.row.status === 2"
                    clickable
                    v-close-popup
                    @click="() => sendEmailAccounting(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="cloud_download" />
                    </q-item-section>
                    <q-item-section>Send Accounting</q-item-section>
                  </q-item>
                  <q-item
                    v-if="props.row.status === 1 || props.row.status === 2"
                    clickable
                    v-close-popup
                    @click="() => loadAccountiPreview(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="visibility" />
                    </q-item-section>
                    <q-item-section>Preview</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="() => exportPdf(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="cloud_download" />
                    </q-item-section>
                    <q-item-section>Print</q-item-section>
                  </q-item>
                  <q-item
                    v-if="
                      userLogged &&
                        userLogged.isAdmin &&
                        showConfirmMenuItem(props.row)
                    "
                    clickable
                    v-close-popup
                    @click="() => deleteAccount(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="delete" />
                    </q-item-section>
                    <q-item-section>Rollback</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-td>
      </template>
    </q-table> -->
    <!-- <AccountingStepperDialog
      :showModal="showAccountingStepper"
      :close="() => (showAccountingStepper = false)"
    /> -->
    <!-- <AccountingDetailsDialog
      :showModal="showAccountingDetails"
      :close="() => (showAccountingDetails = false)"
      :accounting="accountingSelected"
    /> -->
    <!-- <AccountingPrintDialog
      :showModal="showAccountingPrint"
      :close="() => (showAccountingPrint = false)"
      :accounting="accountingSelected"
    /> -->
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
