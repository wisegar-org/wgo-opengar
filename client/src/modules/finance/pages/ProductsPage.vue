<template>
  <Products />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Products from '../components/Products/Products.vue';

@Component({
  components: { Products }
})
export default class ProductsPage extends Vue {}
</script>
