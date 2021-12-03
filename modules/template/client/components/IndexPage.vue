<template>
  <div>{{ text }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class ItemComponent extends Vue {
  @Prop() text!: string;
}
</script>

<style lang="sass" scoped>
h4
  margin: 0.5rem
  padding: 0.5rem
  font-size: 1.5rem

.my-card
  width: 100%

.article-content
  display: inline-block
  vertical-align: top
  padding: 1rem
  line-height: 1.4
  overflow: hidden
  text-overflow: ellipsis
  max-height: 130px
</style>
