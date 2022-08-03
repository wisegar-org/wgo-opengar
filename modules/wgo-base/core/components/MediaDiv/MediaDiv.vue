<template>
  <div>
    <q-img
      v-if="!!imageUrl"
      class="bg-grey-1 rounded-borders"
      :src="imageUrl"
      :ratio="16 / 9"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { IMediaModel } from "../../models";

export default defineComponent({
  name: "MediaDiv",
  props: {
    image: {
      type: Object as PropType<IMediaModel>,
    },
  },
  data() {
    const imageUrl = this.image && this.image.url ? this.image.url : "";
    return {
      imageUrl,
    };
  },
  watch: {
    image() {
      this.imageUrl = this.image && this.image.url ? this.image.url : "";
    },
  },
});
</script>
