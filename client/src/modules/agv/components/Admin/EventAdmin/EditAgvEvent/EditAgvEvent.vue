<template>
  <div>
    <div class="flex justify-center">
      <UploadImageDiv
        :img="imgTitle"
        :onSavedImg="setImageTitle"
        :showLoading="showLoading"
      />
    </div>
    <q-input
      square
      outlined
      class="q-ma-sm"
      v-model="editProps.title"
      lazy-rules="ondemand"
      :autofocus="true"
      label="Titolo"
      standout="bg-primary text-white"
      dense
      :rules="[val => !!val || 'Il campo è obbligatiorio']"
    />
    <div class="q-ma-sm q-mb-lg">
      <QEditorToolbar
        :toEdit="editProps"
        propToEdir="description"
        label="Descrizione"
      />
    </div>
    <div class="q-ma-sm q-mb-lg">
      <QEditorToolbar
        :toEdit="editProps"
        propToEdir="shortDescription"
        label="Breve Descrizione"
      />
    </div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <q-select
          class="q-ma-sm"
          dense
          filled
          v-model="editProps.class"
          label="Corso Scolastico"
          :options="classOptions"
          standout="bg-primary text-white"
          lazy-rules="ondemand"
          autocomplete="new-password"
          :rules="[val => !!val || 'Il campo è obbligatiorio']"
        />
      </div>
      <div class="col-12 col-sm-6">
        <q-select
          class="q-ma-sm"
          filled
          dense
          v-model="editProps.type"
          label="Tipo di Evento"
          :options="typeOptions"
          standout="bg-primary text-white"
          lazy-rules="ondemand"
          autocomplete="new-password"
          :rules="[val => !!val || 'Il campo è obbligatiorio']"
        />
      </div>
      <div class="col-12 col-sm-6">
        <q-select
          class="q-ma-sm"
          dense
          filled
          v-model="editProps.state"
          label="Stato"
          :options="stateOptions"
          standout="bg-primary text-white"
          lazy-rules="ondemand"
          autocomplete="new-password"
          :rules="[val => !!val || 'Il campo è obbligatiorio']"
        />
      </div>
      <div class="col-12 col-sm-6">
        <q-input
          clearable
          dense
          filled
          outlined
          :value="getDateStringValue()"
          readonly
          label="Calendario degli Eventi"
          standout="bg-primary text-white"
          class="q-pa-sm"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                transition-show="scale"
                transition-hide="scale"
                ref="startDateEventAdmin"
              >
                <q-date
                  v-model="date"
                  range
                  mask="DD/MM/YYYY"
                  @input="() => closePopUp($refs.startDateEventAdmin)"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <!-- <div class="col-12 col-sm-6">
        <q-input
          clearable
          dense
          outlined
          v-model="endDate"
          mask="##/##/####"
          label="Giorno di Chiusura"
          standout="bg-primary text-white"
          class="q-pa-sm"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                transition-show="scale"
                transition-hide="scale"
                ref="endDateEventAdmin"
              >
                <q-date
                  v-model="endDate"
                  mask="DD/MM/YYYY"
                  @input="() => closePopUp($refs.endDateEventAdmin)"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div> -->
      <div class="col-12 col-sm-6">
        <q-toggle
          label="Visibile"
          v-model="editProps.visible"
          checked-icon="check"
          unchecked-icon="clear"
        />
      </div>
      <div class="col-12 col-sm-6">
        <q-toggle
          label="Iscrizioni"
          v-model="editProps.enrollment"
          checked-icon="check"
          unchecked-icon="clear"
        />
      </div>
    </div>
    <div class="q-pa-sm q-pt-lg">
      <GalleryImage
        :onModify="setListImg"
        label="Carosello di immagini"
        btnLabel="Inserisci"
        :mediaList="imgList"
      />
    </div>
    <q-card-section class="justify-center text-primary row">
      <q-btn
        unelevated
        @click="() => close()"
        color="primary"
        align="center"
        class="col-12 col-sm-auto q-mt-sm"
        label="Chiudere"
      />
      <q-btn
        unelevated
        @click="() => updateProps()"
        color="primary"
        align="center"
        :disable="!isValid()"
        class="col-12 col-sm-auto q-mt-sm"
        label="Salva"
      />
    </q-card-section>
  </div>
</template>

<script lang="ts" src="./EditAgvEvent.ts" />
