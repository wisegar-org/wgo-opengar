<template>
  <div class="q-pa-md" style="width: 100%">
    <q-table
      v-if="userLogged && userLogged.isSuperAdmin"
      bordered
      flat
      title=""
      :data="filterIncomes"
      :columns="columns"
      row-key="nameIncome"
      :loading="loading"
    >
      <template v-slot:top>
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis">
              Transactions
            </div>
          </div>
          <div class="flex q-pb-sm justify-end col-12 col-sm-auto row">
            <q-btn
              unelevated
              v-if="userLogged && userLogged.isSuperAdmin"
              color="primary"
              class="col-12 col-sm-auto q-ml-sm q-mb-sm"
              no-caps
              icon="add"
              label="Create Income"
              @click="() => showEditIncomeDialog(null)"
            />
          </div>
        </div>
        <div class="row q-col-gutter-none justify-end" style="width: 100%">
          <div class="col-12 col-md-3">
            <q-input
              clearable
              dense
              outlined
              v-model="minDateFilter"
              mask="date"
              label="Start date"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="minDateFilter">
                      <div class="row items-center justify-end">
                        <q-btn
                          unelevated
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-3">
            <q-input
              clearable
              dense
              outlined
              v-model="maxDateFilter"
              mask="date"
              label="End date"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="maxDateFilter">
                      <div class="row items-center justify-end">
                        <q-btn
                          unelevated
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-3">
            <FilterSelect
              label="Repeat"
              :options="repeatOption"
              filterProp="label"
              :value="repeatFilter"
              @onChange="
                value => {
                  setRepeat(value);
                }
              "
            />
          </div>
          <div class="col-12 col-md-3">
            <q-input
              clearable
              dense
              outlined
              v-model="clientFilter"
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
                    @click="() => showIncomeDialog(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="assignment" />
                    </q-item-section>
                    <q-item-section>Details</q-item-section>
                  </q-item>
                  <q-item
                    v-if="props.row.status !== 2"
                    clickable
                    v-close-popup
                    @click="() => showEditIncomeDialog(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="edit" />
                    </q-item-section>
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                  <q-item
                    v-if="props.row.status === 1 && !!props.row.collaborator"
                    clickable
                    v-close-popup
                    @click="() => showConfimDialog(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="monetization_on" />
                    </q-item-section>
                    <q-item-section>Pay</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
    <AddIncomeEditorDialog
      :incomeToEdit="selectedIncome"
      :showModal="showAddIncomeDialog"
      :close="() => (showAddIncomeDialog = false)"
    />
    <ViewerIncomeDialog
      :income="selectedIncome"
      :showModal="showViewIncomeDialog"
      :close="() => (showViewIncomeDialog = false)"
    />
    <ConfirmDialog
      icon="attach_money"
      :showModal="showConfirmPayDialog"
      cancelButton="Cancel"
      okButton="Confirm"
      :text="textConfirm"
      :onConfirm="() => changeStatusToPayed(true)"
      :onClose="() => (showConfirmPayDialog = false)"
    />
  </div>
</template>

<script lang="ts" src="./Incomes.ts" />

<style scoped>
.q-toolbar {
  padding: 0px;
}
</style>
