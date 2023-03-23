<template>
  <Dialog
    :open="open"
    icon="medical_services"
    :title="getLabel(translationsServicesContent.CASINA_SERVICES_DIALOG_TITLE)"
    :persistent="true"
    :showClose="true"
    maxWidth="900px"
    @close="close"
  >
    <q-card flat square class="q-pa-none">
      <q-form @submit="saveService" class="q-pa-none">
        <q-card-section class="row q-pa-none">
          <TranslationSimpleComponent
            class="q-pa-sm"
            :translation="transTitle"
            :label="getLabel(translationsServicesContent.COLUMN_TITLE)"
            @onChange="onChangeTitleTranslation"
            :langStore="langStore"
            :tranStore="tranStore"
          />
          <TranslationSimpleComponent
            class="q-pa-sm"
            :translation="transDescription"
            :label="getLabel(translationsServicesContent.COLUMN_DESCRIPTION)"
            @onChange="onChangeDescriptionTranslation"
            :langStore="langStore"
            :tranStore="tranStore"
          />
        </q-card-section>
        <q-card-actions align="center" vertical class="row q-pa-sm q-pt-md">
          <q-btn
            unelevated
            dense
            color="primary"
            align="around"
            class="btn_width_fix col-12 col-sm-4"
            :label="getLabel(transBase.SAVE)"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </Dialog>
</template>

<script lang="ts" src="./ServiceContentDialog.ts" />

<style scoped>
.btn_width_fix {
  min-width: 100px;
}
</style>
