<template>
  <div>
    <q-file
      @input="
        val => {
          onChangeUploadImage(val);
        }
      "
      :ref="id_input"
      accept="image/*"
      style="display: none"
    />

    <q-btn unelevated flat dense @click="openLoadFile" :for="id_input" style="">
      <div v-if="!!imageURL">
        <q-img
          :src="imageURL"
          :ratio="ratio"
          :width="width"
          fit="contain"
          class="rounded-borders"
        />
      </div>

      <q-icon v-else :size="sizeIcon" name="photo" color="primary" />
    </q-btn>
    <Loader :loading="showLoader" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { QFile } from 'quasar';
import { Action } from 'vuex-class';
import { mediaActions, mediaNamespace } from '../../store/Media';
import { MediaInputGql, MediaResponseGql } from 'src/graphql';

@Component({})
export default class UploadImageDiv extends Vue {
  @Prop({ required: true }) onSavedImg!: (img: MediaResponseGql) => unknown;
  @Prop() img!: MediaResponseGql;
  @Prop() icon!: string;
  @Prop({ default: 4 / 3 }) ratio!: number;
  @Prop({ default: 'min(max(30vw, 250px), 500px)' }) width!: string;
  @Prop({ default: '150px' }) sizeIcon!: string;
  @Prop() showLoading!: (loading: boolean) => unknown;

  @Action(mediaActions.uploadImage, { namespace: mediaNamespace })
  uploadImage!: (arg: MediaInputGql) => Promise<MediaResponseGql>;

  imageURL = this.img ? this.img.url : '';
  showLoader = false;
  id_input =
    'upload-button-' +
    Math.random()
      .toString(36)
      .substring(2, 10);

  openLoadFile() {
    (this.$refs[this.id_input] as QFile).pickFiles();
  }

  async onChangeUploadImage(file: unknown) {
    this.showLoading(true);
    const result = await this.uploadImage(<MediaInputGql>{
      file: file,
      isPublic: true
    });
    if (result && result.id) {
      this.imageURL = result.url as string;
      this.onSavedImg(result);
    }
    this.showLoading(false);
  }
}
</script>
