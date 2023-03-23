<template>
  <Dialog
    :title="title"
    :icon="icon"
    :showModal="open"
    :close="close"
    style="z-index: 9999;"
  >
    <template slot="content">
      <div class="row col-12 q-pa-sm">
        <div class="col-12 col-md-6 q-pa-sm">
          <FilterSelect
            :label="translationContent.WGO_FINANCE_ISSUES_COLUMN_REPOSITORY"
            :options="optionsRepository"
            filterProp="title"
            :value="filtersEdit.repository"
            @onChange="value => setFilter('repository', value)"
          />
        </div>
        <div class="col-12 col-md-6 q-pa-sm">
          <FilterSelect
            :label="translationContent.WGO_FINANCE_ISSUES_COLUMN_LABEL"
            :options="optionsLabels"
            filterProp="title"
            :value="filtersEdit.labels"
            @onChange="value => setFilter('labels', value)"
          />
        </div>
        <div class="col-12 col-md-6 q-pa-sm">
          <FilterSelect
            :label="translationContent.WGO_FINANCE_ISSUES_COLUMN_STATUS"
            :options="optionsStatus"
            filterProp="title"
            :value="filtersEdit.status"
            @onChange="value => setFilter('status', value)"
          />
        </div>
        <div
          v-if="userLogged && userLogged.isAdmin"
          class="col-12 col-md-6 q-pa-sm"
        >
          <FilterSelect
            :label="translationContent.WGO_FINANCE_ISSUES_COLUMN_ASSIGNED_TO"
            :options="getOptionsCollaborators()"
            filterProp="login"
            :value="filtersEdit.assignedTo"
            @onChange="value => setFilter('assignedTo', value)"
          />
        </div>
        <div class="col-12 col-md-6 q-pa-sm">
          <q-input
            clearable
            dense
            outlined
            v-model="filtersEdit.minDate"
            mask="date"
            :label="translationContent.WGO_FINANCE_ISSUES_COLUMN_START_DATE"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="filtersEdit.minDate">
                    <div class="row items-center justify-end">
                      <q-btn
                        unelevated
                        v-close-popup
                        :label="translationContent.WGO_CLOSE_BTN"
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
        <div class="col-12 col-md-6 q-pa-sm">
          <q-input
            clearable
            dense
            outlined
            v-model="filtersEdit.maxDate"
            mask="date"
            :label="translationContent.WGO_FINANCE_ISSUES_COLUMN_END_DATE"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="filtersEdit.maxDate">
                    <div class="row items-center justify-end">
                      <q-btn
                        unelevated
                        v-close-popup
                        :label="translationContent.WGO_CLOSE_BTN"
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

<script lang="ts" src="./IssuesFilter.ts" />
