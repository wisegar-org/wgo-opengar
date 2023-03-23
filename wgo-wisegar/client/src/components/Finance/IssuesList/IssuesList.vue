<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <Table
      :title="translationsFinanceIssues.TITLE"
      :data="issues"
      :schema="schema"
      :countData="issuesCount"
      :height="componentHeight"
      @getPagination="getDataByConfig"
    >
      <template v-slot:subtitle>
        <div class="fit row col-12">
          <div class="col-12 col-sm-3">
            <q-select
              class="q-ma-sm"
              dense
              filled
              clearable
              v-model="filterObj.repository"
              :label="getLabel(translationsFinanceIssues.COLUMN_REPOSITORY)"
              :options="financeFiltersStore.repositoryOptions"
              standout="bg-primary text-white"
              lazy-rules="ondemand"
              autocomplete="new-password"
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-select
              class="q-ma-sm"
              dense
              filled
              clearable
              v-model="filterObj.assignedTo"
              :label="getLabel(translationsFinanceIssues.COLUMN_ASSIGNED_TO)"
              :options="financeFiltersStore.assignedToOptions"
              standout="bg-primary text-white"
              lazy-rules="ondemand"
              autocomplete="new-password"
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-select
              class="q-ma-sm"
              dense
              filled
              clearable
              v-model="filterObj.labels"
              :label="getLabel(translationsFinanceIssues.COLUMN_LABEL)"
              :options="financeFiltersStore.labelsOptions"
              standout="bg-primary text-white"
              lazy-rules="ondemand"
              autocomplete="new-password"
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-select
              class="q-ma-sm"
              dense
              filled
              clearable
              v-model="filterObj.status"
              :label="getLabel(translationsFinanceIssues.COLUMN_STATUS)"
              :options="getStatusOptions()"
              standout="bg-primary text-white"
              lazy-rules="ondemand"
              autocomplete="new-password"
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-input
              class="q-ma-sm"
              dense
              filled
              clearable
              v-model="filterObj.minDate"
              mask="date"
              :label="translationsFinanceIssues.COLUMN_START_DATE"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="filterObj.minDate">
                      <div class="row items-center justify-end">
                        <q-btn
                          unelevated
                          v-close-popup
                          :label="transBase.CLOSE"
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
          <div class="col-12 col-sm-3">
            <q-input
              class="q-ma-sm"
              dense
              filled
              clearable
              v-model="filterObj.maxDate"
              mask="date"
              :label="translationsFinanceIssues.COLUMN_END_DATE"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="filterObj.maxDate">
                      <div class="row items-center justify-end">
                        <q-btn
                          unelevated
                          v-close-popup
                          :label="transBase.CLOSE"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div></div
      ></template>
    </Table>
  </div>
</template>

<script lang="ts" src="./IssuesList.ts" />
