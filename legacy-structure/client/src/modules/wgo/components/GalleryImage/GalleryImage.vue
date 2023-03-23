<template>
  <div class="q-pa-none q-gutter-sm">
    <q-card bordered flat class="border_component_editor">
      <q-card-section v-if="label" class="q-py-sm label_component">
        <div class="row items-center no-wrap justify-between">
          <div class="col">
            {{ label }}
          </div>
          <div>
            <q-btn
              unelevated
              color="primary"
              icon="add"
              :label="btnLabel"
              class="q-ml-sm"
              no-caps
              @click="addImageToGallery"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="listMedia.length">
        <div class="row">
          <div
            v-for="(media, index) in listMedia"
            :key="id_input + index"
            class="col-12 col-sm-4 q-pa-sm"
          >
            <q-img
              :src="media.url"
              :ratio="19 / 9"
              width="100%"
              fit="contain"
              class="rounded-borders cursor-pointer"
              @click="() => deleteFile(media)"
            >
              <q-icon
                v-if="!media.delete"
                class="absolute all-pointer-events bg-white rounded-borders"
                size="20px"
                name="done"
                color="primary"
                style="top: 8px; left: 8px; border-color: primary; border-style: solid;"
              />
              <q-icon
                v-else
                class="absolute all-pointer-events bg-white rounded-borders"
                size="20px"
                name="clear"
                color="red"
                style="top: 8px; left: 8px; border-color: primary; border-style: solid;"
              />
            </q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
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
  </div>
</template>

<script lang="ts">
import { MediaInputGql, MediaResponseGql } from 'src/graphql';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { mediaActions, mediaNamespace } from '../../store/Media';
import { QFile } from 'quasar';
import { IMediaResponseCheck } from '../../models';

@Component({})
export default class GalleryImage extends Vue {
  @Prop() label!: string;
  @Prop() btnLabel!: string;
  @Prop() mediaList!: MediaResponseGql[];
  @Prop() onModify!: (mediaList: MediaResponseGql[]) => unknown;

  @Action(mediaActions.uploadImage, { namespace: mediaNamespace })
  uploadImage!: (arg: MediaInputGql) => Promise<MediaResponseGql>;

  id_input =
    'upload-button-' +
    Math.random()
      .toString(36)
      .substring(2, 10);

  listMedia: IMediaResponseCheck[] = [];

  /**
   *
   */
  constructor() {
    super();
    if (this.mediaList) {
      this.listMedia = this.mediaList.map(
        media => ({ ...media, delete: false } as IMediaResponseCheck)
      );
    }
  }

  addImageToGallery() {
    (this.$refs[this.id_input] as QFile).pickFiles();
  }

  getAddItems() {
    return this.listMedia
      .filter(media => !media.delete)
      .map(media => media as MediaResponseGql);
  }

  deleteFile(file: IMediaResponseCheck) {
    file.delete = !file.delete;
    this.onModify(this.getAddItems());
  }

  async onChangeUploadImage(file: unknown) {
    const result = await this.uploadImage(<MediaInputGql>{
      file: file,
      isPublic: true
    });
    if (result && result.id) {
      this.listMedia.push({ ...result, delete: false } as IMediaResponseCheck);
      this.onModify(this.getAddItems());
    }
  }
}
</script>
