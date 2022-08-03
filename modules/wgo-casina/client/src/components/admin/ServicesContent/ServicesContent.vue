<template>
  <div style="width: 100%">
    <q-card v-if="!innerLoading" flat bordered class="bg-grey-1 fit">
      <q-card-section>
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis">
              {{ getLabel(translations.CASINA_SERVICES_TITLE) }}
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
          @onChange="onChangeServicesContent"
        />
      </q-card-section>
    </q-card>
    <Loader :loading="innerLoading || loading" />
  </div>
</template>

<script lang="ts" src="./ServicesContent.ts" />
