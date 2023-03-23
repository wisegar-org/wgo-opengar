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
            @click="goToLogin"
          />

          <div v-html="translationsContent.WGO_AUTH_CONFIRM_EMAIL_CONTENT" />
        </q-card-section>
        <q-card-actions align="center" vertical class="q-ma-sm">
          <q-btn
            unelevated
            flat
            color="primary"
            align="around"
            class="btn-fixed-width btn_width q-mb-lg"
            :label="translationsContent.WGO_RESEND_BTN"
            @click="goToResendEmailConfirmation"
          />
        </q-card-actions>
      </q-card>
    </div>
    <Loader :loading="showLoader || innerLoading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { userActions, userNamespace } from '../../store/User';
import { OpengarPaths } from '../../settings/ApiSettings';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../store/ComponentsState';
import { INotify } from '../../models';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../../store/Language';
import {
  TranslationsAuthKeys,
  ITranslationAuthKeys
} from '../../components/Users/TranslationsKeys';

@Component({})
export default class EmailConfirmation extends Vue {
  @Prop() token!: string;
  showLoader = false;
  innerLoading = true;
  @Action(userActions.confirmEmail, { namespace: userNamespace })
  confirmEmailAction!: (token: string) => Promise<boolean>;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  setNotify!: (value: INotify) => void;

  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, {
    namespace: languageNamespace
  })
  translationsContent!: ITranslationAuthKeys;

  async created() {
    this.innerLoading = true;
    await this.registerTranslations(TranslationsAuthKeys);
    this.innerLoading = false;
    this.showLoader = true;
    await this.confirmEmail();
    this.showLoader = false;
  }
  async confirmEmail() {
    this.showLoader = true;
    const result: boolean = await this.confirmEmailAction(this.token);
    this.showLoader = false;
    if (result) {
      this.goToLogin();
    } else {
      const error = this.translationsContent
        .WGO_AUTH_CONFIRM_FAIL_EMAIL_CONFIRM;
      this.setNotify(<INotify>{
        type: 'negative',
        message: error
      });
    }
  }

  goToLogin() {
    void this.$router.push(OpengarPaths.login.url);
  }
  goToResendEmailConfirmation() {
    void this.$router.push(OpengarPaths.resendEmailConfirmation.url);
  }
}
</script>

<style scoped>
.login_icon {
  height: 140px;
  width: 140px;
}

.btn_width {
  min-width: 150px;
}
</style>
