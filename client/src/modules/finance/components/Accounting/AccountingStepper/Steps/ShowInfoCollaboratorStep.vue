<template>
  <div class="row">
    <div class="col-12 col-sm-12 col-md-6 q-pa-sm q-pb-lg">
      <q-input
        :value="user.login"
        outlined
        readonly
        label="Nome"
        dense
        stacked-label
      >
        <template v-slot:prepend>
          <q-avatar>
            <img :src="user.avatar_url" />
          </q-avatar>
        </template>
      </q-input>
    </div>
    <div class="col-12 col-sm-12 col-md-6 q-pa-sm q-pb-lg">
      <q-input
        :value="user.name"
        readonly
        outlined
        label="Name"
        dense
        stacked-label
      />
    </div>
    <div class="col-12 col-sm-12 col-md-6 q-pa-sm">
      <q-input
        :value="user.pay_by_hours"
        readonly
        outlined
        label="Pay by Hours"
        dense
        :error="!user.pay_by_hours"
        stacked-label
      />
    </div>
    <!-- <div class="col-12 col-sm-12 col-md-6 q-pa-sm">
      <q-input
        :value="user.pay_to_internet"
        readonly
        outlined
        label="Pay to Internet"
        dense
        :error="!user.pay_to_internet"
        stacked-label
      />
    </div> -->
    <div v-if="!!user.card_number" class="col-12 col-sm-12 col-md-6 q-pa-sm">
      <q-input
        :value="user.card_number"
        readonly
        outlined
        label="Card Number"
        dense
        stacked-label
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { CollaboratorRecord } from '../../../../models/models';

@Component({})
export default class ShowInfoCollaboratorStep extends Vue {
  @Prop({ required: true }) user!: CollaboratorRecord;
}
</script>
