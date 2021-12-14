<template>
  <div class="q-pa-md" style="width: 100%">
    <q-table
      v-if="userLogged && userLogged.isSuperAdmin"
      bordered
      flat
      title=""
      :data="filterBills"
      :columns="columns"
      row-key="nameBill"
      :loading="loading"
    >
      <template v-slot:top>
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis">
              Bills
            </div>
          </div>
          <div class="flex q-pb-sm justify-end col-12 col-sm-auto row">
            <q-btn
              unelevated
              color="primary"
              icon="add"
              label="Create Bill"
              @click="() => showEditBillDialog(null)"
              class="col-12 col-sm-auto q-ml-sm q-mb-sm"
              no-caps
            />
            <q-btn
              unelevated
              v-if="userLogged && userLogged.isSuperAdmin"
              color="primary"
              icon="settings"
              label="Bill Template"
              class="col-12 col-sm-auto q-ml-sm q-mb-sm"
              no-caps
              @click="goToBillTemplate"
            />
          </div>
        </div>
        <div class="row q-col-gutter-none justify-end" style="width: 100%">
          <div class="col-12 col-md-3">
            <FilterSelect
              label="Status"
              :options="statusOptions"
              filterProp="label"
              :value="filter.status"
              @onChange="
                value => {
                  setStatus(value);
                }
              "
            />
          </div>
          <div class="col-12 col-md-3">
            <q-input
              clearable
              dense
              outlined
              v-model="clientBill"
              prefix="Client: "
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
                    clickable
                    v-close-popup
                    @click="() => showBillDialog(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="assignment" />
                    </q-item-section>
                    <q-item-section>Details</q-item-section>
                  </q-item>
                  <q-item
                    v-if="props.row.status !== 3"
                    clickable
                    v-close-popup
                    @click="() => showEditBillDialog(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="edit" />
                    </q-item-section>
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                  <q-separator
                    v-if="props.row.status === 1 || props.row.status === 2"
                  />
                  <q-item
                    v-if="props.row.status === 1 || props.row.status === 2"
                    clickable
                    v-close-popup
                    @click="() => setConfirmStatusDialog(props.row, true)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="monetization_on" />
                    </q-item-section>
                    <q-item-section>Pay</q-item-section>
                  </q-item>
                  <q-item
                    v-if="props.row.status === 1 || props.row.status === 2"
                    clickable
                    v-close-popup
                    @click="() => setConfirmStatusDialog(props.row, false)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="cancel" />
                    </q-item-section>
                    <q-item-section>Cancel</q-item-section>
                  </q-item>
                  <q-item
                    v-if="props.row.status !== 4"
                    clickable
                    v-close-popup
                    @click="() => sendBillLink(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="email" />
                    </q-item-section>
                    <q-item-section>Send Bill</q-item-section>
                  </q-item>
                  <q-item
                    v-if="props.row.status !== 4"
                    clickable
                    v-close-popup
                    @click="() => loadBillPreview(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="visibility" />
                    </q-item-section>
                    <q-item-section>Preview</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
    <AddBillEditorDialog
      :billToEdit="selectedBill"
      :showModal="showAddBillDialog"
      :close="() => (showAddBillDialog = false)"
    />
    <ViewerBillDialog
      :bill="selectedBill"
      :showModal="showViewBillDialog"
      :close="() => (showViewBillDialog = false)"
    />
    <ConfirmDialog
      icon="attach_money"
      :showModal="showConfirmStatusDialog"
      cancelButton="Cancel"
      okButton="Confirm"
      :text="textConfirm"
      :onConfirm="() => changeStatus(true)"
      :onClose="() => (showConfirmStatusDialog = false)"
    />
  </div>
</template>

<script lang="ts" src="./Bills.ts" />

<style scoped>
.q-toolbar {
  padding: 0px;
}
</style>
