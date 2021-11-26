<template>
  <div class="fullscreen bg-white text-black text-center flex flex-center row">
    <div
      v-if="!innerLoading"
      class="col-12 col-md-6 col-lg-5 col-xl-4 col-sm-10"
    >
      <q-card flat square bordered class="q-ma-lg">
        <q-card-section class="q-ma-sm">
          <q-icon
            name="img:favicon.ico"
            class="login_icon cursor-pointer"
            @click="goToHome"
          />

          <q-input
            square
            outlined
            class="q-my-lg q-mx-sm"
            v-model="user"
            :autofocus="true"
            :label="translationsContent.WGO_USERS_COLUMN_USERNAME_LABEL"
          />
          <q-input
            square
            outlined
            class="q-my-lg q-mx-sm"
            v-model="password"
            type="password"
            :label="translationsContent.WGO_USERS_PASSWORD_LABEL"
            @keydown.enter.prevent="loginUser"
          />
        </q-card-section>
        <q-card-actions align="center" vertical class="q-ma-lg">
          <q-btn
            unelevated
            v-if="false"
            flat
            color="primary"
            align="around"
            class="btn-fixed-width btn_width q-mb-lg"
            :label="$t('loginPage.labels.registerUser')"
            @click="goToRegisterUser"
          />
          <q-btn
            unelevated
            color="primary"
            align="around"
            class="btn-fixed-width btn_width"
            :label="translationsContent.WGO_LOGIN_LABEL"
            :disable="!user || !password"
            @click="loginUser"
          />
        </q-card-actions>
        <div class="full-width row justify-center text-grey text-caption">
          Version: {{ version }} - API Version: {{ apiVersion }}
        </div>
      </q-card>
    </div>
    <Loader :loading="innerLoading || showLoading" />
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { userActions, userGetters, userNamespace } from '../../store/User';
import { OpengarPaths } from '../../settings/ApiSettings';
import {
  componentsNamespace,
  componentsActionsKeys
} from '../../store/ComponentsState';
import { LoginModelInputGql, UserLoginResponseGql } from 'src/graphql';
import { INotify, IVersionResult } from '../../models';
import { ApiSettings } from 'src/boot/settings';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../../store/Language';
import {
  ITranslationAuthKeys,
  TranslationsAuthKeys
} from '../../components/Users/TranslationsKeys';

@Component({
  components: {}
})
export default class Login extends Vue {
  @Prop() toPath!: string;
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, {
    namespace: languageNamespace
  })
  translationsContent!: ITranslationAuthKeys;
  @Getter(userGetters.isLogged, { namespace: userNamespace })
  isLogged!: boolean;
  @Action(userActions.loginUser, { namespace: userNamespace }) login!: (
    form: LoginModelInputGql
  ) => Promise<UserLoginResponseGql>;
  @Action(userActions.getVersionServer, { namespace: userNamespace })
  getVersionServer!: () => Promise<IVersionResult>;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  setNotify!: (value: INotify) => void;
  user: string;
  password: string;
  showLoading = false;
  innerLoading = true;
  version = ApiSettings.VERSION;
  apiVersion = 'unknown';

  constructor() {
    super();
    this.user = '';
    this.password = '';
  }

  async loginUser() {
    if (!_.isEmpty(this.user) && !_.isEmpty(this.password)) {
      this.showLoading = true;
      const result: UserLoginResponseGql = await this.login({
        userName: this.user,
        password: this.password
      });
      this.showLoading = false;

      if (this.isLogged && result && result.isSuccess) {
        this.toPath ? this.goToPath() : this.goToHome();
      } else {
        this.setNotify(<INotify>{
          message: this.translationsContent.WGO_USERS_ERROR_LOGIN,
          type: 'negative'
        });
      }
    }
  }

  goToHome() {
    void this.$router.push('/');
  }
  goToPath() {
    void this.$router.push(this.toPath);
  }
  goToRegisterUser() {
    void this.$router.push(OpengarPaths.register.url);
  }
  goToSentedConfirmationLink() {
    void this.$router.push(OpengarPaths.sentedEmailConfirmation.url);
  }
  async mounted() {
    const result = await this.getVersionServer();
    if (result.isSuccess) {
      this.apiVersion = result.version;
    } else if (!result.version) {
      this.setNotify(<INotify>{
        message: result.message,
        type: 'negative'
      });
    }
  }

  async created() {
    await this.registerTranslations(TranslationsAuthKeys);
    this.innerLoading = false;
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
