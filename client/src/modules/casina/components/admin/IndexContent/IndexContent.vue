<template>
  <div style="width: 100%">
    <q-card v-if="!innerLoading" flat bordered class="bg-grey-1">
      <q-card-section>
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis">
              {{ translationContent.CASINA_INDEX_CONTENT_TITLE }}
            </div>
          </div>
          <div class="flex q-pb-sm justify-end col-12 col-sm-auto row">
            <q-btn
              unelevated
              color="primary"
              icon="save"
              :label="translationContent.WGO_SAVE_BTN"
              @click="() => saveData()"
              class="col-12 col-sm-auto q-ml-sm q-mb-sm"
              no-caps
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="flex justify-center">
          <UploadImageDiv
            :img="imgIndex"
            :onSavedImg="onSavedImg"
            :ratio="16 / 9"
            :showLoading="showLoading"
          />
        </div>
        <TranslationComponent
          :translation="transContent"
          :onChange="
            (langId, value) =>
              onChangeIndexContent(traslationValue, langId, value)
          "
        />
      </q-card-section>
    </q-card>
    <Loader :loading="innerLoading || loading" />
  </div>
</template>

<script lang="ts" src="./IndexContent.ts" />
