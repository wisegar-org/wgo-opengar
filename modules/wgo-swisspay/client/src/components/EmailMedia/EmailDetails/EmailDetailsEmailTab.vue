<template>
  <div class="row">
    <div class="col-12 col-md-6">
      <q-input square outlined readonly dense class="q-my-sm q-mx-sm" :model-value="email.from" :label="'From'" />
    </div>
    <div class="col-12 col-md-6">
      <q-input square outlined readonly dense class="q-my-sm q-mx-sm" :model-value="email.to" :label="'To'" />
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
        :label="'Subject'"
      />
    </div>
    <div class="col-12 col-md-6">
      <q-input square outlined readonly dense class="q-my-sm q-mx-sm" :model-value="date" :label="'Date'" />
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
        :label="'Body'"
      />
    </div>
    <div class="col-12">
      <q-list bordered class="q-ma-sm text-left">
        <q-item-label header>Attachments</q-item-label>
        <q-item v-for="(attch, index) in email.attachments || []" :key="`email_details_${index}_${attch.id}`">
          <q-item-section avatar>
            <q-icon color="primary" name="attach_email" />
          </q-item-section>
          <q-item-section>{{ attch.name }}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IEmailModel } from '../../../../../src/models/EmailModel';

export default defineComponent({
  name: 'EmailDetailsEmailTab',
  props: {
    email: {
      type: Object as PropType<IEmailModel>,
      default: {},
    },
  },
});
</script>
