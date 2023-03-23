<template>
  <q-page>
    <div
      class="bg-white text-black text-center q-pa-md flex flex-center q-gutter-md row"
    >
      <div class="col-md-6 col-lg-5 col-xl-4 col-sm-10">
        <q-card flat square bordered class="q-ma-lg">
          <q-card-section class="q-ma-lg">
            <profile-image-uploader :onSavedImg="savedImage" />
            <q-input
              square
              outlined
              class="q-ma-lg"
              v-model="user.name"
              :autofocus="true"
              :label="$t('registerUserPage.labels.name')"
            />
            <q-input
              square
              outlined
              class="q-ma-lg"
              v-model="user.lastName"
              :label="$t('registerUserPage.labels.lastName')"
            />
            <q-input
              square
              outlined
              class="q-ma-lg"
              v-model="user.userName"
              :label="$t('registerUserPage.labels.userName')"
            />
            <q-input
              square
              outlined
              class="q-ma-lg"
              v-model="user.email"
              type="email"
              :label="$t('registerUserPage.labels.email')"
            />
            <q-input
              square
              outlined
              class="q-ma-lg"
              v-model="user.password"
              type="password"
              :label="$t('registerUserPage.labels.password')"
            />
            <q-input
              square
              outlined
              class="q-ma-lg"
              v-model="passwordConfirm"
              type="password"
              :error="user.password != passwordConfirm"
              :error-message="
                $t('registerUserPage.messages.registerError.confirmPassword')
              "
              :label="$t('registerUserPage.labels.passwordConfirm')"
              @keydown.enter.prevent="registerUser"
            />
          </q-card-section>
          <q-card-actions align="center" class="q-ma-lg">
            <q-btn
              unelevated
              color="primary"
              align="around"
              class="btn-fixed-width btn_width"
              :label="$t('registerUserPage.labels.register')"
              :disable="
                !user.name ||
                  !user.lastName ||
                  !user.userName ||
                  !user.email ||
                  !user.password ||
                  !passwordConfirm
              "
              @click="registerUser"
            />
          </q-card-actions>
        </q-card>
      </div>
      <Loader :loading="showLoader" />
    </div>
  </q-page>
</template>

<script lang="ts">
import _ from 'lodash';
import ProfileImageUploader from '../../components/ProfileImageUploader.vue';
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { userActions, userNamespace } from '../../store/User';
import { OpengarPaths } from '../../settings/ApiSettings';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../store/ComponentsState';
import { INotify } from '../../models';
import { UserInputGql, UserResponseGql } from 'src/graphql';

@Component({
  components: {
    ProfileImageUploader
  }
})
export default class RegisterUser extends Vue {
  @Action(userActions.registerUser, { namespace: userNamespace })
  registerUserAction!: (user: UserInputGql) => Promise<UserResponseGql>;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  setNotify!: (value: INotify) => void;
  user: UserInputGql = {
    email: '',
    name: '',
    lastName: '',
    roles: [],
    userName: '',
    password: '',
    isEmailConfirmed: false
  };
  passwordConfirm = '';
  showLoader = false;
  profileImage = 0;

  checkErrors() {
    if (_.isEmpty(this.user.name)) {
      const error = this.$t('registerUserPage.messages.emptyVuelueError.name');
      this.setNotify(<INotify>{
        type: 'negative',
        message: error
      });
      return false;
    }
    if (_.isEmpty(this.user.lastName)) {
      const error = this.$t(
        'registerUserPage.messages.emptyVuelueError.lastName'
      );
      this.setNotify(<INotify>{
        type: 'negative',
        message: error
      });
      return false;
    }
    if (_.isEmpty(this.user.userName)) {
      const error = this.$t(
        'registerUserPage.messages.emptyVuelueError.userName'
      );
      this.setNotify(<INotify>{
        type: 'negative',
        message: error
      });
      return false;
    }
    if (_.isEmpty(this.user.email)) {
      const error = this.$t('registerUserPage.messages.emptyVuelueError.email');
      this.setNotify(<INotify>{
        type: 'negative',
        message: error
      });
      return false;
    }
    if (_.isEmpty(this.user.password)) {
      const error = this.$t(
        'registerUserPage.messages.emptyVuelueError.password'
      );
      this.setNotify(<INotify>{
        type: 'negative',
        message: error
      });
      return false;
    }
    if (_.isEmpty(this.passwordConfirm)) {
      const error = this.$t(
        'registerUserPage.messages.emptyVuelueError.passwordConfirm'
      );
      this.setNotify(<INotify>{
        type: 'negative',
        message: error
      });
      return false;
    }

    return true;
  }

  async registerUser() {
    if (!this.checkErrors()) return;

    this.showLoader = true;
    const result: UserResponseGql = await this.registerUserAction(this.user);
    this.showLoader = false;
    if (result.isSuccess) this.goToEmailSented();
    else {
      const error = this.$t('registerUserPage.messages.registerError._');
      this.setNotify(<INotify>{
        type: 'negative',
        message: error
      });
    }
  }
  goToEmailSented() {
    void this.$router.push(OpengarPaths.sentedEmailConfirmation.url);
  }
  savedImage(idImage: number) {
    this.profileImage = idImage;
  }
}
</script>

<style scoped>
.login_icon {
  height: 140px;
  width: 140px;
}

.btn_width {
  width: 150px;
}
</style>
