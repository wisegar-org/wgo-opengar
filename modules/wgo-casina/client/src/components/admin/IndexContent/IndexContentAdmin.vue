<template>
  <div style="width: 100%">
    <q-card v-if="!innerLoading" flat class="fit">
      <q-card-section class="q-py-md">
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis text-h6">
              {{ getLabel(translations.CASINA_INDEX_CONTENT_TITLE) }}
            </div>
          </div>
          <div class="flex justify-end col-12 col-sm-auto row">
            <q-btn
              unelevated
              color="primary"
              icon="save"
              :label="getLabel(transBase.SAVE)"
              @click="() => saveData()"
              class="col-12 col-sm-auto"
              no-caps
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="flex justify-center">
          <UploadImageDiv
            :img="imgIndex"
            @onSavedImg="onSavedImg"
            :ratio="16 / 9"
            @showLoading="showLoading"
            :urlApi="urlApi"
          />
        </div>
        <TranslationComponent
          :langStore="langStore"
          :tranStore="tranStore"
          :translation="transTitle"
          @onChange="onChangeIndexTitleContent"
          class="q-py-md"
        />
        <TranslationComponent
          :langStore="langStore"
          :tranStore="tranStore"
          :translation="transContent"
          @onChange="onChangeIndexContent"
          class="q-py-md"
        />
      </q-card-section>
    </q-card>
    <Loader :loading="innerLoading || loading" />
  </div>
</template>

<script lang="ts" src="./IndexContentAdmin.ts" />
