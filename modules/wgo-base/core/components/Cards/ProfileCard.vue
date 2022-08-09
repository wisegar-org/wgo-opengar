<template>
  <q-card
    flat
    bordered
    class="row q-py-md"
    style="
      min-height: 480px;
      align-content: space-between;
      justify-content: space-evenly;
      text-align: center;
    "
  >
    <div class="col-12">
      <q-card-section>
        <div class="flex justify-center">
          <q-avatar v-if="!!image && !!image.url" :size="avatarSize">
            <q-img
              class="bg-grey-1 rounded-borders"
              :src="image.url"
              :ratio="1"
            />
          </q-avatar>
          <q-avatar v-else color="primary" :icon="icon" :size="avatarSize" />
        </div>
      </q-card-section>

      <q-card-section>
        <div>{{ name }}</div>
        <div class="q-pt-none text-grey-7" v-html="getDescription()" />
      </q-card-section>
    </div>
    <q-card-section>
      <a :href="getMailTo()" target="_blank"> {{ email }} </a>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { TranslationStore } from "../../../translation/models/TranslationStore";
import { IMediaModel } from "../../models";
import { BaseTranslateComponent } from "../BaseComponents";
import MediaDiv from "../MediaDiv/MediaDiv.vue";
import { minText } from "./Utils";

export default defineComponent({
  name: "ProfileCard",
  props: {
    image: {
      type: Object as PropType<IMediaModel>,
    },
    icon: { type: String, default: "" },
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    email: { type: String, default: "" },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
  },
  components: {
    MediaDiv,
  },
  setup(props) {
    const { getLabel } = new BaseTranslateComponent();
    return {
      avatarSize: "170px",
      getLabel: (name: string) => getLabel(props.tranStore as any, name),
    };
  },
  methods: {
    getMailTo() {
      return `mailto:${this.email}`;
    },

    getDescription() {
      return minText(this.description, 300, 3);
    },
  },
});
// @Component({
//   components: {
//     MediaDiv
//   }
// })
// export default class ProfileCard extends Vue {
//   @Prop() image!: MediaResponseGql;
//   @Prop() icon!: string;
//   @Prop() name!: string;
//   @Prop() description!: string;
//   @Prop() email!: string;

//   avatarSize = '170px';

//   getMailTo() {
//     return `mailto:${this.email}`;
//   }

//   getDescription() {
//     return minText(this.description, 300, 3);
//   }
// }
</script>
