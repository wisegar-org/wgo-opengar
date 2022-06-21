<template>
  <div class="row">
    <div class="col-12 col-md-6">
      <q-input square outlined readonly dense class="q-my-sm q-mx-sm" :model-value="emailMedia.name" :label="'Name'" />
    </div>
    <div class="col-12 col-md-6">
      <q-input
        square
        outlined
        readonly
        dense
        class="q-my-sm q-mx-sm"
        :model-value="emailMedia.senderTo"
        :label="'Sender To'"
      />
    </div>
    <div class="col-12 col-md-6">
      <q-input
        square
        outlined
        readonly
        dense
        class="q-my-sm q-mx-sm"
        :model-value="emailMedia.fileExt"
        :label="'File Ext'"
      />
    </div>
    <div class="col-12 col-md-6">
      <q-input
        square
        outlined
        readonly
        dense
        class="q-my-sm q-mx-sm"
        :model-value="emailMedia.contentType"
        :label="'Content Type'"
      />
    </div>
    <div class="col-12 col-md-6">
      <q-input square outlined readonly dense class="q-my-sm q-mx-sm" :model-value="emailMedia.size" :label="'Size'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IEmailMediaModel } from '../../../../../src/models/EmailModel';

export default defineComponent({
  name: 'EmailDetailsMediaTab',
  props: {
    emailMedia: {
      type: Object as PropType<IEmailMediaModel>,
      default: {},
    },
  },
});
</script>
