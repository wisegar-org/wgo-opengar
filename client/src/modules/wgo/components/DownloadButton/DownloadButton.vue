<template>
  <div>
    <q-btn
      unelevated
      padding="sm"
      color="primary"
      icon="cloud_download"
      size="sm"
      @click="openDownloadClick"
    />
  </div>
</template>

<script lang="ts">
import { MediaResponseGql } from 'src/graphql';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { mediaActions, mediaNamespace } from '../../store/Media';

@Component({})
export default class DownloadButton extends Vue {
  @Prop() item!: MediaResponseGql;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Action(mediaActions.getFile, { namespace: mediaNamespace })
  getFileToDownload!: (id: number) => Promise<MediaResponseGql>;

  async openDownloadClick() {
    this.showLoading(true);
    const result = await this.getFileToDownload(this.item.id || 0);
    if (result) {
      const fileUrl = `data:${result.mimetype || ''};base64,${result.data ||
        ''}`;

      void fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
          let link = window.document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = this.item.displayName || 'file';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
    }
    this.showLoading(false);
  }
}
</script>
