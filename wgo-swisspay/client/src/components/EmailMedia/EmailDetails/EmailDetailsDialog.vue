<template>
  <Dialog
    :open="open"
    icon="person"
    title="Email details"
    :persistent="true"
    :showClose="true"
    maxWidth="900px"
    @close="close"
  >
    <div class="fit">
      <q-card-section class="row q-ma-xs q-pa-xs flex">
        <div class="col-12 col-md-6">
          <q-input
            square
            outlined
            readonly
            dense
            class="q-my-sm q-mx-sm"
            :model-value="email.from"
            :label="getLabel(translations.COLUMN_SENDER_FORM)"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            outlined
            readonly
            dense
            class="q-my-sm q-mx-sm"
            :model-value="email.to"
            :label="getLabel(translations.COLUMN_SENDER_TO)"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            outlined
            readonly
            dense
            class="q-my-sm q-mx-sm"
            :model-value="email.subject"
            :autofocus="true"
            :label="getLabel(translations.COLUMN_SUBJECT)"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            square
            outlined
            readonly
            dense
            class="q-my-sm q-mx-sm"
            :model-value="date"
            :label="getLabel(translations.COLUMN_DATE)"
          />
        </div>
        <div class="col-12">
          <q-input
            square
            outlined
            readonly
            dense
            autogrow
            class="q-my-sm q-mx-sm"
            :model-value="email.text"
            :autofocus="true"
            :label="getLabel(translations.COLUMN_BODY)"
          />
        </div>
        <div class="col-12">
          <q-list bordered class="q-ma-sm text-left">
            <q-item-label header>{{ getLabel(translations.COLUMN_ATTACHMENTS) }}</q-item-label>
            <q-item v-for="(attch, index) in email.attachments || []" :key="`email_details_${index}_${attch.id}`">
              <q-item-section avatar>
                <q-icon color="primary" name="attach_email" />
              </q-item-section>
              <q-item-section>{{ attch.name }}</q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
      <q-card-actions align="center" vertical class="row q-ma-xs q-pa-xs">
        <div class="row col-12 justify-around fit">
          <div class="col-12 col-sm-4 q-pt-xs">
            <q-btn
              unelevated
              dense
              color="primary"
              align="around"
              class="btn_width_fix"
              @click="close"
              :label="getLabel(tranBase.CLOSE)"
            />
          </div>
        </div>
      </q-card-actions>
    </div>
  </Dialog>
</template>

<script lang="ts" src="./EmailDetailsDialog.ts" />

<style scoped>
.div_register_style {
  overflow-y: auto;
}
.btn_width_fix {
  min-width: 100px;
}
.max_heigth_card {
  max-height: 90vh;
}
</style>
