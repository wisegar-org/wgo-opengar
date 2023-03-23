<template>
  <FinanceHome />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import FinanceHome from '../components/FinanceHome/FinanceHome.vue';

@Component({
  components: { FinanceHome }
})
export default class FinanceHomePage extends Vue {}
</script>
