<template>
  <div v-if="!!inscriptionList">
    <q-table
      bordered
      flat
      title=""
      :data="inscriptionListFiltered"
      :columns="columns"
      row-key="id"
      :loading="loading"
      rows-per-page-label="Record per pagina"
    >
      <template v-slot:top>
        <q-toolbar>
          <q-toolbar-title>Iscrizioni</q-toolbar-title>
        </q-toolbar>
        <div class="row q-col-gutter-none justify-end" style="width: 100%">
          <div class="col-12 col-sm-3">
            <q-input
              dense
              filled
              clearable
              square
              outlined
              class="q-ma-sm"
              v-model="filter.nome"
              lazy-rules="ondemand"
              standout="bg-primary text-white"
              :autofocus="true"
              autocomplete="new-password"
              label="Nome"
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-input
              dense
              filled
              clearable
              square
              outlined
              class="q-ma-sm"
              v-model="filter.email"
              lazy-rules="ondemand"
              standout="bg-primary text-white"
              :autofocus="true"
              autocomplete="new-password"
              label="Email"
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-input
              dense
              filled
              clearable
              square
              outlined
              class="q-ma-sm"
              v-model="filter.phone"
              lazy-rules="ondemand"
              standout="bg-primary text-white"
              :autofocus="true"
              autocomplete="new-password"
              label="Telefono"
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-input
              dense
              filled
              clearable
              square
              outlined
              class="q-ma-sm"
              v-model="filter.eventTitle"
              lazy-rules="ondemand"
              standout="bg-primary text-white"
              :autofocus="true"
              autocomplete="new-password"
              label="Titolo Evento"
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-select
              class="q-ma-sm"
              dense
              filled
              clearable
              v-model="filter.eventClass"
              label="Corso Scolastico"
              :options="eventClassOptions"
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
              v-model="filter.class"
              label="Classe Frequentata"
              :options="classOptions"
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
      <template v-slot:body-cell-buttonsAgvInscription="props">
        <q-td :props="props">
          <div>
            <q-btn
              unelevated
              color="primary"
              icon="assignment"
              @click="() => showInscriptionDetail(props.row)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
    <InscriptionViewerDialog
      :inscription="selectedAgvInscription"
      :showModal="showInscriptionViewerDialog"
      :close="() => (showInscriptionViewerDialog = false)"
    />
  </div>
</template>

<script lang="ts" src="./InscriptionAdminComponent.ts" />
