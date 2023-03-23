<template>
  <div>
    <q-card flat>
      <q-item-section class="col-auto" v-show="!getDisplayInXS() && !readonly">
        <div class="justify-end content-end row">
          <q-btn
            flat
            dense
            icon="undo"
            color="primary"
            @click="() => undoSignature()"
          >
            <q-tooltip>Undo</q-tooltip>
          </q-btn>
          <q-btn
            flat
            dense
            icon="upload"
            color="primary"
            @click="() => openLoadFile()"
            :for="id_input"
          >
            <q-tooltip>Upload</q-tooltip>
          </q-btn>
          <q-btn
            flat
            dense
            icon="download"
            color="primary"
            @click="() => downloadSignature()"
          >
            <q-tooltip>Download</q-tooltip>
          </q-btn>
        </div>
      </q-item-section>
      <q-item-section
        v-if="getDisplayInXS() && !readonly"
        avatar
        class="col-auto"
      >
        <q-btn flat unelevated color="primary" icon="more_vert" dense>
          <q-menu anchor="top right" self="top left">
            <q-list v-close-popup>
              <q-btn
                flat
                dense
                icon="undo"
                color="primary"
                @click="() => undoSignature()"
              >
                <q-tooltip>Undo</q-tooltip>
              </q-btn>
              <q-btn
                flat
                dense
                icon="upload"
                color="primary"
                @click="() => openLoadFile()"
                :for="id_input"
              >
                <q-tooltip>Upload</q-tooltip>
              </q-btn>
              <q-btn
                flat
                dense
                icon="download"
                color="primary"
                @click="() => downloadSignature()"
              >
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </q-list>
          </q-menu>
        </q-btn>
      </q-item-section>
      <q-file
        @input="
          val => {
            uploadSignature(val);
          }
        "
        :ref="id_input"
        accept="image/*"
        style="display: none"
      />
      <VueSignaturePad
        :width="width"
        :height="height"
        ref="signaturePad"
        :options="options"
        style="border: #a89e9e 1px solid"
      />
    </q-card>
  </div>
</template>

<script lan="ts" src="./InputDrawer.ts" />
