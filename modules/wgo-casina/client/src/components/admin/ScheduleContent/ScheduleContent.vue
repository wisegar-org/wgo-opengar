<template>
  <div style="width: 100%">
    <q-card v-if="!innerLoading" flat class="fit">
      <q-card-section class="q-py-md">
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis text-h6">
              {{ getLabel(translations.CASINA_SCHEDULE_TITLE) }}
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
        <TranslationComponent
          :langStore="langStore"
          :tranStore="tranStore"
          :translation="transTitleContent"
          @onChange="onChangeTitle"
          :label="translations.CASINA_SCHEDULE_TITLE_LB"
        />
        <TranslationComponent
          :langStore="langStore"
          :tranStore="tranStore"
          :translation="transContent"
          @onChange="onChangeContent"
          :label="translations.CASINA_SCHEDULE_CONTENT_LB"
        />
      </q-card-section>
    </q-card>
    <Loader :loading="innerLoading || loading" />
  </div>
</template>

<script lang="ts" src="./ScheduleContent.ts" />
