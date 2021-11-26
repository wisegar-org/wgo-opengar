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
export default class UploadFavIconDiv extends Vue {
  @Prop({ required: true }) onSavedImg!: (img: MediaResponseGql) => unknown;
  @Prop() img!: MediaResponseGql;
  @Prop() icon!: string;
  @Prop({ default: 1 }) ratio!: number;
  @Prop({ default: 'min(max(10vw, 150px), 150px)' }) width!: string;
  @Prop({ default: '150px' }) sizeIcon!: string;
  @Prop() showLoading!: (loading: boolean) => unknown;

  @Action(mediaActions.uploadFavicon, { namespace: mediaNamespace })
  uploadFavicon!: (arg: MediaInputGql) => Promise<MediaResponseGql>;

  imageURL =
    this.img && this.img.url ? `${this.img.url}?${new Date().getTime()}` : '';
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
    const result = await this.uploadFavicon(<MediaInputGql>{
      file: file,
      isPublic: true
    });
    if (result && result.id) {
      this.imageURL = result.url ? `${result.url}?${new Date().getTime()}` : '';
      this.onSavedImg(result);
    }
    this.showLoading(false);
  }
}
</script>
