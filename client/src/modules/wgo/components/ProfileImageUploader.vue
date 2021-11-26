<template>
  <div>
    <input
      accept="image/*"
      :style="{ display: 'none' }"
      id="raised-button-file"
      type="file"
      @change="onChangeImage"
    />
    <label for="raised-button-file">
      <q-avatar size="140px" @click="onSavedImg">
        <img :src="urlImage || url || defaultImage" class="bg-white" />
      </q-avatar>
    </label>
    <Loader :loading="showLoader" />
  </div>
</template>

<script lang="ts">
import { ApiSettings } from '../../../boot/settings';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class ProfileImageUploader extends Vue {
  @Prop({ required: true }) onSavedImg!: (id: number) => unknown;
  @Prop() readonly url!: string;
  defaultImage = ApiSettings.DEFAULT_USER_PROFILE;
  urlImage = '';
  showLoader = false;

  onChangeImage(event: Event) {
    //   const files = Array.from((event.srcElement.files)
    this.showLoader = true;
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const formData = new FormData();
      formData.append('file', file);
      alert('ToDo save image profile');
      // const result = await MediaService.saveImage(formData);
      // this.showLoader = false;
      // if (result && result.data && result.data.success) {
      //   this.urlImage = ApiPath + '/' + result.data.urlImage;
      //   this.onSavedImg(result.data.idImage);
      // } else {
      //   const error = this.$t(
      //     'registerUserPage.messages.registerError.imageProfile'
      //   );
      // }
    }
    this.showLoader = false;
  }
}
</script>

<style scoped>
.svg_background {
  background-color: white !important;
}
</style>
