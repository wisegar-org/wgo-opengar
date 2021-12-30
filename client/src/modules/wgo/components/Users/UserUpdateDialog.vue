<template>
  <Dialog
    :title="getTitle()"
    :showModal="showModal"
    :close="onClose"
    :loading="showLoading"
  >
    <template slot="content">
      <UserUpdateComponent
        :close="close"
        :userModel="userModel"
        :showLoading="value => (showLoading = value)"
      />
    </template>
    <template slot="buttons"> </template>
  </Dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UserUpdateComponent from './UserUpdateComponent.vue';
import { UsersModel } from '../../models/models';
import { languageGetters, languageNamespace } from '../../store/Language';
import { Getter } from 'vuex-class';
import { ITranslationUserKeys } from './TranslationsKeys';
import Dialog from '../Dialog/Dialog.vue';

@Component({
  components: {
    UserUpdateComponent,
    Dialog
  }
})
export default class UserUpdateDialog extends Vue {
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationUserKeys;
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() userModel!: UsersModel;
  showLoading = false;

  onClose() {
    if (this.close) {
      this.close();
    }
  }

  getTitle() {
    return !this.userModel
      ? this.translationContent.WGO_USERS_CREATE_USER_LABEL
      : this.translationContent.WGO_USERS_MODIFY_USER_LABEL;
  }
}
</script>
