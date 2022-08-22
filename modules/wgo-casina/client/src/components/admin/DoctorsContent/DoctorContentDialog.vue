<template>
  <Dialog
    :open="open"
    icon="group"
    :title="getLabel(translationsDoctorsContent.CASINA_DOCTORS_DIALOG_TITLE)"
    :persistent="true"
    :showClose="true"
    maxWidth="900px"
    @close="close"
  >
    <q-card flat square class="q-pa-none">
      <q-form @submit="saveDoctor" class="q-pa-none">
        <q-card-section class="row q-pa-none">
          <div class="flex justify-center col-12">
            <UploadImageDiv
              :img="form.image"
              @onSavedImg="onSavedImg"
              :ratio="1"
              width="min(max(30vw, 150px), 200px)"
              @showLoading="showLoading"
              :urlApi="urlApi"
            />
          </div>
          <TranslationSimpleComponent
            class="q-pa-sm"
            :translation="transName"
            :label="getLabel(translationsDoctorsContent.COLUMN_TITLE)"
            @onChange="onChangeNameTranslation"
            :langStore="langStore"
            :tranStore="tranStore"
          />
          <TranslationSimpleComponent
            class="q-pa-sm"
            :translation="transDescription"
            :label="getLabel(translationsDoctorsContent.COLUMN_DESCRIPTION)"
            @onChange="onChangeDescriptionTranslation"
            :langStore="langStore"
            :tranStore="tranStore"
          />
          <div class="col-12">
            <q-input
              square
              outlined
              class="q-my-sm q-mx-sm"
              v-model="form.content.email"
              :label="getLabel(translationsDoctorsContent.COLUMN_EMAIL)"
            />
          </div>
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

<script lang="ts" src="./DoctorContentDialog.ts" />

<style scoped>
.btn_width_fix {
  min-width: 100px;
}
</style>
