<template>
  <div
    class="row bg-primary rounded-borders cursor-pointer items-center q-pa-md q-ma-md"
    style="min-width: 200px; min-height: 100px; justify-content: space-around"
    @click="
      () => {
        $router.push(path);
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
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class ModuleCard extends Vue {
  @Prop() icon!: string;
  @Prop() text!: string;
  @Prop() title!: string;
  @Prop() path!: string;
}
</script>
