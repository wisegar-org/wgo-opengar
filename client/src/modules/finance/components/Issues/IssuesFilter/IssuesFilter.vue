<template>
  <Dialog
    :title="title"
    :icon="icon"
    :showModal="open"
    :close="close"
    style="z-index: 9999;"
  >
    <template slot="content">
      <div class="row col-12">
        <div class="col-12 col-md-6">
          <FilterSelect
            label="Repository"
            :options="optionsRepository"
            filterProp="title"
            :value="filtersEdit.repository"
            @onChange="value => setFilter('repository', value)"
          />
        </div>
        <div class="col-12 col-md-6">
          <FilterSelect
            label="Labels"
            :options="optionsLabels"
            filterProp="title"
            :value="filtersEdit.labels"
            @onChange="value => setFilter('labels', value)"
          />
        </div>
        <div class="col-12 col-md-6">
          <FilterSelect
            label="Status"
            :options="optionsStatus"
            filterProp="title"
            :value="filtersEdit.status"
            @onChange="value => setFilter('status', value)"
          />
        </div>
        <div
          v-if="userLogged && userLogged.isSuperAdmin"
          class="col-12 col-md-6"
        >
          <FilterSelect
            label="Assigned To"
            :options="getOptionsCollaborators()"
            filterProp="login"
            :value="filtersEdit.assignedTo"
            @onChange="value => setFilter('assignedTo', value)"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            clearable
            dense
            outlined
            v-model="filtersEdit.minDate"
            mask="date"
            label="Start date"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="filtersEdit.minDate">
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
        <div class="col-12 col-md-6">
          <q-input
            clearable
            dense
            outlined
            v-model="filtersEdit.maxDate"
            mask="date"
            label="End date"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="filtersEdit.maxDate">
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
      </div>
      <div class="flex row justify-around col-12 q-px-sm q-pt-sm">
        <q-btn
          unelevated
          color="primary"
          label="Annulla"
          icon="close"
          @click="close"
          class="col-12 col-md-3 q-mt-sm"
        />
        <q-btn
          unelevated
          color="primary"
          label="Clean"
          icon="cached"
          @click="onResetFilter"
          class="col-12 col-md-3 q-mt-sm"
        />
        <q-btn
          unelevated
          color="primary"
          label="OK"
          icon="save"
          @click="onApplyFilter"
          class="col-12 col-md-3 q-mt-sm"
        />
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts" src="./IssuesFilter.ts" />
