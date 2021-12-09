<template>
  <q-dialog
    v-model="openDialog"
    persistent
    full-width
    @before-show="beforeShow"
  >
    <q-card class="cardEditProfile">
      <q-card-section>
        <div class="text-h6">
          {{ translationsContent.WGO_USERS_MENU_EDIT_PROFILE }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none ">
        <div class="text-center flex flex-center">
          <profile-image-uploader
            :url="defaultImage"
            :onSavedImg="savedImage"
          />
        </div>
        <q-input
          square
          outlined
          class="q-ma-lg"
          v-model="user.name"
          :autofocus="true"
          :label="translationsContent.WGO_USERS_COLUMN_NAME_LABEL"
        />
        <q-input
          square
          outlined
          class="q-ma-lg"
          v-model="user.lastName"
          :label="translationsContent.WGO_USERS_COLUMN_LASTNAME_LABEL"
        />
        <q-input
          square
          outlined
          class="q-ma-lg"
          v-model="user.password"
          type="password"
          :label="translationsContent.WGO_USERS_PASSWORD_LABEL"
        />
        <q-input
          square
          outlined
          class="q-ma-lg"
          v-model="passwordConfirm"
          type="password"
          :error="user.password != passwordConfirm"
          :error-message="translationsContent.WGO_USERS_ERROR_CONFIRM_PASSWORD"
          :label="translationsContent.WGO_USERS_CONFIRMPASSWORD_LABEL"
          @keydown.enter.prevent="updateUser"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          unelevated
          @click="closeDialog"
          color="primary"
          align="around"
          class="btn-fixed-width btn_width"
          :label="translationsContent.WGO_CLOSE_BTN"
        />
        <q-btn
          unelevated
          color="primary"
          align="around"
          class="btn-fixed-width btn_width"
          :label="translationsContent.WGO_SAVE_BTN"
          :disable="(!isDataChaged && !isValidPassword) || !areEqualPassword"
          @click="updateUser"
        />
      </q-card-actions>
      <Loader :loading="showLoader" />
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import ProfileImageUploader from '../components/ProfileImageUploader.vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { userActions, userNamespace } from '../store/User';
import { UserResponseGql, UserInputGql } from '../../../graphql';
import { ApiSettings } from '../../../boot/settings';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../store/ComponentsState';
import { UserLogged } from '../models/models';
import { INotify } from '../models';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../store/Language';
import {
  ITranslationUserKeys,
  TranslationsKeys
} from './Users/TranslationsKeys';

@Component({
  components: {
    ProfileImageUploader
  }
})
export default class EditProfile extends Vue {
  @Action(userActions.updateUser, { namespace: userNamespace })
  updateUserAction!: (form: UserInputGql) => Promise<UserResponseGql>;
  @Prop({ required: true }) userProfile!: UserLogged;
  @Prop() openDialog!: boolean;
  @Prop() closeDialog!: () => unknown;
  @Prop({ required: true }) onUpdateProfile!: () => unknown;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  setNotify!: (value: INotify) => void;
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, {
    namespace: languageNamespace
  })
  translationsContent!: ITranslationUserKeys;

  user: UserInputGql = {
    id: this.userProfile.id,
    email: this.userProfile?.email || '',
    name: this.userProfile?.name || '',
    lastName: this.userProfile?.lastName || '',
    roles: (this.userProfile?.roles || []).map(rol => rol.id),
    userName: this.userProfile?.userName || '',
    password: '',
    isEmailConfirmed: this.userProfile.isEmailConfirmed || false
  };

  showLoader = true;
  passwordConfirm = '';
  profileImage = 0;
  defaultImage = ApiSettings.DEFAULT_USER_PROFILE;

  profileImagePath(): string {
    return ApiSettings.DEFAULT_USER_PROFILE;
  }
  isDataChaged(): boolean {
    return (
      this.userProfile.name !== this.user.name ||
      this.userProfile.lastName !== this.user.lastName ||
      this.profileImage !== 0
    );
  }
  areEqualPassword(): boolean {
    return this.user.password === this.passwordConfirm;
  }
  isValidPassword(): boolean {
    return (
      this.user.password === this.passwordConfirm && this.user.password !== ''
    );
  }
  async updateUser() {
    this.showLoader = true;
    const result = await this.updateUserAction(this.user);
    this.showLoader = false;
    if (result && result.isSuccess) {
      this.onUpdateProfile();
    } else {
      const error = this.translationsContent.WGO_USERS_FAIL_EDIT_ACTION;
      this.setNotify(<INotify>{
        type: 'negative',
        message: error
      });
    }
  }
  savedImage(idImage: number) {
    this.profileImage = idImage;
  }
  beforeShow() {
    this.user.password = '';
    this.passwordConfirm = '';
  }

  async created() {
    await this.registerTranslations(TranslationsKeys);
    this.showLoader = false;
  }
}

export type EditProfileRef = InstanceType<typeof EditProfile>;
</script>

<style scoped>
.cardEditProfile {
  max-width: 700px !important;
}

.login_icon {
  height: 140px;
  width: 140px;
}

.btn_width {
  width: 150px;
}
</style>
