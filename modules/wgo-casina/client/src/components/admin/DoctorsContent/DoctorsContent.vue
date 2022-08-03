<template>
  <div style="width: 100%">
    <q-card v-if="!innerLoading" flat class="fit">
      <q-card-section>
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis">
              {{ getLabel(translations.CASINA_DOCTORS_TITLE) }}
            </div>
          </div>
          <div class="flex q-pb-sm justify-end col-12 col-sm-auto row">
            <q-btn
              unelevated
              color="primary"
              icon="save"
              :label="getLabel(transBase.SAVE)"
              @click="() => saveData()"
              class="col-12 col-sm-auto q-ml-sm q-mb-sm"
              no-caps
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <TranslationComponent
          :langStore="langStore"
          :tranStore="tranStore"
          :translation="transContent"
          @onChange="onChangeDoctorsContent"
        />
      </q-card-section>
    </q-card>
    <Loader :loading="innerLoading || loading" />
  </div>
</template>

<script lang="ts" src="./DoctorsContent.ts" />
