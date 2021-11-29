<template>
  <q-btn flat dense color="primary" icon="format_list_bulleted">
    <q-popup-proxy>
      <q-banner>
        <div v-for="(prop, index) in propsEditor" :key="index">
          <q-checkbox
            v-if="!prop.required"
            v-model="prop.visible"
            :label="prop.label"
            size="xs"
          />
          <q-checkbox
            v-else
            :value="true"
            :label="prop.label"
            size="xs"
            readonly
            disabled
          />
        </div>
      </q-banner>
    </q-popup-proxy>
    <q-tooltip>Show / Hide columns</q-tooltip>
  </q-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { PropToEdit } from '../models';

@Component({})
export default class ExpandableListSelectColumnsButtton extends Vue {
  @Prop({ default: () => [] }) propsEditor!: PropToEdit[];
}
</script>
