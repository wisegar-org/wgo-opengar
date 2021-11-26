<template>
  <div class="q-pa-md" style="width: 100%">
    <q-table
      bordered
      flat
      title=""
      :data="filteredIssues"
      :columns="columns"
      row-key="name"
      :loading="loading"
    >
      <template v-slot:top>
        <IssuesToolbar
          :clickShowAccountingStepper="() => (showAccountingStepper = true)"
          :exportTable="exportTableFn"
          :syncroGithubData="syncroGithubData"
          :columns="columns"
          :exportTableFn="exportTableFn"
          :getExportData="getExportData"
          :disableAccounting="
            !!filters && (!filters.minDate || !filters.maxDate)
          "
        />
        <div class="row q-col-gutter-none justify-end" style="width: 100%">
          <div class="col-12 col-md-4">
            <FilterSelect
              label="Repository"
              :options="optionsRepository"
              filterProp="title"
              :value="filters.repository"
              @onChange="value => setFilter('repository', value)"
            />
          </div>
          <!-- <div class="col-12 col-md-3">
            <FilterSelect
              label="Project"
              :options="optionsProjects"
              filterProp="title"
              @onChange="value => setFilter('project', value)"
            />
          </div> -->
          <div class="col-12 col-md-4">
            <FilterSelect
              label="Labels"
              :options="optionsLabels"
              filterProp="title"
              :value="filters.labels"
              @onChange="value => setFilter('labels', value)"
            />
          </div>
          <div
            v-if="userLogged && userLogged.isSuperAdmin"
            class="col-12 col-md-4"
          >
            <FilterSelect
              label="Assigned To"
              :options="getOptionsCollaborators()"
              filterProp="login"
              :value="filters.assignedTo"
              @onChange="value => setFilter('assignedTo', value)"
            />
          </div>
          <!-- <div v-if="false" class="col-12 col-md-4">
            <FilterSelect
              label="Milestone"
              :options="optionsMilestones"
              filterProp="title"
              :value="filters.milestones"
              @onChange="value => setFilter('milestones', value)"
            />
          </div> -->
          <div class="col-12 col-md-4">
            <q-input
              clearable
              dense
              outlined
              v-model="filters.minDate"
              mask="date"
              label="Start date"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="filters.minDate">
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
          <div class="col-12 col-md-4">
            <q-input
              clearable
              dense
              outlined
              v-model="filters.maxDate"
              mask="date"
              label="End date"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="filters.maxDate">
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
          <div class="col-12 col-md-4">
            <q-input
              outlined
              readonly
              dense
              flat
              :value="getHourIssues()"
              type="number"
              prefix="Hours: "
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
            <q-btn
              unelevated
              color="primary"
              icon="assignment"
              @click="() => openIssueDetail(props.row)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
    <AccountingStepperDialog
      :showModal="showAccountingStepper"
      :close="() => (showAccountingStepper = false)"
      :filterIssues="filteredIssues"
      :collaborator="filters.assignedTo"
      :organizationData="organizationData"
      :initDate="filters.minDate"
      :endDate="filters.maxDate"
    />
    <IssueDetailsDialog
      :showModal="showDetailDialog"
      :issue="issueSelected"
      :close="() => (showDetailDialog = false)"
    />
  </div>
</template>

<script lang="ts" src="./Issues.ts" />

<style scoped>
.q-toolbar {
  padding: 0px;
}
</style>
