<template>
  <div v-if="!!eventList">
    <q-table
      bordered
      flat
      title=""
      :data="eventListFiltered"
      :columns="columns"
      row-key="id"
      :loading="loading"
      rows-per-page-label="Record per pagina"
    >
      <template v-slot:top>
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis">
              Eventi
            </div>
          </div>
          <div class="flex q-pb-sm justify-end col-12 col-sm-auto row">
            <q-btn
              unelevated
              color="primary"
              icon="event"
              label="Crea Evento"
              class="col-12 col-sm-auto q-ml-sm q-mb-sm"
              no-caps
              @click="() => createAgvEvent(null)"
            />
          </div>
        </div>
        <div class="row q-col-gutter-none justify-end" style="width: 100%">
          <div class="col-12 col-sm-3">
            <q-input
              dense
              filled
              clearable
              square
              outlined
              class="q-ma-sm"
              v-model="filter.title"
              lazy-rules="ondemand"
              standout="bg-primary text-white"
              :autofocus="true"
              label="Titolo"
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-select
              class="q-ma-sm"
              dense
              filled
              clearable
              v-model="filter.class"
              label="Corso Scolastico"
              :options="classOptions"
              standout="bg-primary text-white"
              lazy-rules="ondemand"
              autocomplete="new-password"
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-select
              class="q-ma-sm"
              filled
              dense
              clearable
              v-model="filter.type"
              label="Tipo di Evento"
              :options="typeOptions"
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
              v-model="filter.state"
              label="Stato"
              :options="stateOptions"
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
              v-model="filter.enrollment"
              label="Iscrizioni"
              :options="enrollmentOptions"
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
              v-model="filter.visible"
              label="Visibile"
              :options="visibleOptions"
              standout="bg-primary text-white"
              lazy-rules="ondemand"
              autocomplete="new-password"
            />
          </div>
        </div>
      </template>
      <template v-slot:loading>
        <Loader :loading="true" />
      </template>
      <template v-slot:body-cell-insccriptionsAgvEvent="props">
        <q-td :props="props">
          <div>
            <q-btn
              flat
              unelevated
              @click="() => goToInscriptions(props.row)"
              :label="props.row.inscriptions"
            />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-buttonsAgvEvents="props">
        <q-td :props="props">
          <div>
            <q-btn
              unelevated
              color="primary"
              icon="edit"
              @click="() => createAgvEvent(props.row)"
            />
            <!-- <q-btn color="primary" icon="assignment" @click="() => openAccountingDetails(props.row)"/>
            <q-btn color="primary" icon="cloud_download" @click="() => exportPdf(props.row)"/> -->
          </div>
        </q-td>
      </template>
    </q-table>
    <EditAgvEventDialog
      :showModal="showEditAgvEventDialog"
      :close="() => (showEditAgvEventDialog = false)"
      :agvEvent="selectedAgvEvent"
    />
  </div>
</template>

<script lang="ts" src="./EventAdminComponent.ts" />
