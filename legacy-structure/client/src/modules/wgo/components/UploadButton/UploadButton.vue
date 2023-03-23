<template>
  <div>
    <q-file
      @input="
        val => {
          onLoadFiles(val);
        }
      "
      :multiple="multiple"
      :ref="id_input"
      style="display: none"
    />
    <q-btn
      unelevated
      padding="sm"
      color="primary"
      icon="add"
      size="sm"
      :for="id_input"
      @click="openLoadFile"
    />
  </div>
</template>

<script lang="ts">
import { QFile } from 'quasar';
import { MediaInputGql, MediaResponseGql, MediasInputGql } from 'src/graphql';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { mediaActions, mediaNamespace } from '../../store/Media';

@Component({})
export default class UploadButton extends Vue {
  @Prop({ default: true }) multiple!: boolean;
  @Prop() addedFiles!: (items: MediaResponseGql[]) => unknown;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Action(mediaActions.uploadFiles, { namespace: mediaNamespace })
  addFiles!: (form: MediasInputGql) => Promise<MediaResponseGql[]>;
  id_input =
    'upload-button-' +
    Math.random()
      .toString(36)
      .substring(2, 10);

  async onLoadFiles(file: unknown[]) {
    this.showLoading(true);
    const formData: MediasInputGql = <MediasInputGql>{
      files: []
    };
    file.map((fileItem: unknown) => {
      formData.files.push(<MediaInputGql>{
        isPublic: true,
        file: fileItem
      });
    });
    const result = await this.addFiles(formData);
    this.addedFiles(result);
    this.showLoading(false);
  }
  openLoadFile() {
    (this.$refs[this.id_input] as QFile).pickFiles();
  }
}
</script>
