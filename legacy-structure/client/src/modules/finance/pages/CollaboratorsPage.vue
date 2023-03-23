<template>
  <Collaborators />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Collaborators from '../components/Collaborators/Collaborators.vue';

@Component({
  components: { Collaborators }
})
export default class CollaboratorsPage extends Vue {}
</script>
