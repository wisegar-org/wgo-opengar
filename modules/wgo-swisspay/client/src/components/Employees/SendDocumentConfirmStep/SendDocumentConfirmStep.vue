<template>
  <q-step>
    <q-item-section>
      <div class="row flex">
        <div class="col-12 col-md-6">
          <q-input
            square
            outlined
            class="q-my-sm q-mx-sm"
            v-model="user.name"
            readonly
            :label="getLabel(transAuth.COLUMN_NAME)"
          />
        </div>

        <div class="col-12 col-md-6">
          <q-input
            square
            outlined
            readonly
            class="q-my-sm q-mx-sm"
            v-model="user.lastName"
            :label="getLabel(transAuth.COLUMN_LAST_NAME)"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            outlined
            readonly
            class="q-my-sm q-mx-sm"
            v-model="user.email"
            :autofocus="true"
            :label="getLabel(transAuth.COLUMN_EMAIL)"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            outlined
            class="q-my-sm q-mx-sm"
            v-model="user.code"
            :label="getLabel(transAuth.COLUMN_CODE)"
          />
        </div>

        <div class="col-12">
          <q-list bordered class="q-ma-sm text-left" style="">
            <q-item-label header>{{ getLabel(translations.WIZARD_SD_CONFIRM_FILES_TO_SEND) }}</q-item-label>
            <div style="max-height: 250px; overflow-y: auto">
              <q-item v-for="(file, index) in files || []" :key="`upload_confirm_${index}_${file.id}`">
                <q-item-section avatar>
                  <q-icon color="primary" name="upload_file" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ file.name }}</q-item-label>
                  <q-item-label caption>{{ file.__sizeLabel }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </div>
      </div>
    </q-item-section>

    <q-stepper-navigation>
      <q-btn @click="onConfirm" color="primary" :label="getLabel(transBase.CONFIRM)" />
      <q-btn flat @click="backStep" color="primary" :label="getLabel(transBase.GO_BACK)" class="q-ml-sm" />
    </q-stepper-navigation>
  </q-step>
</template>

<script lang="ts" src="./SendDocumentConfirmStep.ts" />
