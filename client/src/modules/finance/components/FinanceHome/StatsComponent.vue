<template>
  <div
    class="row bg-secondary rounded-borders cursor-pointer items-center q-pa-md q-ma-md"
    style="min-width: 330px; min-height: 100px; justify-content: space-between"
    @click="
      () => {
        $router.push(path)
      }
    "
  >
    <div>
      <q-icon :name="icon" size="xl" />
    </div>
    <div class="flex-center text-center non-selectable q-px-md">
      {{ title }} <br />
      {{ text }}
    </div>
    <div>{{ value }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class StatsComponent extends Vue {
  @Prop() icon!: string
  @Prop() text!: string
  @Prop() title!: string
  @Prop() value!: number
  @Prop() path!: string
}
</script>
