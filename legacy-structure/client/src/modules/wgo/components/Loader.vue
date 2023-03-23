<template>
  <q-inner-loading :showing="loading" style="z-index: 9999;">
    <q-spinner size="50px" color="primary" />
  </q-inner-loading>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class Loader extends Vue {
  @Prop({ default: false }) loading!: boolean;
}
</script>
